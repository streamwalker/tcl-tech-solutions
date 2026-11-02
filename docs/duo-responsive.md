# Adaptive phone and foldable layouts

Implemented 2026-11-02. Preserves main-site-first navigation and deliberate bottom-scroll tower entry.

## Reference matrix
WebKit Safari 27.1 guidance: https://webkit.org/blog/18486/webkit-features-for-safari-27-1/
Outer portrait 382x580; outer landscape 594x368; inner portrait 669x867; inner landscape 951x585; split window 385x571 (CSS pixels, small viewport).

## Implementation
Shared adaptive styles support safe areas, short landscape, full-frame hero media, touch targets, scrollable dialogs, narrow navigation and platform panels. The standalone viewport runtime uses actual window dimensions and optional viewport.segments, without device-name sniffing. Book layout places primary content and secondary imagery/directory on separate panes. Stacked tower layout separates the scene and copy. Resizing resets the automatic tower-entry input guard.

Viewport Segments and Device Posture are progressive enhancements; Safari 27.1 exposes them behind developer feature flags. Ordinary responsive layouts remain the default when unavailable. Browser window layout does not control OS split-screen or launch a second app window.

The existing compiled tower asset index-BKhFTXse.js has one targeted camera media-query change from 900px to 1024px plus horizontal/vertical viewport-segments queries. Preserve it when replacing the tower bundle.

## Validation
Production build passed. Browser-emulated main page and tower: all five sizes without horizontal overflow. Compact public-route checks: services, builder-deck, ios-app, auth, education, products/urc-bridge, privacy-policy. Book and stacked fold geometry checked; tower diagnostics confirmed contain fit. Shared authenticated layouts updated, but private workflows were not exercised. No physical iPhone Duo or native Safari 27.1 device testing performed.
