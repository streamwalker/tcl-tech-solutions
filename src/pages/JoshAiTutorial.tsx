
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mic, Volume2, Lightbulb, Tv, Music, Sun, CloudSun, Fan, Play, Timer,
  Smartphone, Shield, HelpCircle, Settings, Users, Palette, Film,
  BookOpen, Zap, Eye, Lock, Wifi, MonitorSpeaker, Star, ArrowRight,
  CheckCircle, Info, MessageSquare
} from "lucide-react";

import joshCoreImg from "@/assets/josh-core.jpg";
import joshOneImg from "@/assets/josh-one.jpg";
import joshMicroImg from "@/assets/josh-micro.jpg";
import joshNanoImg from "@/assets/josh-nano.jpg";
import joshTouchscreenImg from "@/assets/josh-touchscreen.jpg";
import joshLifestyleHero from "@/assets/josh-lifestyle-hero.jpg";

const products = [
  {
    name: "Josh Core",
    description: "The brain of your smart home. Processes all voice commands locally for maximum privacy and speed.",
    icon: Zap,
    tag: "Hub",
    image: joshCoreImg,
  },
  {
    name: "Josh One",
    description: "Premium tabletop device with far-field microphones and rich speaker for room-filling sound.",
    icon: MonitorSpeaker,
    tag: "Voice Device",
    image: joshOneImg,
  },
  {
    name: "Josh Micro",
    description: "Compact in-ceiling or in-wall microphone. Invisible design, always listening for your wake word.",
    icon: Mic,
    tag: "Microphone",
    image: joshMicroImg,
  },
  {
    name: "Josh Nano",
    description: "Smallest Josh device — fits in tight spaces like closets, bathrooms, and hallways.",
    icon: Wifi,
    tag: "Compact Mic",
    image: joshNanoImg,
  },
  {
    name: "Josh App",
    description: "Control your entire home from your phone. Create scenes, manage users, and monitor from anywhere.",
    icon: Smartphone,
    tag: "Mobile App",
    image: null,
  },
  {
    name: "Josh Touchscreen",
    description: "Wall-mounted display for visual control of your home — lights, climate, cameras, and more.",
    icon: Eye,
    tag: "Display",
    image: joshTouchscreenImg,
  },
];

const wakeWords = [
  { phrase: '"Ok Josh"', device: "Josh One / Josh Core", note: "The default wake phrase for most Josh devices." },
  { phrase: '"Hey Josh"', device: "Josh One / Josh Core", note: "An alternate casual wake phrase." },
  { phrase: '"Hey Micro"', device: "Josh Micro", note: "Dedicated wake phrase for in-ceiling Micro units." },
  { phrase: '"Ok Home"', device: "Any Josh device", note: "A universal wake word option for all devices." },
  { phrase: '"Nikola"', device: "Any Josh device", note: "Named after Nikola Tesla — a fun alternate wake word." },
];

const topCommands = [
  { icon: Lightbulb, category: "Lighting", color: "text-amber-500", bgColor: "bg-amber-50", examples: ['"Turn on the kitchen lights"', '"Dim the living room to 40%"', '"Set the bedroom lights to warm white"'] },
  { icon: Tv, category: "Television", color: "text-blue-500", bgColor: "bg-blue-50", examples: ['"Turn on the TV"', '"Switch to HDMI 2"', '"Turn on Netflix"'] },
  { icon: Music, category: "Music", color: "text-purple-500", bgColor: "bg-purple-50", examples: ['"Play jazz in the kitchen"', '"Skip this song"', '"Turn up the volume"'] },
  { icon: Sun, category: "Shades", color: "text-orange-500", bgColor: "bg-orange-50", examples: ['"Open the blinds"', '"Close the shades in the bedroom"', '"Set shades to 50%"'] },
  { icon: Palette, category: "Scenes", color: "text-emerald-500", bgColor: "bg-emerald-50", examples: ['"Activate movie night"', '"Good morning"', '"Goodnight"'] },
  { icon: CloudSun, category: "Climate", color: "text-cyan-500", bgColor: "bg-cyan-50", examples: ['"Set the thermostat to 72"', '"What\'s the temperature inside?"', '"Turn on the AC"'] },
  { icon: Fan, category: "Fans", color: "text-slate-500", bgColor: "bg-slate-50", examples: ['"Turn on the ceiling fan"', '"Set the fan to medium"', '"Turn off all fans"'] },
  { icon: Play, category: "Streaming", color: "text-red-500", bgColor: "bg-red-50", examples: ['"Play Stranger Things on Netflix"', '"Pause"', '"Resume playback"'] },
  { icon: Timer, category: "Timers", color: "text-indigo-500", bgColor: "bg-indigo-50", examples: ['"Set a timer for 10 minutes"', '"How much time is left?"', '"Cancel the timer"'] },
  { icon: MessageSquare, category: "JoshGPT", color: "text-green-500", bgColor: "bg-green-50", examples: ['"Josh, what\'s a good recipe for pasta?"', '"Tell me a joke"', '"What\'s the weather this weekend?"'] },
];

