# Video assets

Large videos are served statically from `/public/videos/` on the web and should remain hosted there for the iOS app. Reference by URL:

`https://www.tcltechsolutions.com/videos/<filename>`

Stream with `AVPlayer` + `AVPlayerLayer` (or `VideoPlayer` SwiftUI view). Do not bundle videos in the iOS app binary.
