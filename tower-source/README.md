# TCL Connected Tower

Source synchronized from `outputs/tcl-tech-solutions-tower` on October 5, 2026. The root website opens the full-screen tower at `/tower/index.html`. The photographic main site is maintained separately at `/home`, with service and app routes preserved.

To rebuild this copy, copy `../public/tower/media` (including `video-manifest.json`, all room images), `tower.glb` and `site-search.json` into a `public/` directory, keeping `video-manifest.json` at `public/media/video-manifest.json`, run `npm ci && npm run build`, then copy the contents of `dist/` into `../public/tower/` without deleting other public assets.

The active Armor Lab image is `B2-armor-lab-v3.png`, featuring the approved slimmer-face Damon and Phil revision. The overview now uses an HTML directory with current room artwork; the finale uses the same current Armor Lab image. Old v2 poster/storyboard assets remain on disk for recovery but are not referenced by the tower page.

The intro video no longer plays or appears in the interface, and its loader and replay controls are not referenced. The original MP4 and supporting assets remain on disk for recovery. All six floors, the accessible skip link, and mobile image fitting are preserved. Main-site links use `/home` so they do not loop through the tower-first root route. Rooms are fictional concept art presented in a 3D tower, not rigged character animation; all room video-manifest values remain null. The separate red/gold Mark 46 armor request remains unfulfilled, so the current blue/red/silver armor is retained.