const trainingSteps = {
  scenes: [
    { step: 1, title: "Open the Josh App", detail: "Launch the Josh App on your phone or tablet. Tap the menu icon in the top-left corner." },
    { step: 2, title: "Navigate to Scenes", detail: 'Tap "Scenes" from the main menu. You\'ll see any existing scenes listed here.' },
    { step: 3, title: "Tap the + Button", detail: "Tap the plus icon to create a new scene. Give it a memorable name like \"Movie Night\" or \"Good Morning\"." },
    { step: 4, title: "Add Actions", detail: "Select which devices to include — lights, shades, TV, music, thermostat. Set each to your desired state." },
    { step: 5, title: "Save & Test", detail: 'Tap "Save" and then try activating it by saying "Ok Josh, activate Movie Night."' },
  ],
  users: [
    { step: 1, title: "Open Settings in the App", detail: "Go to the Josh App and tap Settings (gear icon) in the bottom navigation." },
    { step: 2, title: "Select User Management", detail: 'Tap "Users & Permissions" to see the list of household members.' },
    { step: 3, title: "Invite a New User", detail: "Tap \"Add User\" and enter their email address. They'll receive an invite to download the Josh App." },
    { step: 4, title: "Set Permissions", detail: "Choose their access level — Full Access, Limited, or Guest. Guests can control basics but can't change settings." },
  ],
  lighting: [
    { step: 1, title: "Start Simple", detail: 'Say "Ok Josh, turn on the lights" in any room. Josh will control the lights in the room where it hears you.' },
    { step: 2, title: "Adjust Brightness", detail: 'Say "Dim the lights to 50%" or "Brighten the lights." Josh understands percentage levels from 0–100%.' },
    { step: 3, title: "Change Color Temperature", detail: 'For tunable lights, say "Set the lights to warm white" or "Make the lights cool." Warm is cozy, cool is energizing.' },
    { step: 4, title: "Control Specific Rooms", detail: 'Be specific: "Turn off the kitchen lights" or "Set the bedroom to 30%." Josh knows all your room names.' },
    { step: 5, title: "Use Scenes for Groups", detail: "Instead of adjusting each light, create a scene that sets multiple lights at once. Say \"Activate dinner time.\"" },
  ],
  entertainment: [
    { step: 1, title: "Turn On Your TV", detail: 'Say "Ok Josh, turn on the TV" or specify the room: "Turn on the family room TV."' },
    { step: 2, title: "Switch Inputs", detail: 'Say "Switch to Apple TV" or "Change to HDMI 1." Josh knows your input names if they\'ve been configured.' },
    { step: 3, title: "Control Volume", detail: 'Say "Turn up the volume," "Mute," or "Set volume to 30." Works for TV speakers and connected audio systems.' },
    { step: 4, title: "Play Music", detail: 'Say "Play music in the kitchen" and Josh will use your default music service. Specify artists, genres, or playlists.' },
    { step: 5, title: "Multi-Room Audio", detail: 'Say "Play jazz everywhere" or "Play music in the kitchen and living room." Josh can group zones together.' },
  ],
};

const tips = [
  { title: "Speak Naturally", description: "Josh understands natural language. You don't need to memorize exact phrases — just talk like you would to a person.", icon: MessageSquare },
  { title: "Room Awareness", description: "Josh knows which room you're in. Just say \"turn on the lights\" and it controls the lights in your current room.", icon: Eye },
  { title: "You Can't Break It", description: "Don't worry about saying the wrong thing. Josh will simply say it doesn't understand and ask you to try again.", icon: Shield },
  { title: "Use \"Goodnight\"", description: "The \"Goodnight\" command is a scene that can turn off all lights, lock doors, and arm your security. Ask your installer to set it up.", icon: Star },
  { title: "Check the App First", description: "If voice isn't working, open the Josh App and try controlling the device there. This helps narrow down the issue.", icon: Smartphone },
  { title: "Privacy is Built In", description: "Josh processes your voice locally — your audio never goes to the cloud. A physical mute button lets you disable the mic anytime.", icon: Lock },
];

