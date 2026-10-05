# TCL Connected Tower

Source synchronized from `outputs/tcl-tech-solutions-tower` on October 5, 2026. The root website opens the full-screen tower at `/tower/index.html`. The photographic main site is maintained separately at `/home`, with service and app routes preserved.

The tour has five floors: Sky Lounge, Design Lab, Cinema Deck, Command Center, and Operations. The removed Armor Lab no longer appears in navigation, room art, offering copy, the closing section, or the optional-video manifest. Older `#armor-lab` links lead to Operations; older `#suit-up` links lead to the closing project section. The closing section links to design, installation, support, and contact services.

The served `tower-five-levels.glb` is derived from the preserved original model with the sixth floor and its equipment removed. Its foundation and elevator spines match the shortened tower. Scroll boundaries and the overview camera use the current room count. Regenerate this derivative with `python3 scripts/prepare-five-level-model.py` after copying the original `tower.glb` into `public/`.

To rebuild this copy, copy `../public/tower/media`, `tower.glb`, `tower-five-levels.glb`, and `site-search.json` into a `public/` directory, keeping `video-manifest.json` at `public/media/video-manifest.json`, run `npm ci && npm run build`, then copy the contents of `dist/` into `../public/tower/` without deleting other public assets.

The intro video no longer plays or appears in the interface, and its loader and replay controls are not referenced. Original videos, retired artwork, and the original six-floor model remain on disk for recovery. The accessible skip link and mobile image fitting are preserved. Main-site links use `/home` so they do not loop through the tower-first root route. Rooms are fictional concept art presented in a 3D tower, not rigged character animation; all room video-manifest values remain null.
