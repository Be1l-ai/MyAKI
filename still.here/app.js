// Stars
const starsEl = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  const size = Math.random() * 2 + 0.5;
  star.style.cssText = `
    left:${Math.random() * 100}%;top:${Math.random() * 100}%;
    width:${size}px;height:${size}px;
    --d:${2 + Math.random() * 4}s;--delay:${Math.random() * 4}s;
    --min:${0.05 + Math.random() * 0.1};--max:${0.4 + Math.random() * 0.5};
  `;
  starsEl.appendChild(star);
}

// Clock
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = hours + ':' + minutes;
}
updateClock();
setInterval(updateClock, 10000);

// Windows
let topZ = 210;

function setLauncherState(id) {
  document.querySelectorAll('[data-window]').forEach((element) => {
    element.classList.toggle('active', element.dataset.window === id);
  });
}

function clampWindowToViewport(win) {
  const rect = win.getBoundingClientRect();
  const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
  const maxTop = Math.max(40, window.innerHeight - rect.height - 8);
  const left = Math.min(Math.max(rect.left, 8), maxLeft);
  const top = Math.min(Math.max(rect.top, 40), maxTop);
  win.style.left = left + 'px';
  win.style.top = top + 'px';
}


// List of all window IDs except the letter
const WINDOW_IDS = ['reasons', 'player', 'settings', 'bugs', 'drafts'];

function markWindowOpened(id) {
  if (WINDOW_IDS.includes(id)) {
    let opened = JSON.parse(localStorage.getItem('openedWindows') || '[]');
    if (!opened.includes(id)) {
      opened.push(id);
      localStorage.setItem('openedWindows', JSON.stringify(opened));
    }
  }
}

function allWindowsOpened() {
  const opened = JSON.parse(localStorage.getItem('openedWindows') || '[]');
  return WINDOW_IDS.every(id => opened.includes(id));
}

function openWindow(id) {
  if (id === 'letter' && !allWindowsOpened()) {
    if (window.showLetterLockGif) window.showLetterLockGif();
    else alert('Read the file name Aki');
    return;
  }
  const win = document.getElementById('win-' + id);
  win.classList.remove('hidden');
  topZ += 1;
  win.style.zIndex = topZ;
  setLauncherState(id);
  clampWindowToViewport(win);
  markWindowOpened(id);
}

function closeWindow(id) {
  document.getElementById('win-' + id).classList.add('hidden');
  document.querySelectorAll('[data-window="' + id + '"]').forEach((element) => {
    element.classList.remove('active');
  });
  // if closing the music player, pause playback
  if (id === 'player') {
    const audio = document.getElementById('player-audio');
    if (audio && !audio.paused) {
      audio.pause();
    }
  }
}

// Subtitle rendering: show active VTT cues in #player-subtitles
(function setupSubtitles() {
  function renderLyricsFromTrack(track, currentTime) {
    const el = document.getElementById('player-lyrics');
    if (!el) return;

    const cues = track?.cues;
    const now = typeof currentTime === 'number' ? currentTime : 0;
    if (cues && cues.length) {
      let matchedCue = null;
      let nextCue = null;
      for (let j = 0; j < cues.length; j++) {
        const cue = cues[j];
        if (now >= cue.startTime && now <= cue.endTime) {
          matchedCue = cue;
          break;
        }
        if (!nextCue && cue.startTime > now) {
          nextCue = cue;
        }
      }

      const cueToShow = matchedCue || nextCue || cues[0];
      if (cueToShow) {
        el.innerHTML = cueToShow.text.replace(/\n/g, '<br>');
        el.classList.add('visible');
        return;
      }
    }

    el.innerHTML = '';
    el.classList.remove('visible');
  }

  // Wait until the player-audio element exists in the DOM (fragment may load later)
  function waitForAudio() {
    const audio = document.getElementById('player-audio');
    if (!audio) {
      setTimeout(waitForAudio, 200);
      return;
    }

    // Now wait for textTracks to be available
    function bindTracks() {
      const tracks = audio.textTracks;
      if (!tracks || tracks.length === 0) {
        setTimeout(bindTracks, 200);
        return;
      }

      for (let i = 0; i < tracks.length; i++) {
        const t = tracks[i];
        try { t.mode = 'hidden'; } catch (e) {}
          const refresh = () => renderLyricsFromTrack(t, audio.currentTime);
        t.addEventListener('cuechange', refresh);
        audio.addEventListener('timeupdate', refresh);
        audio.addEventListener('loadedmetadata', refresh);
          audio.addEventListener('seeked', refresh);
        refresh();
      }
    }

    bindTracks();
  }

  waitForAudio();
})();