const gettingStartedVideos = [
  { title: "Getting Started with Josh.ai", id: "Jx5KkWbHqMc", description: "A complete overview of setting up and using your Josh system." },
  { title: "Voice Control Basics", id: "3cXIKCF9lJk", description: "Learn the most common voice commands for everyday use." },
  { title: "Creating Scenes", id: "IeyP4GZf1RI", description: "How to create and activate custom scenes for any occasion." },
  { title: "Josh App Walkthrough", id: "dRfAOOJF5rY", description: "Navigate the Josh App like a pro with this step-by-step tour." },
  { title: "Josh Micro Overview", id: "QO04h2JYbEk", description: "Discover the in-ceiling Josh Micro — invisible voice control for every room." },
  { title: "Josh One Product Tour", id: "r2TaTnHmYR4", description: "See the premium Josh One tabletop device in action with full demo." },
];

const advancedVideos = [
  { title: "JoshGPT & AI Features", id: "5GktPnOgKQY", description: "Explore JoshGPT — generative AI integrated into your smart home." },
  { title: "Multi-Room Audio Setup", id: "XkYqvCnXfXk", description: "Learn how to play music across multiple zones simultaneously." },
  { title: "Josh + Lutron Integration", id: "8RK_ZjGkWQw", description: "See how Josh integrates with Lutron lighting systems seamlessly." },
  { title: "Josh Touchscreen Demo", id: "9jYKvr8qDcM", description: "A walkthrough of the wall-mounted Josh Touchscreen interface." },
  { title: "Privacy & Security Deep Dive", id: "cL9vAqnF2Jw", description: "How Josh.ai protects your data with local processing and physical mute." },
  { title: "Josh for Whole-Home Control", id: "HdYMnFZjZkA", description: "Control lighting, shades, HVAC, security and more with one voice." },
];

