# TCL Connected Tower

Source synchronized from `outputs/tcl-tech-solutions-tower` on October 5, 2026. The main TCL landing page and app routes are maintained separately; the full-screen tower is served at `/tower/index.html`.

To rebuild this copy, copy `../public/tower/media` (including `video-manifest.json`, all room images, the intro MP4, and its poster), `tower.glb`, `intro-loader.js`, and `site-search.json` into a `public/` directory, keeping `video-manifest.json` at `public/media/video-manifest.json`, run `npm ci && npm run build`, then copy the contents of `dist/` into `../public/tower/` without deleting other public assets.

The active Armor Lab image is `B2-armor-lab-v3.png`, featuring the approved slimmer-face Damon and Phil revision. The overview now uses an HTML directory with current room artwork; the finale uses the same current Armor Lab image. Old v2 poster/storyboard assets remain on disk for recovery but are not referenced by the tower page.

The user-supplied intro video, skip/replay controls, six floors, and mobile image fitting are preserved. Rooms are fictional concept art presented in a 3D tower, not rigged character animation; all room video-manifest values remain null. The separate red/gold Mark 46 armor request remains unfulfilled, so the current blue/red/silver armor is retained.
