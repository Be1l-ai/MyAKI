// This script shows a gif overlay when a toggle is attempted to be turned off, and prevents toggles from being turned off.
(function() {
  // Create the gif overlay element (hidden by default)
  const gifOverlay = document.createElement('div');
  gifOverlay.id = 'toggle-gif-overlay';
  gifOverlay.style.position = 'fixed';
  gifOverlay.style.left = '0';
  gifOverlay.style.top = '0';
  gifOverlay.style.width = '100vw';
  gifOverlay.style.height = '100vh';
  gifOverlay.style.background = 'rgba(0,0,0,0.3)';
  gifOverlay.style.display = 'flex';
  gifOverlay.style.alignItems = 'center';
  gifOverlay.style.justifyContent = 'center';
  gifOverlay.style.zIndex = '9999';
  gifOverlay.style.transition = 'opacity 0.2s';
  gifOverlay.style.opacity = '0';
  gifOverlay.style.pointerEvents = 'none';


  const overlayContent = document.createElement('div');
  overlayContent.style.display = 'flex';
  overlayContent.style.flexDirection = 'column';
  overlayContent.style.alignItems = 'center';
  overlayContent.style.justifyContent = 'center';

  const img = document.createElement('img');
  img.src = '../assets/sseeyall-bubu-dudu.gif';
  img.alt = 'nuh uh';
  img.style.maxWidth = '320px';
  img.style.maxHeight = '320px';
  img.style.borderRadius = '16px';
  img.style.boxShadow = '0 4px 32px rgba(0,0,0,0.2)';
  overlayContent.appendChild(img);

  const text = document.createElement('div');
  text.textContent = 'nuh uh';
  text.style.marginTop = '18px';
  text.style.fontSize = '2.2rem';
  text.style.fontWeight = 'bold';
  text.style.color = '#fff';
  text.style.textShadow = '0 2px 8px #000, 0 0 2px #000';
  overlayContent.appendChild(text);

  gifOverlay.appendChild(overlayContent);

  document.body.appendChild(gifOverlay);

  function showGif() {
    gifOverlay.style.opacity = '1';
    gifOverlay.style.pointerEvents = 'auto';
    setTimeout(() => {
      gifOverlay.style.opacity = '0';
      gifOverlay.style.pointerEvents = 'none';
    }, 1400);
  }

  // Patch toggles so they cannot be turned off
  function patchToggles() {
    // Patch toggles in all settings panels, even if loaded dynamically
    document.querySelectorAll('.toggle').forEach((toggle) => {
      // Remove all event listeners by replacing with clone
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);
    });
    document.querySelectorAll('.toggle').forEach((toggle) => {
      toggle.setAttribute('role', 'switch');
      toggle.setAttribute('tabindex', '0');
      toggle.setAttribute('aria-checked', 'true');
      toggle.classList.add('on');
      toggle.classList.remove('off');

      function tryTurnOff(e) {
        // Only act if toggle is on and user tries to turn it off
        if (toggle.classList.contains('on')) {
          e.preventDefault();
          e.stopPropagation();
          showGif();
          // Ensure toggle stays on
          toggle.classList.add('on');
          toggle.classList.remove('off');
          toggle.setAttribute('aria-checked', 'true');
        }
      }
      newToggle = toggle;
      newToggle.addEventListener('click', tryTurnOff);
      newToggle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          tryTurnOff(event);
        }
      });
    });
  }

  // Patch toggles on DOMContentLoaded and after settings panel changes
  document.addEventListener('DOMContentLoaded', patchToggles);
  // Patch toggles after any click in the settings window (sidebar or content)
  document.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('settings-sidebar-item') ||
      e.target.closest('.settings-panel')
    ) {
      setTimeout(patchToggles, 100);
    }
  });
  // Patch toggles after settings content is loaded
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(patchToggles, 200);
  });
})();