const JoshAiTutorial = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero with lifestyle image */}
      <section className="pt-24 pb-0 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10 pb-12">
          <Badge className="mb-4 bg-emerald-600/20 text-emerald-300 border-emerald-500/30 text-sm">
            Smart Home Guide
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ lineHeight: 1.1 }}>
            Josh.ai Tutorial &amp; Training
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8" style={{ textWrap: "balance" as any }}>
            Your complete guide to mastering voice-controlled living. Written for everyone — no tech experience required.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Mic className="w-4 h-4" /> Voice Control</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Private &amp; Secure</span>
            <span className="flex items-center gap-1.5"><Smartphone className="w-4 h-4" /> App &amp; Touch</span>
            <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> JoshGPT AI</span>
          </div>
        </div>
        <div className="w-full h-64 sm:h-80 lg:h-96 relative">
          <img
            src={joshLifestyleHero}
            alt="Luxury smart home living room with automated lighting, motorized shades, and entertainment system"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-slate-900/60" />
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <Tabs defaultValue="tutorial" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="tutorial" className="text-base py-3">
              <BookOpen className="w-4 h-4 mr-2" /> Josh.ai Tutorial
            </TabsTrigger>
            <TabsTrigger value="training" className="text-base py-3">
              <Users className="w-4 h-4 mr-2" /> Josh.ai Training
            </TabsTrigger>
          </TabsList>

          {/* ========== TUTORIAL TAB ========== */}
          <TabsContent value="tutorial" className="space-y-12">

            {/* What is Josh.ai */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">What is Josh.ai?</h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                Josh.ai is a luxury voice-controlled smart home system designed for privacy. Unlike mass-market
                assistants, Josh processes your voice <strong>locally</strong> — your words never leave your home.
                It controls lighting, shades, climate, entertainment, security, and more with simple, natural voice commands.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => (
                  <Card key={p.name} className="border border-slate-200 hover:shadow-md transition-shadow overflow-hidden">
                    {p.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={p.image}
                          alt={`${p.name} smart home device`}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <p.icon className="w-8 h-8 text-blue-600" />
                        <Badge variant="secondary" className="text-xs">{p.tag}</Badge>
                      </div>
                      <CardTitle className="text-lg">{p.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">{p.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Wake Words */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Getting Started: Wake Phrases</h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                Every interaction begins with a <strong>wake phrase</strong>. Say one of these, pause briefly, then speak your command.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {wakeWords.map((w) => (
                  <Card key={w.phrase} className="border border-slate-200">
                    <CardContent className="pt-5">
                      <p className="text-xl font-semibold text-blue-600 mb-1">{w.phrase}</p>
                      <p className="text-xs text-slate-500 mb-2">{w.device}</p>
                      <p className="text-sm text-slate-600">{w.note}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> Your installer can customize which wake words are active and even change Josh's
                  voice to a different gender or accent in the system settings.
                </p>
              </div>
            </div>

            {/* Top 10 Voice Commands */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Top 10 Voice Command Categories</h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                Here are the most common things you can ask Josh to do. Remember — speak naturally!
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {topCommands.map((cmd) => (
                  <Card key={cmd.category} className="border border-slate-200">
                    <CardContent className="pt-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg ${cmd.bgColor} flex items-center justify-center`}>
                          <cmd.icon className={`w-5 h-5 ${cmd.color}`} />
                        </div>
                        <h3 className="font-semibold text-slate-900">{cmd.category}</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {cmd.examples.map((ex, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Josh App */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Using the Josh App</h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                The Josh App puts your entire home at your fingertips. Available on iOS and Android.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Eye, title: "Dashboard", desc: "See all rooms and devices at a glance. Tap any device to control it instantly." },
                  { icon: Palette, title: "Scenes", desc: "Activate pre-built scenes or create your own. One tap sets multiple devices." },
                  { icon: Wifi, title: "Remote Access", desc: "Control your home from anywhere in the world — as long as you have internet." },
                  { icon: Users, title: "User Profiles", desc: "Each family member gets their own profile with customizable permissions." },
                  { icon: Settings, title: "Settings", desc: "Adjust wake words, device names, notification preferences, and more." },
                  { icon: Film, title: "Activity Log", desc: "See a history of commands and automations that have run in your home." },
                ].map((item) => (
                  <Card key={item.title} className="border border-slate-200">
                    <CardContent className="pt-5">
                      <item.icon className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* JoshGPT */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">JoshGPT: Your AI Home Assistant</h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                JoshGPT brings generative AI into your smart home. Ask Josh general knowledge questions,
                get recipe ideas, hear jokes, or get weather forecasts — all through natural conversation.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { q: '"Josh, what\'s a good recipe for chicken?"', a: "Josh suggests recipes with step-by-step instructions." },
                  { q: '"Josh, tell me a bedtime story"', a: "Josh creates original short stories for kids and adults." },
                  { q: '"Josh, what\'s the weather this weekend?"', a: "Josh gives you a local forecast in plain language." },
                ].map((item, i) => (
                  <Card key={i} className="border border-emerald-200 bg-emerald-50/50">
                    <CardContent className="pt-5">
                      <MessageSquare className="w-6 h-6 text-emerald-600 mb-2" />
                      <p className="font-medium text-slate-900 text-sm mb-2">{item.q}</p>
                      <p className="text-sm text-slate-600">{item.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Privacy */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Privacy &amp; Security</h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                Josh.ai was built with privacy as a core principle — not an afterthought.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Lock, title: "Local Processing", desc: "Voice is processed on your Josh Core — never uploaded to the cloud." },
                  { icon: Shield, title: "No Data Selling", desc: "Josh.ai never sells your data or uses it for advertising. Period." },
                  { icon: Mic, title: "Physical Mute", desc: "Every Josh device has a physical mute button that electrically disconnects the microphone." },
                  { icon: Eye, title: "No Always-On Cameras", desc: "Josh devices don't have cameras. Your visual privacy is fully protected." },
                ].map((item) => (
                  <Card key={item.title} className="border border-slate-200">
                    <CardContent className="pt-5 flex gap-4">
                      <item.icon className="w-8 h-8 text-blue-600 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {[
                  { q: "Do I need Wi-Fi for Josh to work?", a: "Yes, Josh requires a stable home network. However, voice processing happens locally on the Josh Core, so even if your internet goes down, basic commands may still work for locally connected devices." },
                  { q: "Can Josh control devices from other brands?", a: "Absolutely. Josh integrates with over 1,500 brands including Lutron, Sonos, Samsung, LG, Apple TV, Nest, Ecobee, and many more. Your installer configures all integrations." },
                  { q: "What if Josh doesn't understand me?", a: "Try rephrasing your command more simply. Make sure you're using a wake phrase first. If issues persist, check the Josh App for connectivity status or contact your installer." },
                  { q: "Can I use Josh and Alexa/Google at the same time?", a: "Yes! Josh can coexist with other voice assistants. Many homeowners use Josh for home control and keep Alexa or Google for shopping, timers, etc." },
                  { q: "How do I update Josh?", a: "Josh updates automatically over your home network. Your installer manages firmware updates — you don't need to do anything." },
                  { q: "Can guests use Josh?", a: "Yes. Guests can use voice commands without any setup. For app access, you can invite them with a Guest profile that has limited permissions." },
                ].map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-slate-900">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-slate-600">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {/* ========== TRAINING TAB ========== */}
          <TabsContent value="training" className="space-y-12">

            {/* Tips for Less Tech-Savvy Users */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Tips &amp; Tricks</h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                New to smart home technology? These tips will help you feel confident in no time.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tips.map((tip) => (
                  <Card key={tip.title} className="border border-slate-200 hover:shadow-md transition-shadow">
                    <CardContent className="pt-5">
                      <tip.icon className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-semibold text-slate-900 mb-1">{tip.title}</h3>
                      <p className="text-sm text-slate-600">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Step-by-Step Walkthroughs */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Step-by-Step Walkthroughs</h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                Follow these guides at your own pace. Each one walks you through a common task from start to finish.
              </p>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {[
                  { key: "scenes", title: "Creating a Scene", badge: "Beginner", steps: trainingSteps.scenes },
                  { key: "users", title: "Managing Users & Permissions", badge: "Beginner", steps: trainingSteps.users },
                  { key: "lighting", title: "Mastering Lighting Control", badge: "Beginner", steps: trainingSteps.lighting },
                  { key: "entertainment", title: "Entertainment & Media", badge: "Intermediate", steps: trainingSteps.entertainment },
                ].map((section) => (
                  <AccordionItem key={section.key} value={section.key} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-slate-900">{section.title}</span>
                        <Badge variant={section.badge === "Beginner" ? "secondary" : "outline"} className="text-xs">
                          {section.badge}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        {section.steps.map((s) => (
                          <div key={s.step} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                              {s.step}
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900">{s.title}</h4>
                              <p className="text-sm text-slate-600 mt-0.5">{s.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Featured: Josh.ai Keynote 2026 */}
            <div className="mb-12">
              <Badge className="bg-amber-100 text-amber-800 border-amber-300 mb-3">Featured</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Josh.ai Keynote 2026</h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                The latest Josh.ai event — discover what's next for the platform. "For years, Josh has been building toward something bigger."
              </p>
              <div className="max-w-4xl">
                <Card className="border border-slate-200 overflow-hidden shadow-lg">
                  <div className="aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/0gVKShqKTd4"
                      title="Josh.ai Keynote 2026 Event"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="font-semibold text-slate-900">Josh.ai Keynote 2026 Event</p>
                    <p className="text-sm text-slate-500">47:31 · Published March 19, 2026</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Getting Started Videos */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Getting Started Videos</h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                Watch these beginner-friendly Josh.ai tutorials to get comfortable with the basics.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gettingStartedVideos.map((v) => (
                  <Card key={v.id} className="border border-slate-200 overflow-hidden">
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${v.id}`}
                        title={v.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-slate-900 mb-1">{v.title}</h3>
                      <p className="text-sm text-slate-600">{v.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Advanced Videos */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Advanced Features &amp; Integrations</h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                Ready for more? These videos cover advanced features like JoshGPT, multi-room audio, and third-party integrations.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {advancedVideos.map((v) => (
                  <Card key={v.id} className="border border-slate-200 overflow-hidden">
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${v.id}`}
                        title={v.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-slate-900 mb-1">{v.title}</h3>
                      <p className="text-sm text-slate-600">{v.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Reference Card */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Quick Reference Card</h2>
              <p className="text-slate-600 mb-6 max-w-3xl">
                Print this or save it to your phone for easy access to the most common commands.
              </p>
              <Card className="border-2 border-blue-200 bg-blue-50/30">
                <CardContent className="pt-6">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { label: "Lights On/Off", cmd: '"Ok Josh, turn on/off the lights"' },
                      { label: "Dim Lights", cmd: '"Ok Josh, dim the lights to 50%"' },
                      { label: "TV On", cmd: '"Ok Josh, turn on the TV"' },
                      { label: "Play Music", cmd: '"Ok Josh, play music"' },
                      { label: "Adjust Temp", cmd: '"Ok Josh, set thermostat to 72"' },
                      { label: "Open Shades", cmd: '"Ok Josh, open the shades"' },
                      { label: "Activate Scene", cmd: '"Ok Josh, activate movie night"' },
                      { label: "Goodnight", cmd: '"Ok Josh, goodnight"' },
                      { label: "Set Timer", cmd: '"Ok Josh, set a timer for 10 min"' },
                      { label: "Weather", cmd: '"Ok Josh, what\'s the weather?"' },
                      { label: "Volume Up", cmd: '"Ok Josh, turn up the volume"' },
                      { label: "Ask JoshGPT", cmd: '"Ok Josh, tell me a joke"' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                          <p className="text-xs text-slate-600">{item.cmd}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <Footer />
    </div>
  );
};

export default JoshAiTutorial;