function initWindowDragging() {
  document.querySelectorAll('.titlebar').forEach((titlebar) => {
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    titlebar.addEventListener('pointerdown', (event) => {
      if (event.target.closest('.tl, .window-close')) {
        return;
      }
      if (event.button !== undefined && event.button !== 0) {
        return;
      }
      dragging = true;
      event.preventDefault();

      const win = titlebar.closest('.window');
      const rect = win.getBoundingClientRect();
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
      topZ += 1;
      win.style.zIndex = topZ;

      if (titlebar.setPointerCapture) {
        try {
          titlebar.setPointerCapture(event.pointerId);
        } catch (_error) {
          // Ignore pointer capture failures on constrained browsers.
        }
      }
    });

    document.addEventListener('pointermove', (event) => {
      if (!dragging) {
        return;
      }
      const win = titlebar.closest('.window');
      const left = Math.min(Math.max(event.clientX - offsetX, 8), Math.max(8, window.innerWidth - win.offsetWidth - 8));
      const top = Math.min(Math.max(event.clientY - offsetY, 40), Math.max(40, window.innerHeight - win.offsetHeight - 8));
      win.style.left = left + 'px';
      win.style.top = top + 'px';
    });

    document.addEventListener('pointerup', () => {
      dragging = false;
    });
  });
}

function initWindowFocus() {
  document.querySelectorAll('.window').forEach((win) => {
    win.addEventListener('mousedown', () => {
      topZ += 1;
      win.style.zIndex = topZ;
    });
    win.addEventListener('touchstart', () => {
      topZ += 1;
      win.style.zIndex = topZ;
    }, { passive: true });
  });
}

function initLaunchers() {
  document.querySelectorAll('[data-window]').forEach((element) => {
    element.addEventListener('click', () => setLauncherState(element.dataset.window));
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openWindow(element.dataset.window);
      }
    });
  });
}

function initToggles() {
  document.querySelectorAll('.toggle').forEach((toggle) => {
    toggle.setAttribute('role', 'switch');
    toggle.setAttribute('tabindex', '0');
    toggle.setAttribute('aria-checked', toggle.classList.contains('on') ? 'true' : 'false');

    const sync = () => {
      const isOn = toggle.classList.toggle('on');
      toggle.classList.toggle('off', !isOn);
      toggle.setAttribute('aria-checked', isOn ? 'true' : 'false');
    };

    toggle.addEventListener('click', sync);
    toggle.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        sync();
      }
    });
  });
}

function initMenubar() {
  const menus = {
    File: ['New','Open','Save','Export'],
    Edit: ['Undo','Redo','Cut','Copy','Paste'],
    View: ['Toggle Fullscreen','Zoom In','Zoom Out'],
    Help: ['About','Report Bug']
  };

  let openDropdown = null;

  function closeDropdown() {
    if (openDropdown) {
      openDropdown.remove();
      openDropdown = null;
    }
  }

  document.querySelectorAll('.menubar-item').forEach((item) => {
    item.setAttribute('tabindex', '0');
    item.addEventListener('click', (e) => {
      const name = item.textContent.trim();
      const list = menus[name];
      if (!list) return;
      // toggle
      if (openDropdown && openDropdown.dataset.for === name) {
        closeDropdown();
        return;
      }
      closeDropdown();
      const rect = item.getBoundingClientRect();
      const dropdown = document.createElement('div');
      dropdown.className = 'menubar-dropdown';
      dropdown.dataset.for = name;
      const ul = document.createElement('ul');
      list.forEach((label) => {
        const li = document.createElement('li');
        li.textContent = label;
        li.addEventListener('click', () => {
          // basic actions
          if (name === 'Help' && label === 'About') {
            alert('Hi Akiiiii, I love you so muchhh. Kiss po kasi nakita mo to.');
          }
          closeDropdown();
        });
        ul.appendChild(li);
      });
      dropdown.appendChild(ul);
      document.body.appendChild(dropdown);
      // position under item
      dropdown.style.left = Math.max(8, rect.left) + 'px';
      dropdown.style.top = rect.bottom + 8 + 'px';
      openDropdown = dropdown;
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      } else if (e.key === 'Escape') {
        closeDropdown();
      }
    });
  });

  // close when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.menubar-dropdown') && !e.target.closest('.menubar-item')) {
      closeDropdown();
    }
  });
}

function initSettingsSidebar() {
  const panelMap = new Map();

  document.querySelectorAll('.settings-panel').forEach((panel) => {
    panelMap.set(panel.dataset.panel, panel);
  });

  const showPanel = (panelName) => {
    document.querySelectorAll('.settings-sidebar-item').forEach((element) => {
      element.classList.toggle('active', element.dataset.panel === panelName);
    });
    panelMap.forEach((panel, key) => {
      panel.classList.toggle('active', key === panelName);
    });
  };

  document.querySelectorAll('.settings-sidebar-item').forEach((item) => {
    item.setAttribute('tabindex', '0');
    item.addEventListener('click', () => {
      showPanel(item.dataset.panel);
    });
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        item.click();
      }
    });
  });

  showPanel(document.querySelector('.settings-sidebar-item.active')?.dataset.panel || 'general');
}

