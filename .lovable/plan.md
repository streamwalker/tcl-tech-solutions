

## Plan: Monetize the Website

Three revenue streams implemented in priority order — affiliate links are instant, AdSense is same-day, and Stripe service booking generates the most revenue per transaction.

### 1. Replace Mock Ads with Real Affiliate Links

**File: `src/components/AdSidebar.tsx`**

Replace all `href="#"` placeholders with real affiliate program URLs:

| Ad | Affiliate Link |
|---|---|
| Apple Watch Ultra 3 | Amazon Associates link (user provides their affiliate tag) |
| Turo Cybertruck | Turo referral link (`https://turo.com/invite/...`) |
| Avengers: Doomsday | Fandango affiliate link |
| PicPoppit | App Store / Google Play referral |
| Drip Slayer | Placeholder (user's own brand or affiliate) |
| Codex Miraculorum | Placeholder (user's own brand or affiliate) |
| EquiForge | Placeholder (user's own brand or affiliate) |

Since we don't have the user's actual affiliate IDs yet, we'll add a config object at the top of AdSidebar.tsx with clearly labeled URL constants so they can be swapped in easily. We'll use generic program signup URLs as defaults with comments explaining where to get affiliate tags.

### 2. Add Google AdSense

**File: `index.html`** — Add the AdSense script tag in `<head>` (user provides their AdSense publisher ID, i.e. `ca-pub-XXXXX`)

**File: `src/components/GoogleAd.tsx`** (new) — Create a reusable AdSense display ad component using `<ins class="adsbygoogle">` with `useEffect` to call `adsbygoogle.push({})`.

**File: `src/pages/Index.tsx`** — Insert GoogleAd units in 2-3 strategic locations:
- Between Services and DealerPartners sections
- Between Testimonials and About sections
- Above the Footer

### 3. Stripe Service Booking with Payment

Enable Stripe to create a service booking page where customers pay upfront for consultations or service packages.

**New page: `src/pages/BookService.tsx`** — A booking form where customers:
- Select a service tier (Smart Home $2k-8k, Home Theater $8k-40k, etc.)
- Pay a consultation deposit ($99-$299) via Stripe Checkout
- Provide contact details and preferred date

**New route** added to App.tsx: `/book`

**CTA integration** — Update the "Schedule Consultation" buttons across Services.tsx and Contact.tsx to link to `/book` instead of just scrolling.

This requires enabling Stripe via the Lovable Stripe integration tool before writing the code.

### Files to Create
- `src/components/GoogleAd.tsx`
- `src/pages/BookService.tsx`

### Files to Edit
- `index.html` — AdSense script tag
- `src/components/AdSidebar.tsx` — real affiliate URLs + config
- `src/pages/Index.tsx` — insert GoogleAd units between sections
- `src/App.tsx` — add `/book` route
- `src/components/Services.tsx` — link consultation buttons to `/book`

### What I Need From You
1. **Google AdSense publisher ID** (`ca-pub-XXXXX`) — sign up at https://adsense.google.com if you haven't already
2. **Amazon Associates affiliate tag** — sign up at https://affiliate-program.amazon.com
3. **Turo referral link** — from your Turo account under "Refer a friend"
4. **Stripe** — I'll enable it via the Lovable integration and walk you through connecting your account

I can start building the code structure now with placeholder IDs, so everything is ready the moment you plug in your credentials. Want me to proceed?

