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

function openWindow(id) {
  const win = document.getElementById('win-' + id);
  win.classList.remove('hidden');
  topZ += 1;
  win.style.zIndex = topZ;
  setLauncherState(id);
  clampWindowToViewport(win);
}

function closeWindow(id) {
  document.getElementById('win-' + id).classList.add('hidden');
  document.querySelectorAll('[data-window="' + id + '"]').forEach((element) => {
    element.classList.remove('active');
  });
}

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

  let isPlaying = false;

  const updatePlayButton = () => {
    playButton.textContent = isPlaying ? '❚❚' : '▶';
    playButton.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
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
    progressBar?.addEventListener('click', (event) => {
      const rect = progressBar.getBoundingClientRect();
      const percent = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      if (audio.duration) audio.currentTime = percent * audio.duration;
    });
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
  });
