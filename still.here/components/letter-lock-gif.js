// Shows a lock gif overlay when requirements are not met for the letter window
(function() {
  // Create the gif overlay element (hidden by default)
  const lockOverlay = document.createElement('div');
  lockOverlay.id = 'letter-lock-gif-overlay';
  lockOverlay.style.position = 'fixed';
  lockOverlay.style.left = '0';
  lockOverlay.style.top = '0';
  lockOverlay.style.width = '100vw';
  lockOverlay.style.height = '100vh';
  lockOverlay.style.background = 'rgba(0,0,0,0.3)';
  lockOverlay.style.display = 'flex';
  lockOverlay.style.alignItems = 'center';
  lockOverlay.style.justifyContent = 'center';
  lockOverlay.style.zIndex = '9999';
  lockOverlay.style.transition = 'opacity 0.2s';
  lockOverlay.style.opacity = '0';
  lockOverlay.style.pointerEvents = 'none';

  const overlayContent = document.createElement('div');
  overlayContent.style.display = 'flex';
  overlayContent.style.flexDirection = 'column';
  overlayContent.style.alignItems = 'center';
  overlayContent.style.justifyContent = 'center';

  const img = document.createElement('img');
  img.src = '../assets/sseeyall-bubu-dudu.gif';
  img.alt = 'locked';
  img.style.maxWidth = '320px';
  img.style.maxHeight = '320px';
  img.style.borderRadius = '16px';
  img.style.boxShadow = '0 4px 32px rgba(0,0,0,0.2)';
  overlayContent.appendChild(img);

  const text = document.createElement('div');
  text.textContent = 'Read the file name po Aki';
  text.style.marginTop = '18px';
  text.style.fontSize = '1.5rem';
  text.style.fontWeight = 'bold';
  text.style.color = '#fff';
  text.style.textShadow = '0 2px 8px #000, 0 0 2px #000';
  overlayContent.appendChild(text);

  lockOverlay.appendChild(overlayContent);
  document.body.appendChild(lockOverlay);

  window.showLetterLockGif = function() {
    lockOverlay.style.opacity = '1';
    lockOverlay.style.pointerEvents = 'auto';
    setTimeout(() => {
      lockOverlay.style.opacity = '0';
      lockOverlay.style.pointerEvents = 'none';
    }, 1600);
  };
})();
