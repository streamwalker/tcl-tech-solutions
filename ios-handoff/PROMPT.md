# Kickoff prompt for Claude Code

> You are picking up a SwiftUI iOS 26 port of The Connected Lifestyle (TCL).
> Everything you need is in this `ios-handoff/` folder.
>
> Step 1: Read `README.md`, then `CLAUDE.md`, then `spec/00-overview.md` and `spec/01-information-architecture.md`. Acknowledge the scope.
>
> Step 2: Scaffold an Xcode 26 project under `../app/` named **TCL** with bundle id `com.tcltech.tcl`. Targets: `TCL` (app), `TCLTests` (unit + snapshot), `TCLUITests`. Add the `supabase-swift` SPM dependency.
>
> Step 3: Implement the design system from `spec/02-design-system.md` as `TCLTheme` (colors, typography, spacing, radii, shadows). Load Playfair Display, DM Sans, DM Mono from `assets/fonts/` (download from Google Fonts if missing — SIL OFL is bundled-friendly).
>
> Step 4: Build screens **in the order listed in `spec/01-information-architecture.md`**, one PR per screen. For each: read `spec/04-screens/<slug>.md` and the corresponding React file linked in `reference/web-source-map.md`. Match layout section-for-section.
>
> Step 5: Wire Supabase per `backend/supabase-config.md`. Reuse RLS — never alter the schema. Auth screen first, then dashboard, then platform modules, then academy.
>
> Step 6: After each screen, run `xcodebuild test`. Stop and report if anything red.
>
> Constraints: pixel-faithful, dark luxury, no PII logging, no schema changes, SwiftUI + Swift Charts + supabase-swift only.
