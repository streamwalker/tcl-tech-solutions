# Domain Propagation Status Indicator

Add a self-service propagation tracker to the existing `/troubleshooting/dns` page. The browser cannot perform authoritative DNS lookups (CORS-blocked), so the indicator is timestamp-driven: the user records when they made the DNS change and the widget shows elapsed time, an estimated activation window, and a checklist of milestones.

## Where it lives

- Inserted as a new card at the top of `src/pages/TroubleshootingDns.tsx`, above "Quick diagnosis"
- Self-contained component: `src/components/troubleshooting/PropagationTracker.tsx`
- No backend, no edge function — uses `localStorage` only

## What it shows

1. **Setup state** (no timestamp saved yet)
   - Domain input (defaults to `www.tcltechsolutions.com`, editable)
   - "I just updated my DNS record" button → stores `{ domain, startedAt }` in `localStorage` key `dns-propagation-tracker`
   - Optional "I updated it earlier" → datetime-local picker for backfilling

2. **Tracking state** (timestamp present)
   - Big live counter: elapsed time since the change (`2h 14m`, updates every 30s via `setInterval`)
   - Progress bar across a 0–72h scale with three milestone markers:
     - `15 min` — Typical propagation start
     - `1–4 hr` — Most regions resolving
     - `24–72 hr` — Worst-case full propagation
   - Status label derived from elapsed time:
     - `< 15 min` → "Just submitted — give it a few minutes"
     - `15 min – 4 hr` → "Likely propagating now"
     - `4 – 24 hr` → "Should be active in most regions"
     - `24 – 72 hr` → "Edge cases still resolving"
     - `> 72 hr` → "Past the normal window — recheck records"
   - Estimated activation window: `startedAt + 15min` to `startedAt + 4h` shown as local time
   - Three actions:
     - **Check DNS now** → opens `https://dnschecker.org/#A/<domain>` in a new tab
     - **Reset timer** → clears localStorage
     - **Mark as active** → stores `activatedAt`, switches to success state

3. **Success state** (`activatedAt` present)
   - Green check, "Active after `Xh Ym`"
   - Button to reset for the next change

## Technical details

- File: `src/components/troubleshooting/PropagationTracker.tsx`, default export `PropagationTracker`
- Stored shape:
  ```ts
  type TrackerState = {
    domain: string;
    startedAt: string; // ISO
    activatedAt?: string;
  };
  ```
- `useState` + `useEffect` for hydration from localStorage on mount (avoids SSR mismatch; safe here since app is SPA)
- A second `useEffect` runs `setInterval(() => setNow(Date.now()), 30_000)` only when tracking is active; cleared on unmount or state change
- Reuse existing shadcn components: `Card`, `CardHeader`, `CardTitle`, `CardContent`, `Button`, `Input`, `Progress`
- Time formatting helper inline (`formatElapsed(ms)` → `"2h 14m"`, `"3d 4h"`)
- All colors via existing tokens — yellow accents, gray-900 surfaces, no new tailwind config

## Out of scope

- No real DNS resolution (browsers can't; would need an edge function calling a DNS-over-HTTPS provider)
- No multi-domain tracking (single record per browser)
- No notifications/email when likely-active
- No changes to `src/App.tsx` or routing — page already exists
