/* Feature detection only: works in ordinary windows and foldable browser previews. */
(() => {
  const root = document.documentElement;
  let frame = 0;
  let signature = '';
  const update = () => {
    frame = 0;
    const viewport = window.visualViewport;
    root.style.setProperty('--visible-height', `${viewport?.height || innerHeight}px`);
    const segments = window.viewport?.segments;
    const pair = segments?.length === 2 ? [...segments].sort((a, b) => a.top - b.top || a.left - b.left) : [];
    let layout = 'single';
    if (pair.length === 2) {
      const [a, b] = pair;
      layout = b.left >= a.right - 1 ? 'book' : b.top >= a.bottom - 1 ? 'stacked' : 'single';
      if (layout !== 'single') pair.forEach((rect, i) => {
        for (const key of ['left', 'top', 'width', 'height', 'right', 'bottom']) {
          root.style.setProperty(`--segment-${i}-${key}`, `${rect[key]}px`);
        }
      });
    }
    root.dataset.segments = layout;
    root.dataset.posture = navigator.devicePosture?.type || 'continuous';
    // Keyboard/browser chrome updates should not be treated as folding or navigation input.
    const next = JSON.stringify([innerWidth, innerHeight, layout, pair.map(r => [r.left, r.top, r.width, r.height])]);
    if (signature !== next) {
      signature = next;
      window.dispatchEvent(new Event('tcl:viewportchange'));
    }
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  addEventListener('resize', schedule, { passive: true });
  addEventListener('pageshow', schedule);
  window.visualViewport?.addEventListener('resize', schedule, { passive: true });
  navigator.devicePosture?.addEventListener('change', schedule);
  update();
})();