function initPlayer() {
  const playButton = document.querySelector('.ctrl-play');
  if (!playButton) {
    return;
  }

  const audio = document.getElementById('player-audio');
  const btnRev = document.getElementById('btn-rev');
  const btnFwd = document.getElementById('btn-fwd');
  const progressBar = document.querySelector('.progress-bar');
  const progressFill = progressBar?.querySelector('.progress-fill');
  const timeElapsed = document.getElementById('time-elapsed');
  const timeDuration = document.getElementById('time-duration');
  const sourceUrl = audio?.dataset?.src || audio?.getAttribute('src') || audio?.currentSrc;

  let isPlaying = false;
  let mediaObjectUrl = null;

  const updatePlayButton = () => {
    playButton.textContent = isPlaying ? '❚❚' : '▶';
    playButton.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
  };

  const seekFromEvent = (event) => {
    if (!audio || !progressBar || !audio.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const percent = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const nextTime = percent * audio.duration;
    if (typeof audio.fastSeek === 'function') {
      audio.fastSeek(nextTime);
    } else {
      audio.currentTime = nextTime;
    }
  };

  playButton.addEventListener('click', () => {
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  if (audio) {
    if (sourceUrl) {
      fetch(sourceUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to preload audio');
          }
          return response.blob();
        })
        .then((blob) => {
          mediaObjectUrl = URL.createObjectURL(blob);
          audio.src = mediaObjectUrl;
          audio.load();
        })
        .catch(() => {
          // Fall back to the source element if blob preloading is unavailable.
        });
    }

    audio.addEventListener('play', () => {
      isPlaying = true;
      updatePlayButton();
    });
    audio.addEventListener('pause', () => {
      isPlaying = false;
      updatePlayButton();
    });
    audio.addEventListener('loadedmetadata', () => {
      const d = Math.floor(audio.duration || 0);
      timeDuration.textContent = `${Math.floor(d/60)}:${String(d%60).padStart(2,'0')}`;
    });
    audio.addEventListener('timeupdate', () => {
      const cur = Math.floor(audio.currentTime || 0);
      timeElapsed.textContent = `${Math.floor(cur/60)}:${String(cur%60).padStart(2,'0')}`;
      if (progressFill && audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = pct + '%';
      }
    });

    // rev/fwd
    btnRev?.addEventListener('click', () => {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    });
    btnFwd?.addEventListener('click', () => {
      audio.currentTime = Math.min(audio.duration || audio.currentTime + 10, audio.duration || audio.currentTime + 10);
    });

    // clicking progress bar seeks
    if (progressBar) {
      let dragging = false;

      const scrub = (event) => {
        seekFromEvent(event);
      };

      progressBar.addEventListener('click', scrub);
      progressBar.addEventListener('pointerdown', (event) => {
        dragging = true;
        progressBar.setPointerCapture?.(event.pointerId);
        scrub(event);
      });
      progressBar.addEventListener('pointermove', (event) => {
        if (!dragging) return;
        scrub(event);
      });
      progressBar.addEventListener('pointerup', (event) => {
        if (!dragging) return;
        dragging = false;
        scrub(event);
      });
      progressBar.addEventListener('pointercancel', () => {
        dragging = false;
      });
      progressBar.addEventListener('lostpointercapture', () => {
        dragging = false;
      });
    }
  }
}

function initInteractiveControls() {
  initLaunchers();
  initToggles();
  initSettingsSidebar();
  initPlayer();
}

function initFragmentLoads() {
  const fragments = [
    ['reasons-content', './components/why_you.txt'],
    ['player-content', './components/iris.mp3'],
    ['settings-content', './components/relationship_settings.json'],
    ['bugs-content', './components/bug_report.log'],
    ['drafts-content', './components/unsent_drafts.txt'],
    ['letter-content', './components/read_me_last.love'],
  ];

  return Promise.all(
    fragments.map(([elementId, fragmentPath]) =>
      fetch(fragmentPath)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to load ' + fragmentPath);
          }
          return response.text();
        })
        .then((html) => {
          const target = document.getElementById(elementId);
          if (target) {
            target.innerHTML = html;
          }
        })
    )
  );
}

initWindowFocus();
initWindowDragging();
window.addEventListener('resize', () => {
  document.querySelectorAll('.window:not(.hidden)').forEach(clampWindowToViewport);
});

initFragmentLoads()
  .catch(() => {
    // The page still works when the fragments are already baked into the shell.
  })
  .finally(() => {
    initInteractiveControls();
    initMenubar();
  });
