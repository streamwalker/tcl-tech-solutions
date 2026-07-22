import { CheckCircle, Star, Award, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleContactClick } from "@/utils/smoothScroll";

const DealerPartners = () => {
  const partners = [
    {
      name: "Juke Audio",
      badge: "Authorized Dealer",
      specialty: "Multi-Room Audio",
      description:
        "Juke builds compact, network-based multi-zone amplifiers that stream AirPlay 2, Spotify Connect, Tidal, and analog sources to up to eight zones per chassis — no per-zone streamer, no proprietary head-end.",
      integration:
        "We spec Juke during design, terminate speaker home-runs to the AV rack at trim, and expose zone volume, source, and grouping inside URC, Savant, RTI, and Josh.ai so the client controls whole-home audio from the same interface as everything else.",
      keyBenefits: ["Up to 8 zones per amp", "AirPlay 2 & major streaming built-in", "Unified control-system UI"],
    },
    {
      name: "Kaleidescape",
      badge: "Authorized Dealer",
      specialty: "Reference Cinema",
      description:
        "The reference-quality movie server used in the world's finest private theaters — bit-perfect lossless audio and full-bitrate 4K HDR that streaming platforms simply cannot match.",
      integration:
        "We size Strato players and Terra storage to the client's library, integrate them into the video matrix and AVR, and program single-button 'Watch a Movie' scenes that dim lights, close shades, mask the screen, and cue the projector in the right order.",
      keyBenefits: ["Full-bitrate 4K HDR", "Lossless Dolby Atmos & DTS:X", "One-touch cinema scenes"],
    },
    {
      name: "Epson",
      badge: "Authorized Dealer",
      specialty: "Projection",
      description:
        "Epson LS-series, QB-series, and Pro Cinema laser projectors deliver bright, color-accurate images for dedicated theaters, media rooms, and outdoor screens, with the light-source longevity clients expect from a permanent install.",
      integration:
        "Our CEDIA-trained designers match lumens, contrast, and throw to the room and screen, mount and align in-house, then calibrate with Calman to reference targets for both SDR and HDR content.",
      keyBenefits: ["20,000+ hr laser light source", "Room-matched lumens & throw", "Calman-calibrated SDR/HDR"],
    },
    {
      name: "Samsung",
      badge: "Authorized Dealer",
      specialty: "Displays & Frame TV",
      description:
        "Samsung Neo QLED, OLED, MicroLED, The Frame, and Terrace outdoor displays cover every room in a luxury home — from primary living spaces to kitchens, primary suites, and covered patios.",
      integration:
        "We size and mount each display to sight-lines and seating, run concealed power and HDMI in-wall to code, and integrate every screen into the control system so one button changes source, volume, shading, and lighting together.",
      keyBenefits: ["Whole-home display strategy", "Code-compliant concealed wiring", "One-touch scene control"],
    },
    {
      name: "JVC",
      badge: "Authorized Dealer",
      specialty: "Reference Projection",
      description:
        "JVC D-ILA projectors are the reference standard for native-4K contrast and true black level in dedicated home theaters and screening rooms.",
      integration:
        "We pair JVC with anamorphic lensing or CinemaScope screens when the room warrants it, run Frame Adapt HDR to the client's viewing environment, and finish every install with a Calman calibration for both SDR and HDR.",
      keyBenefits: ["Native 4K D-ILA panels", "Class-leading black level", "Calman-calibrated Frame Adapt HDR"],
    },
    {
      name: "URC (Universal Remote Control)",
      badge: "HAP Certified Dealer",
      specialty: "Control Systems",
      description:
        "URC's Total Control 2.0 and Home Automation Platform (HAP) is our primary control backbone for smart homes and light-commercial installs, with deep two-way drivers for the AV, lighting, climate, and security gear we spec.",
      integration:
        "We design keypad and touchscreen layouts room by room, program activities and macros, then enroll every project in URC's cloud so we can push updates and resolve issues remotely instead of rolling a truck.",
      keyBenefits: ["Unified AV, lighting, HVAC & security", "In-wall & handheld touchscreens", "Cloud-based remote service"],
    },
    {
      name: "Elura",
      badge: "Authorized Dealer",
      specialty: "Surveillance & Access",
      description:
        "Elura delivers pro-grade IP cameras, NVRs, video intercoms, and AI analytics purpose-built for residential integrators — not repurposed commercial gear.",
      integration:
        "We plan coverage and sight-lines during pre-wire, terminate PoE runs on managed switches at the rack, and surface live feeds, event clips, and doorbell calls on TVs, phones, and URC/Savant/Josh.ai interfaces.",
      keyBenefits: ["Coverage engineered at pre-wire", "PoE on a managed network", "Feeds & alerts on every device"],
    },
    {
      name: "Marantz",
      badge: "Authorized Dealer",
      specialty: "AV Receivers & Preamps",
      description:
        "Marantz Cinema-series AV receivers and AV processors deliver audiophile two-channel and reference immersive-audio performance in one chassis, with HDAM circuitry the audio community actually cares about.",
      integration:
        "We spec Marantz where audio quality is the priority, measure the room with a calibrated mic, run Dirac Live or Audyssey MultEQ XT32, and hand off a system that measures and sounds correct on day one.",
      keyBenefits: ["Audiophile 2-channel performance", "Reference Atmos/DTS:X theater", "Dirac Live room correction"],
    },
    {
      name: "Denon",
      badge: "Authorized Dealer",
      specialty: "AV Receivers",
      description:
        "Denon AVRs are the workhorse of dedicated theaters and media rooms — up to 11.4 channels of Dolby Atmos and DTS:X with the HDMI 2.1 bandwidth modern sources demand.",
      integration:
        "We size the AVR to the speaker layout and source stack, rack it with active ventilation, run Audyssey MultEQ XT32 calibration, then lock the configuration behind an installer PIN so guests can't undo the tune.",
      keyBenefits: ["Up to 11.4 immersive channels", "8K/4K120 HDMI 2.1 throughput", "Calibrated & config-locked"],
    },
    {
      name: "AVA Cinema Remote",
      badge: "Authorized Dealer",
      specialty: "Luxury Home Theater",
      description:
        "AVA Cinema delivers commercial-grade luxury theater build-outs — acoustic treatment and isolation, riser fabrication, motorized seating, masking screens, and matched projector packages.",
      integration:
        "We coordinate AVA's cinema build with our AV, lighting, and shade design so the room is architecturally and acoustically correct, then wire the theater into the whole-home control system with scenes that cue HVAC, lighting, shades, and masking together.",
      keyBenefits: ["Acoustically treated & isolated", "Motorized theater seating", "Scene-linked with whole home"],
    },
    {
      name: "Big Dog Power",
      badge: "Authorized Dealer",
      specialty: "Power Management",
      description:
        "Big Dog Power's rack-mount PDUs, whole-system surge suppression, and IP-addressable remote reboot units protect every dollar of gear in the rack and let us recover a locked-up device without dispatching a technician.",
      integration:
        "Every TCL rack ships standard with a Big Dog PDU wired to a labeled outlet map, monitored from our support desk so we can power-cycle any component per-outlet the moment a client reports an issue.",
      keyBenefits: ["Whole-system surge protection", "Per-outlet remote reboot", "Standard on every TCL rack"],
    },
    {
      name: "Josh.ai",
      badge: "Certified Designer & Programmer",
      specialty: "Voice AI",
      description:
        "Josh.ai is the privacy-first voice assistant purpose-built for luxury smart homes — natural-language control of lighting, shades, climate, AV, and security with no advertising, no listening in, and no data resale.",
      integration:
        "Our Josh-certified designers map rooms, scenes, and multi-command phrases to the way the family actually talks, then bridge Josh into URC, Savant, RTI, Lutron, Elura, and Kaleidescape so a single sentence drives every subsystem at once.",
      keyBenefits: ["Privacy-first — no ad tracking", "Natural multi-command phrasing", "Bridged to every subsystem"],
    },
    {
      name: "Savant",
      badge: "Certified Integrator",
      specialty: "Smart Home AI Platform",
      description:
        "Savant is the AI-driven luxury automation platform for whole-home audio, video, lighting, climate, and energy, with the polished touch UI clients expect at this tier.",
      integration:
        "We deploy Savant Pro hosts and IP Audio, program scenes, schedules, and energy monitoring, and blend Savant with Lutron, URC, and Josh.ai so lighting, shading, and AV move as one system, not three.",
      keyBenefits: ["AI-driven scenes & schedules", "Luxury Pro Remote & app UI", "Cross-brand orchestration"],
    },
    {
      name: "RTI",
      badge: "Certified Programmer",
      specialty: "Custom Control",
      description:
        "RTI delivers commercial-grade control for complex residential and light-commercial installs, with fully custom UIs designed per-project instead of a fixed template.",
      integration:
        "We design bespoke RTI interfaces around the way the client uses each room, deploy two-way drivers for their AV and lighting stack, and enable dealer-managed remote support so most service issues are resolved from our desk.",
      keyBenefits: ["Bespoke per-project UI", "Commercial-grade reliability", "Dealer-managed remote support"],
    },
    {
      name: "Lutron RadioRA 3",
      badge: "Certified Dealer",
      specialty: "Lighting & Shade Control",
      description:
        "Lutron RadioRA 3 is the reference wireless platform for whole-home lighting control, engraved keypads, and Sivoia QS automated shades in a luxury retrofit or new build.",
      integration:
        "We engineer keypad layouts and engraving room by room, program load schedules and Sivoia shade groups, and bridge Lutron into URC, Savant, RTI, and Josh.ai so lighting and shading move automatically with every AV activity.",
      keyBenefits: ["Rock-solid Clear Connect wireless", "Custom engraved keypads", "Shades & lighting linked to AV"],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-primary mr-3" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Professional Partnerships
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Authorized Dealer Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We maintain direct authorized-dealer relationships with the industry's leading manufacturers,
            giving our clients access to professional-grade equipment, factory support, and competitive pricing.
          </p>
        </div>

        {/* How we integrate these brands */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 rounded-lg p-3 flex items-center justify-center flex-shrink-0">
              <Wrench className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-2">
                How we integrate these brands
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Every project follows the same disciplined workflow — <strong>design</strong> the system to the
                client's lifestyle, <strong>pre-wire</strong> the structure during rough-in,{" "}
                <strong>build the rack</strong> in our shop, <strong>program</strong> control and voice,{" "}
                <strong>calibrate</strong> audio and video to reference targets, and <strong>hand off</strong> a
                documented, remotely serviceable system. Each dealer relationship below plugs into a specific
                stage of that process so nothing on your jobsite is improvised.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <h3 className="text-xl font-bold text-card-foreground">{partner.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary whitespace-nowrap">
                    <Star className="w-3 h-3 mr-1" />
                    {partner.badge}
                  </span>
                </div>
                <p className="text-sm font-medium text-primary mb-2">{partner.specialty}</p>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">{partner.description}</p>

              <div className="mb-4 pl-3 border-l-2 border-primary/40">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                  How we integrate it
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{partner.integration}</p>
              </div>

              <ul className="space-y-2">
                {partner.keyBenefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-card-foreground mb-4">
            Why Professional Partnerships Matter
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-card-foreground mb-2">Direct Access</h4>
              <p className="text-sm text-muted-foreground">
                No middleman pricing — direct dealer benefits passed to you
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-card-foreground mb-2">Professional Grade</h4>
              <p className="text-sm text-muted-foreground">
                Commercial-quality equipment vs consumer alternatives
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-card-foreground mb-2">Expert Support</h4>
              <p className="text-sm text-muted-foreground">
                Factory training and dedicated technical support channels
              </p>
            </div>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3"
            onClick={handleContactClick}
          >
            Discuss Your Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DealerPartners;