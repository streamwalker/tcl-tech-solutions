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
        "Juke builds compact multi-zone amplifiers that stream AirPlay, Spotify Connect, Sonos, and line-in sources to up to eight zones per unit.",
      integration:
        "We rack Juke in the AV closet during trim, map each zone to a room in the control system, and expose zone volume and source control inside URC, Savant, RTI, or Josh.ai — whole-home audio without a per-zone streamer.",
      keyBenefits: ["8 zones per amp", "Streams every major service", "Unified control-system access"],
    },
    {
      name: "Kaleidescape",
      badge: "Authorized Dealer",
      specialty: "Reference Cinema",
      description:
        "The reference-quality movie server used in the world's finest theaters — lossless audio and true 4K HDR that outperforms every streaming service.",
      integration:
        "We spec the Strato/Terra combo into theater and media-room designs, wire it into the video matrix, and build one-button 'Watch a Movie' scenes that dim the lights, close the shades, and cue the projector.",
      keyBenefits: ["Reference 4K HDR", "Lossless audio tracks", "One-button cinema scenes"],
    },
    {
      name: "Epson",
      badge: "Authorized Dealer",
      specialty: "Projection",
      description:
        "Epson LS-series and Pro Cinema laser projectors deliver bright, color-accurate images for dedicated theaters, media rooms, and outdoor screens.",
      integration:
        "Our CEDIA-trained designers pick the right lumens and throw distance for the room, mount and align in-house, and calibrate to ISF and THX targets post-install.",
      keyBenefits: ["Laser light-source longevity", "High-lumen output", "ISF/THX calibrated"],
    },
    {
      name: "Samsung",
      badge: "Authorized Dealer",
      specialty: "Displays & Frame TV",
      description:
        "Samsung Neo QLED, OLED, MicroLED, and The Frame lines cover luxury living rooms, kitchens, primary suites, and outdoor patios.",
      integration:
        "We size and mount displays, hide power and HDMI in-wall, and integrate every TV into the control system so a single button changes source, volume, and lighting scene.",
      keyBenefits: ["Whole-home display strategy", "Concealed wiring", "One-touch scene control"],
    },
    {
      name: "JVC",
      badge: "Authorized Dealer",
      specialty: "Reference Projection",
      description:
        "JVC D-ILA projectors are the gold standard for native-4K contrast and true black level in dedicated theaters.",
      integration:
        "We pair JVC with anamorphic lensing or CinemaScope screens for clients who want true reference cinema, then calibrate with Calman for both HDR and SDR.",
      keyBenefits: ["Native 4K D-ILA", "Reference black level", "Calman-calibrated"],
    },
    {
      name: "URC (Universal Remote Control)",
      badge: "HAP Certified Dealer",
      specialty: "Control Systems",
      description:
        "URC's Total Control and Home Automation Platform is our primary control backbone for smart homes and light commercial spaces.",
      integration:
        "We program room-by-room activities, unify AV, lighting, climate, and security under one remote or in-wall touchscreen, and support the system remotely through URC's cloud tools.",
      keyBenefits: ["Unified whole-home control", "In-wall touchscreens", "Remote service tools"],
    },
    {
      name: "Elura",
      badge: "Authorized Dealer",
      specialty: "Surveillance & Access",
      description:
        "Elura provides pro-grade IP cameras, NVRs, intercoms, and analytics purpose-built for residential integrators.",
      integration:
        "We design camera coverage during pre-wire, terminate PoE at the network rack, and surface live feeds and doorbell calls on TVs, phones, and control interfaces.",
      keyBenefits: ["Pre-wire coverage design", "PoE network integration", "Feeds on every screen"],
    },
    {
      name: "Marantz",
      badge: "Authorized Dealer",
      specialty: "AV Receivers & Preamps",
      description:
        "Marantz reference AV receivers and Cinema-series processors deliver audiophile 2-channel and reference home-theater performance in one chassis.",
      integration:
        "We spec Marantz for media rooms and 2-channel listening zones, apply Dirac Live or Audyssey room correction, and hand off a system that sounds right the day you move in.",
      keyBenefits: ["Audiophile 2-channel", "Reference home theater", "Room-corrected on delivery"],
    },
    {
      name: "Denon",
      badge: "Authorized Dealer",
      specialty: "AV Receivers",
      description:
        "Denon AVRs are the workhorse for dedicated theaters and media rooms — up to 11.4 channels with Dolby Atmos and DTS:X.",
      integration:
        "We size the AVR to the speaker layout, rack it with proper ventilation, and lock down the configuration so guests can't break the calibration.",
      keyBenefits: ["Up to 11.4 channels", "Atmos & DTS:X ready", "Config-locked handoff"],
    },
    {
      name: "AVA Cinema Remote",
      badge: "Authorized Dealer",
      specialty: "Luxury Home Theater",
      description:
        "AVA Cinema delivers commercial-grade luxury theater builds — acoustic design, riser fabrication, motorized seating, and screen and projector packages.",
      integration:
        "We integrate AVA rooms into the whole-home control system so the theater is one tap away from every family device, with lighting, shades, and HVAC all cued to the movie scene.",
      keyBenefits: ["Acoustic room design", "Motorized theater seating", "Scene-linked whole home"],
    },
    {
      name: "Big Dog Power",
      badge: "Authorized Dealer",
      specialty: "Power Management",
      description:
        "Big Dog Power's rack-mount PDUs, surge suppression, and remote reboot units protect every device we install and let us restore a locked AV zone without a truck roll.",
      integration:
        "Every TCL rack ships with a Big Dog PDU so the client's investment is protected from day one and remotely serviceable from our support desk.",
      keyBenefits: ["Surge & power conditioning", "Remote reboot per outlet", "Standard on every rack"],
    },
    {
      name: "Josh.ai",
      badge: "Certified Designer & Programmer",
      specialty: "Voice AI",
      description:
        "Josh.ai is the privacy-first voice assistant purpose-built for luxury smart homes — natural-language control of lighting, shades, climate, AV, and security without sending audio to advertising clouds.",
      integration:
        "Our Josh designers program rooms, scenes, and multi-word commands, then integrate Josh with URC, Savant, RTI, Lutron, and Elura so voice becomes the fastest interface in the house.",
      keyBenefits: ["Privacy-first voice AI", "Multi-word natural commands", "Cross-platform integration"],
    },
    {
      name: "Savant",
      badge: "Certified Integrator",
      specialty: "Smart Home AI Platform",
      description:
        "Advanced smart home automation with intuitive user interfaces and AI-powered personalization across audio, video, and environmental systems.",
      integration:
        "We deploy Savant Pro hosts, program scenes and schedules, and blend Savant with Lutron, URC, and Josh.ai for a single luxury experience across every room.",
      keyBenefits: ["AI-driven scenes", "Luxury touch UI", "Cross-brand orchestration"],
    },
    {
      name: "RTI",
      badge: "Certified Programmer",
      specialty: "Custom Control",
      description:
        "RTI delivers commercial-grade control systems for complex residential and light-commercial installations with fully custom UIs.",
      integration:
        "We design bespoke RTI interfaces, drive AV and lighting drivers, and stand up dealer-managed remote support so we can service the system without a site visit.",
      keyBenefits: ["Custom on-screen UI", "Commercial reliability", "Remote diagnostics"],
    },
    {
      name: "Lutron RadioRA 3",
      badge: "Certified Dealer",
      specialty: "Lighting & Shade Control",
      description:
        "Lutron RadioRA 3 is the reference wireless platform for whole-home lighting control, keypads, and automated shades.",
      integration:
        "We engineer keypad layouts, load schedules, and shade groups, then bridge Lutron into URC, Savant, RTI, and Josh.ai so lighting scenes trigger with every AV activity.",
      keyBenefits: ["Wireless reliability", "Custom keypad engraving", "Scene-linked with AV"],
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