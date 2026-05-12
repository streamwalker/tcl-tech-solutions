# DNS Troubleshooting Page

Add an in-app page that explains the `DNS_PROBE_FINISHED_NXDOMAIN` error and walks through adding the missing `www` A record for `tcltechsolutions.com`.

## Route

- New route: `/troubleshooting/dns`
- Registered in `src/App.tsx` alongside existing public routes
- Uses the standard public layout (IBMNavigation header, `pt-16` container, Footer)
- Styled with existing dark-luxury tokens — no new colors

## File

- `src/pages/TroubleshootingDns.tsx` — single page component, no backend, no new dependencies

## Page sections

1. **Hero / what this error means**
   - H1: "Fixing DNS_PROBE_FINISHED_NXDOMAIN"
   - Plain-English explanation: the browser asked DNS for the hostname and got "no such name." The site isn't down — the address record is missing or hasn't propagated.

2. **Quick diagnosis** (callout card)
   - Symptom: `www.tcltechsolutions.com` returns NXDOMAIN
   - Root cause: no `A` record for the `www` subdomain at the registrar
   - Working reference domain: `tcl.streamwalkers.com` (so the project itself is fine)

3. **Step-by-step fix** (numbered list with monospace value blocks)
   1. Sign in to the DNS registrar for `tcltechsolutions.com`
   2. Open the DNS / Zone editor
   3. Add a new record:
      - Type: `A`
      - Name / Host: `www`
      - Value / Points to: `185.158.133.1`
      - TTL: default (Auto / 3600)
   4. Confirm the root record also exists:
      - Type: `A`, Name: `@`, Value: `185.158.133.1`
   5. Remove any conflicting old `A`, `AAAA`, or `CNAME` records on `www`
   6. Check for CAA records — if present, they must allow `letsencrypt.org`
   7. Save changes

4. **Verify propagation**
   - External check: link to `https://dnschecker.org/#A/www.tcltechsolutions.com` (opens in new tab)
   - Expected: most regions return `185.158.133.1`
   - Time: usually minutes, up to 72 hours
   - In Lovable: Project Settings → Domains shows status transitioning Verifying → Setting up → Active

5. **If using Cloudflare or a proxy**
   - Re-add the domain in Lovable with "Domain uses Cloudflare or a similar proxy" checked
   - Switches verification from A-record to CNAME-based

6. **Still failing checklist** (collapsible / list)
   - Wrong nameservers at the registrar
   - DNSSEC misconfiguration after a provider change
   - Conflicting wildcard `*` record
   - Browser DNS cache — try `chrome://net-internals/#dns` → Clear host cache

7. **Footer link back** to `/` and to the docs

## Navigation

- Not added to the main IBMNavigation (keeps top nav clean)
- Reachable directly via `/troubleshooting/dns` and from a small "Domain issues?" link in the site Footer

## Out of scope

- No backend, no edge function, no DB changes
- No automatic DNS lookup from the browser (CORS-blocked anyway)
- No changes to existing routes or components beyond adding the route and one footer link
