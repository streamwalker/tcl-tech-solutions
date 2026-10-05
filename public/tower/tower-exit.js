(() => {
  let lastScrollY = window.scrollY;
  let lastInteraction = -Infinity;
  let leaving = false;

  const noteInteraction = () => { lastInteraction = performance.now(); };
  const checkBottom = () => {
    const scroller = document.scrollingElement;
    if (!scroller || leaving || document.querySelector('dialog[open]')) return;
    const scrollY = window.scrollY;
    const movingDown = scrollY > lastScrollY;
    lastScrollY = scrollY;
    // Require visitor input so restoring the tower with Back does not send them away again.
    if (movingDown && performance.now() - lastInteraction < 2500 &&
        scroller.scrollHeight > scroller.clientHeight + 4 &&
        scroller.scrollHeight - scroller.clientHeight - scrollY <= 4) {
      leaving = true;
      window.location.assign('/home#hero');
    }
  };

  window.addEventListener('wheel', noteInteraction, { passive: true });
  window.addEventListener('touchmove', noteInteraction, { passive: true });
  window.addEventListener('pointerdown', noteInteraction, { passive: true });
  window.addEventListener('keydown', (event) => {
    if (['ArrowDown', 'PageDown', 'End', ' '].includes(event.key)) noteInteraction();
  });
  window.addEventListener('scroll', checkBottom, { passive: true });
  window.addEventListener('pageshow', () => {
    lastScrollY = window.scrollY;
    lastInteraction = -Infinity;
    leaving = false;
  });
})();
