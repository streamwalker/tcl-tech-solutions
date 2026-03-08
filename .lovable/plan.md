

## Plan: Add JSON-LD Structured Data to Homepage

### What
Add a `<script type="application/ld+json">` block to `index.html` containing LocalBusiness schema markup with all relevant business details.

### Implementation

**File: `index.html`** - Add before `</head>` (line 41)

The JSON-LD will include:

- **@type**: `LocalBusiness` (with additional types: `ElectricalContractor`, `ProfessionalService`)
- **name**: "The Connected Lifestyle"
- **url**: `https://tcltechsolutions.com/`
- **image**: TCL Home Automation.jpg
- **logo**: VetOwnedLogo.jpg
- **description**: Veteran-owned smart home and IT services
- **address**: 7634 Goldstrike Drive, San Antonio, TX 78254
- **telephone**: (210) 995-8655
- **email**: theconnectedlifestyletech@gmail.com
- **openingHours**: Mon-Fri 8AM-6PM, Sat 9AM-2PM
- **geo**: San Antonio lat/lng coordinates
- **areaServed**: San Antonio, TX
- **priceRange**: "$$"
- **foundingDate**: "2024"
- **knowsAbout**: veteran-owned status note
- **hasOfferCatalog**: Services list (Home Entertainment, Smart Automation, Business IT, AI Logic Integration, Managed Services, Premium Installations)
- **sameAs**: Social media links (placeholder)
- **additionalProperty**: Veteran-owned business flag

### Single file change
Only `index.html` needs modification — one script block inserted before the closing `</head>` tag.

