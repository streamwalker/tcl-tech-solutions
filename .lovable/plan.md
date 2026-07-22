## Goal
Expand `src/components/DealerPartners.tsx` so it showcases all 11 brands you listed, with a synopsis of each company and how it plugs into TCL Tech Solutions' integration process.

## Brands to include
Juke Audio, Kaleidescape, Epson, Samsung, JVC, URC, Elura, Marantz, Denon, AVA Cinema Remote, Big Dog Power, Josh.ai.

Existing cards not on your new list (Savant, RTI, Lutron RadioRA2) — keeping them removes nothing you asked for and matches the About page's certifications. I will keep them at the end of the grid unless you say otherwise.

## Content pattern per brand
Each card gets four fields:
- **Category chip** (e.g. Multi-Room Audio, Reference Cinema, Projection, Displays, Control, Surveillance, AV Receivers, Remote Control, Power Management, Voice AI).
- **Synopsis** (2 sentences on who the brand is and what they make).
- **How it fits our integration process** (1–2 sentences tying the product into TCL's design → rack build → programming → calibration → handoff workflow).
- **Key benefits** bullets (3 short items).

Draft copy the plan will ship (concise, editable later):

- **Juke Audio** — Multi-Room Audio. Juke builds compact multi-zone amplifiers that stream from AirPlay, Spotify Connect, Sonos, and line-in sources to up to 8 zones per unit. We rack Juke in the AV closet during trim, map each zone to a room in the control system, and expose zone volume/source control inside URC, Savant, RTI, or Josh.ai — one interface, whole-home audio without a per-zone streamer.
- **Kaleidescape** — Reference Cinema. Kaleidescape is the reference-quality movie server used in high-end theaters; lossless audio and true 4K HDR that outperforms every streaming service. We spec the Strato/Terra combo into theater and media-room designs, wire it into the video matrix, and build one-button "Watch a Movie" scenes that dim lights, close shades, and cue the projector.
- **Epson** — Projection. Epson's LS-series and Pro Cinema laser projectors deliver bright, color-accurate images for dedicated theaters, media rooms, and outdoor screens. Our CEDIA-trained designers pick the right lumens and throw for the room, and calibrate to ISF/THX targets post-install.
- **Samsung** — Displays. Samsung's Neo QLED, OLED, MicroLED, and The Frame lines cover luxury living rooms, kitchens, primary suites, and outdoor patios. We size and mount displays, hide power/HDMI in-wall, and integrate them into the control system so a single button changes source, volume, and lighting scene.
- **JVC** — Reference Projection. JVC D-ILA projectors are the gold standard for native-4K contrast and black level in dedicated theaters. We pair JVC with anamorphic lensing or CinemaScope screens when the client wants true reference cinema, then calibrate with Calman for HDR and SDR.
- **URC** — Control Systems. URC's Total Control and HAP platform is our primary control backbone for smart homes and light commercial. We program room-by-room activities, unify AV/lighting/climate/security under one remote or in-wall touchscreen, and support the system remotely via URC's cloud tools.
- **Elura** — Surveillance & Access. Elura provides pro-grade IP cameras, NVRs, intercoms, and analytics tuned for residential integrators. We design coverage during pre-wire, terminate PoE at the network rack, and surface live feeds and doorbell calls on TVs, phones, and control interfaces.
- **Marantz** — AV Receivers & Preamps. Marantz reference AV receivers and Cinema-series processors deliver audiophile 2-channel and reference home-theater performance in one chassis. We spec Marantz for media rooms and 2-channel listening zones, integrate Dirac Live or Audyssey room correction, and hand off a system that sounds right the day you move in.
- **Denon** — AV Receivers. Denon AVRs are the workhorse for dedicated theaters and media rooms up to 11.4 channels with Dolby Atmos and DTS:X. We size the AVR to the speaker layout, rack it with proper ventilation, and lock down the configuration so guests can't break the calibration.
- **AVA Cinema Remote** — Luxury Home Theater. AVA Cinema delivers commercial-grade luxury theater builds — acoustic design, riser fabrication, motorized seating, and screen/projector packages. We integrate AVA rooms into the whole-home control system so the theater is one tap away from every family device.
- **Big Dog Power** — Power Management. Big Dog Power's rack-mount PDUs, surge suppression, and remote reboot units protect every device we install and let us restore a locked AV zone without a truck roll. Every TCL rack ships with a Big Dog PDU so the client's investment is protected from day one and serviceable from anywhere.
- **Josh.ai** — Voice AI. Josh.ai is the privacy-first voice assistant purpose-built for luxury smart homes; natural-language control of lighting, shades, climate, AV, and security without sending audio to advertising clouds. Our Josh designers program rooms, scenes, and multi-word commands, then integrate Josh with URC, Savant, RTI, Lutron, and Elura so voice becomes the fastest interface in the house.

## Files to change
- `src/components/DealerPartners.tsx` — replace the 5-item `partners` array with the 12-item list above (11 new + AVA/URC kept from existing), update the intro copy to say "authorized dealer relationships," and add a short "How we integrate these brands" note above the grid describing the design → pre-wire → rack build → programming → calibration → handoff flow.

## Out of scope
- No new page, no route change, no images (icons/logos would require you to provide files or approval to generate).
- No changes to `About.tsx` certifications section (those are certifications, not dealer relationships).
- No SEO/JSON-LD or sitemap edits.

## Open question
Answered as an assumption unless you object: I'm keeping the existing Savant / RTI / Lutron cards on the grid because they're real dealer relationships and already appear elsewhere on the site. Tell me if you want the grid to show only the 11 brands you listed.
