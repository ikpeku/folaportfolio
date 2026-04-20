import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Assets from "../assets";
import Footer from "../component/Footer";
import { useNavigate } from "react-router";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

const NAV_ITEMS = [
  { id: "Context",       title: "Context" },
  { id: "Research",      title: "Research" },
  { id: "Problems",      title: "Problems" },
  { id: "Explorations",  title: "Explorations" },
  { id: "DesignTesting", title: "Design & Testing" },
  { id: "Impact",        title: "Impact" },
  { id: "Reflections",   title: "Reflections" },
];

const ACCENT = "#CA8A04";

// ── Primitives ────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] md:text-[14px] tracking-widest text-[#6A6A6A] font-semibold">{children}</p>
);

const Divider = ({ className = "my-16" }: { className?: string }) => (
  <motion.div className={`border-t border-dashed border-neutral-200 ${className}`} {...fadeUp(0)} />
);

const HMW = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-8 my-8 border-l-2" style={{ borderLeftColor: ACCENT }}>
    <p className="text-[14px] italic tracking-widest text-[#6A6A6A] font-semibold mb-3">How might we…</p>
    <p className="text-[16px] md:text-[18px] italic font-semibold leading-relaxed text-[#3D3D4E]">{children}</p>
  </div>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-8">
    <p className="text-[20px] md:text-[28px] font-bold mb-2" style={{ color: ACCENT }}>{value}</p>
    <p className="text-[14px] md:text-[16px] font-medium leading-snug text-[#6A6A6A]">{label}</p>
  </div>
);

const LearnItem = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex gap-3 items-start">
    <span className="text-[18px]">{icon}</span>
    <p className="text-[14px] leading-relaxed text-[#3D3D4E]">{text}</p>
  </div>
);

// Simulated phone frame — dark bg, amber accent stripe at top
const PhoneMock = ({ label, dark = false }: { label: string; dark?: boolean }) => (
  <div
    className="rounded-[2rem] overflow-hidden shadow-md flex flex-col"
    style={{
      aspectRatio: "9/19",
      background: dark ? "#1C1C1E" : "#F3F4F6",
    }}
  >
    {/* status bar + accent stripe */}
    <div className="h-1.5 w-full" style={{ background: ACCENT }} />
    <div className="flex-1 flex items-center justify-center px-3">
      <span
        className="text-[11px] font-semibold text-center leading-relaxed"
        style={{ color: dark ? "#9CA3AF" : "#B1B1B8" }}
      >
        {label}
      </span>
    </div>
  </div>
);

// Row of phones — responsive
const PhoneRow = ({ phones, cols = 4 }: { phones: { label: string; dark?: boolean }[]; cols?: number }) => (
  <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
    {phones.map((p) => (
      <PhoneMock key={p.label} label={p.label} dark={p.dark} />
    ))}
  </div>
);

const DirectionCard = ({
  title,
  body,
  chosen,
}: {
  title: string;
  body: string;
  chosen?: boolean;
}) => (
  <div
    className={`rounded-xl border p-5 ${
      chosen ? "border-[#191919] bg-white" : "border-neutral-200 bg-[#F9FAFB]"
    }`}
  >
    {chosen && (
      <span className="inline-block text-[11px] font-semibold bg-[#191919] text-white rounded-full px-2.5 py-0.5 mb-3">
        Chosen direction
      </span>
    )}
    <p className="text-[15px] font-semibold text-[#191919]">{title}</p>
    <p className="text-[13px] text-[#3D3D4E] mt-2 leading-relaxed">{body}</p>
  </div>
);

// ═══════════════════════════════════════════════════════════════
const Behold = () => {
  const [active, setActive] = useState<string | null>(null);
  const visibilityRef = useRef<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const pick = () => {
      const found = ids.find((id) => visibilityRef.current[id]) ?? null;
      setActive(found);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visibilityRef.current[e.target.id] = e.isIntersecting;
        });
        pick();
      },
      { threshold: 0.15, rootMargin: "0px 0px -40% 0px" }
    );

    sections.forEach((s) => observerRef.current!.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pt-10 md:pt-16">

      {/* ── Hero banner ── */}
      <motion.div {...fadeUp(0.05)}>
        <div className="w-full aspect-16/8 bg-neutral-100 rounded-xl overflow-hidden">
          <img src={Assets.Beholdshot} alt="Behold banner" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* ── Title + meta ── */}
      <motion.div className="mt-10" {...fadeUp(0.1)}>
        <h1 className="text-[28px] md:text-[36px] font-medium leading-tight italic">
          Redesigning Reflections & Sharing around user comfort
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:mt-5 mt-6">
          <div>
            <p className="text-[14px] font-semibold text-[#3D3D4E]">Behold</p>
            <p className="text-[14px] md:text-[16px] font-semibold text-[#6A6A6A] mt-1">Dec 2019 – Jan 2021</p>
          </div>
          <div>
            <SectionLabel>ROLE</SectionLabel>
            <p className="text-[14px] md:text-[18px] font-medium leading-snug mt-1">Solo Product Designer</p>
          </div>
          <div>
            <SectionLabel>TEAM</SectionLabel>
            <p className="text-[14px] md:text-[18px] font-medium leading-snug mt-1">1 Product Manager & 2 Mobile Developers</p>
          </div>
        </div>
      </motion.div>

      <Divider />

      {/* ── Two-column layout ── */}
      <div className="flex gap-12 items-start">

        {/* ── Sidebar ── */}
        <aside className="shrink-0 sticky top-10 self-start">

          {/* Desktop */}
          <div className="hidden lg:flex flex-col gap-1 w-40">
            <button onClick={() => navigate(-1)} className="group mb-6 flex">
              <div className="bg-[#3D3D4E1F] px-4 py-2 rounded-3xl group-hover:bg-[#3D3D4E] inline-flex items-center gap-1.5 text-[13px] text-[#3D3D4E] hover:text-white transition-colors">
                <div className="flex justify-center items-center border-2 font-bold border-[#3D3D4E] group-hover:border-white rounded-full w-6 h-6">←</div>
                <span className="translate-x-2 group-hover:translate-x-0 transition-all duration-300">Back</span>
              </div>
            </button>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left text-[14px] font-semibold py-1 transition-colors duration-200 ${
                  active === item.id ? "text-[#191919]" : "text-[#B1B1B8] hover:text-[#6A6A6A]"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Mobile dots */}
          <div className="lg:hidden fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-label={item.title}
                className={`rounded-full transition-all duration-300 ${
                  active === item.id
                    ? "w-2 h-2 bg-[#191919]"
                    : "w-1.5 h-1.5 bg-[#B1B1B8] hover:bg-[#6A6A6A]"
                }`}
              />
            ))}
          </div>

        </aside>

        {/* ── Main content ── */}
        
      </div>

       <Footer isDetail={true} onClick={() => navigate("/rukah")} />
    </div>
  );
};

export default Behold;


// {/* <main className="flex-1 min-w-0 space-y-16">

//           {/* ── Context ── */}
//           <section id="Context" className="border-b-2 border-dashed border-neutral-200 pb-16">
//             <motion.div {...fadeUp(0.1)}>
//               <SectionLabel>Context</SectionLabel>
//               <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
//                 Helping Christians build a consistent prayer practice
//               </h2>
//               <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
//                 <p>Behold is a mobile app designed to help Christians maintain a consistent daily prayer practice through guided prayers, meditations and reflective journalling. The app pairs each prayer or meditation with curated landscape photography — giving users a visual focal point to centre themselves before engaging with the content.</p>
//                 <p>I joined as the sole designer to redesign two core experiences: the reflection feature, where users record personal thoughts and responses after a prayer session, and the sharing feature, where users could share prayers or reflections with their community. Both had shipped in an earlier version but were underused relative to daily prayer engagement.</p>
//               </div>

//               <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <PhoneMock label="Home — Daily Prayer" dark />
//                 <PhoneMock label="Prayer Screen" dark />
//                 <PhoneMock label="Reflection Entry" dark />
//                 <PhoneMock label="Community Feed" dark />
//               </div>
//             </motion.div>
//           </section>

//           {/* ── Research ── */}
//           <section id="Research">
//             <motion.div {...fadeUp(0.1)}>
//               <SectionLabel>Research</SectionLabel>
//               <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
//                 Understanding why users weren't reflecting or sharing
//               </h2>
//               <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
//                 <p>The product team had usage data showing that fewer than 20% of active users had ever written a reflection, and the sharing feature had near-zero weekly engagement despite a healthy daily active user base on the core prayer content. Before redesigning anything, I needed to understand why.</p>
//                 <p>I ran a survey with 84 active users and followed up with six 45-minute interviews. I focused on moments of hesitation — specifically, what was happening in the seconds after a prayer session ended when users chose not to reflect or share.</p>
//               </div>

//               <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="bg-[#F9FAFB] rounded-xl p-6">
//                   <p className="text-[13px] font-semibold mb-5 text-[#191919]">Why don't you write reflections after prayer?</p>
//                   <div className="space-y-3.5">
//                     {[
//                       { label: "It breaks the feeling of the moment", pct: 78 },
//                       { label: "The blank text field feels intimidating", pct: 65 },
//                       { label: "I don't know what I'm supposed to write", pct: 61 },
//                       { label: "It feels like homework", pct: 44 },
//                       { label: "I worry others might see it", pct: 38 },
//                     ].map(({ label, pct }) => (
//                       <div key={label} className="flex items-center gap-3">
//                         <span className="text-[12px] text-[#3D3D4E] w-52 shrink-0">{label}</span>
//                         <div className="flex-1 bg-neutral-200 rounded-full h-2">
//                           <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: ACCENT }} />
//                         </div>
//                         <span className="text-[12px] font-semibold w-8 text-right">{pct}%</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-[#F9FAFB] rounded-xl p-6">
//                   <p className="text-[13px] font-semibold mb-5 text-[#191919]">Why don't you share prayers or reflections?</p>
//                   <div className="space-y-3.5">
//                     {[
//                       { label: "Prayer feels too personal to share", pct: 83 },
//                       { label: "Worried about how others will receive it", pct: 71 },
//                       { label: "I can't see who would see it", pct: 64 },
//                       { label: "The sharing flow feels abrupt", pct: 52 },
//                       { label: "I don't have a community on the app", pct: 47 },
//                     ].map(({ label, pct }) => (
//                       <div key={label} className="flex items-center gap-3">
//                         <span className="text-[12px] text-[#3D3D4E] w-52 shrink-0">{label}</span>
//                         <div className="flex-1 bg-neutral-200 rounded-full h-2">
//                           <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: ACCENT }} />
//                         </div>
//                         <span className="text-[12px] font-semibold w-8 text-right">{pct}%</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-12">
//                 <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 mb-6">
//                   The pattern underneath both findings
//                 </h2>
//                 <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
//                   <p>Across every interview, the same theme surfaced in different forms: users weren't avoiding reflection and sharing because they were uninterested — they were avoiding them because the current experience made them feel exposed before they'd decided to be. A blank text field immediately after a prayer felt like a demand. A share button with no visibility controls felt like a risk.</p>
//                   <p>The app was treating reflection as a task and sharing as an action. Users were treating both as deeply personal decisions that deserved more care.</p>
//                 </div>

//                 <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {[
//                     { type: "The Private Pray-er", desc: "Daily user, never reflects or shares. Prayer is an internal experience. Would engage with reflection if it stayed completely private.", bg: "#FFFBEB" },
//                     { type: "The Selective Sharer", desc: "Reflects occasionally but only shares with close contacts. Fears losing control once content leaves their hands.", bg: "#F3F4F6" },
//                     { type: "The Reluctant Commenter", desc: "Would love a community dimension but doesn't trust the current sharing mechanism enough to engage with it.", bg: "#F3F4F6" },
//                   ].map(({ type, desc, bg }) => (
//                     <div key={type} className="rounded-xl p-5" style={{ background: bg }}>
//                       <p className="text-[15px] font-semibold text-[#191919] mb-2">{type}</p>
//                       <p className="text-[13px] text-[#3D3D4E] leading-relaxed">{desc}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </section>

//           <Divider />

//           {/* ── Problems ── */}
//           <section id="Problems">
//             <motion.div {...fadeUp(0.1)}>
//               <SectionLabel>The Problem</SectionLabel>
//               <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-4">
//                 Defining the problem
//               </h2>
//               <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
//                 <p>The research made the core design failure clear: both the reflection and sharing features had been designed for an ideal user who was ready to be open, rather than a real user who was still deciding. Every friction point in the current flow pushed undecided users into avoidance.</p>
//               </div>

//               <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-8 my-8">
//                 <p className="text-[14px] italic tracking-widest text-[#6A6A6A] font-semibold mb-3">Problem Statement</p>
//                 <p className="text-[16px] md:text-[18px] italic font-semibold leading-6.75 text-[#3D3D4E]">
//                   The reflection and sharing experiences make users feel exposed before they've chosen to be, creating enough discomfort to abandon both features entirely — even when the desire to reflect or connect is genuinely there.
//                 </p>
//               </div>

//               <p className="my-6 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
//                 We shaped exploration around two "How Might We" statements — one for each feature:
//               </p>

//               <HMW>
//                 Create a reflection experience that feels like a natural extension of prayer rather than a separate task requiring effort?
//               </HMW>

//               <HMW>
//                 Give users enough control over visibility and audience that sharing feels like a chosen act of connection, not an accidental exposure?
//               </HMW>
//             </motion.div>
//           </section>

//           <Divider />

//           {/* ── Explorations ── */}
//           <section id="Explorations">
//             <motion.div {...fadeUp(0.1)}>
//               <SectionLabel>Explorations</SectionLabel>
//               <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-4">
//                 Exploring directions for each feature independently
//               </h2>
//               <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
//                 <p>I explored three directions for each feature, then evaluated them against the HMW statements, how naturally they fit into the post-prayer moment and what was technically achievable.</p>
//               </div>

//               <div className="mt-8">
//                 <p className="text-[13px] font-semibold text-[#6A6A6A] uppercase tracking-widest mb-4">Reflection directions</p>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <DirectionCard
//                     title="Prompted micro-reflection"
//                     body="A single, gentle question surfaced immediately after prayer. No blank field — just a low-stakes prompt that users can answer in one or two sentences, or skip with no friction."
//                     chosen
//                   />
//                   <DirectionCard
//                     title="Freeform journal"
//                     body="An open, private journal tab separate from the prayer flow. More control for power users, but requires users to initiate — doesn't address the post-prayer avoidance pattern."
//                   />
//                   <DirectionCard
//                     title="Emoji-first check-in"
//                     body="A minimal post-prayer check-in using emotional tags and optional short text. Lowers the barrier significantly but may feel too lightweight for users seeking depth."
//                   />
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <p className="text-[13px] font-semibold text-[#6A6A6A] uppercase tracking-widest mb-4">Sharing directions</p>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <DirectionCard
//                     title="Audience selector before sharing"
//                     body="Before any content is shared, users choose who can see it: close contacts, a named group or everyone. The choice is explicit, visual and reversible — building confidence before posting."
//                     chosen
//                   />
//                   <DirectionCard
//                     title="Sharing disabled by default"
//                     body="All content is private unless the user explicitly unlocks sharing. Maximum safety, but too passive — doesn't address users who want to share but lack confidence in the mechanism."
//                   />
//                   <DirectionCard
//                     title="Reactions only, no resharing"
//                     body="Community members can react to shared content but cannot reshare or screenshot. Addresses fear of losing control, but doesn't solve the core visibility anxiety."
//                   />
//                 </div>
//               </div>

//               <div className="mt-10">
//                 <p className="my-6 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
//                   The chosen directions both operated on the same principle: let the user see what the experience would feel like before committing to it. A prompted reflection shows the container before asking for content. An audience selector shows the reach before confirming the share.
//                 </p>
//                 <PhoneRow
//                   cols={4}
//                   phones={[
//                     { label: "Reflection prompt sketch A", dark: true },
//                     { label: "Reflection prompt sketch B", dark: true },
//                     { label: "Sharing flow sketch A", dark: true },
//                     { label: "Sharing flow sketch B", dark: true },
//                   ]}
//                 />
//               </div>
//             </motion.div>
//           </section>

//           <Divider />

//           {/* ── Design & Testing ── */}
//           <section id="DesignTesting">
//             <motion.div {...fadeUp(0.1)}>
//               <SectionLabel>Design & Testing</SectionLabel>
//               <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
//                 Prototyping both features, tested together
//               </h2>
//               <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
//                 <p>I built mid-fidelity prototypes of both chosen directions and tested them in five moderated sessions with current Behold users who hadn't previously engaged with reflection or sharing. Each session covered the full post-prayer journey: completing a meditation, encountering the reflection prompt, writing or skipping a reflection, then choosing whether to share it.</p>
//               </div>

//               <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <PhoneMock label="Post-prayer prompt" dark />
//                 <PhoneMock label="Reflection in progress" dark />
//                 <PhoneMock label="Audience picker" dark />
//                 <PhoneMock label="Shared to group" dark />
//               </div>

//               <div className="mt-10 bg-[#F9FAFB] rounded-xl p-6 md:p-8">
//                 <p className="text-[13px] font-semibold mb-4 text-[#191919]">Key findings from usability sessions</p>
//                 {/* <div className="space-y-3">
//                   {[
//                     "4 out of 5 users wrote at least a short reflection when prompted — compared to near-zero unprompted usage. The question framing mattered: "What stayed with you?" outperformed "Write a reflection."",
//                     "The audience selector resolved most of the sharing anxiety in the first 30 seconds of testing. Once users understood they could choose exactly who saw their content, hesitation dropped significantly.",
//                     "Users wanted the option to reflect without sharing — and to share without having reflected. Linking the two features as a required flow created unnecessary pressure.",
//                     "A "save to private only" shortcut was requested by three participants — a fast way to capture a reflection without any sharing decision at all.",
//                   ].map((finding, i) => (
//                     <div key={i} className="flex gap-3 items-start">
//                       <span className="text-[12px] font-bold mt-0.5 shrink-0" style={{ color: ACCENT }}>{i + 1}.</span>
//                       <p className="text-[14px] text-[#3D3D4E] leading-relaxed">{finding}</p>
//                     </div>
//                   ))}
//                 </div> */}
//               </div>

//               <div className="mt-10">
//                 <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 mb-6">
//                   Final design
//                 </h2>
//                 <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E] mb-8">
//                   <p>The final designs decoupled reflection and sharing into independent paths. The prompted reflection appears automatically after every prayer — one question, no blank field, a prominent "save privately" shortcut alongside the full write option. Sharing became a separate action available from any saved reflection, always preceded by the audience selector.</p>
//                   <p>The dark visual language of the prayer screen carried through into the reflection UI, preserving the contemplative feeling of the session rather than breaking it with a bright form.</p>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <PhoneMock label="Post-prayer prompt" dark />
//                   <PhoneMock label="Writing reflection" dark />
//                   <PhoneMock label="Saved reflections" dark />
//                   <PhoneMock label="Community feed" dark />
//                 </div>
//                 <p className="mt-4 text-center text-[14px] text-[#6A6A6A] font-semibold">Final high-fidelity screens</p>
//               </div>

//               <div className="mt-12">
//                 <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 mb-6">
//                   Sharing flow — audience selector states
//                 </h2>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   <PhoneMock label="Private only" dark />
//                   <PhoneMock label="Close contacts" dark />
//                   <PhoneMock label="All followers" dark />
//                 </div>
//                 <p className="mt-4 text-center text-[14px] text-[#6A6A6A] font-semibold">Audience selector variants</p>
//               </div>
//             </motion.div>
//           </section>

//           <Divider />

//           {/* ── Impact ── */}
//           <section id="Impact">
//             <motion.div {...fadeUp(0.1)}>
//               <SectionLabel>Impact</SectionLabel>
//               <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
//                 Validating the solution
//               </h2>
//               <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E] mb-8">
//                 <p>We launched the redesigned features to all active users in a phased rollout and measured engagement over an 8-week period, comparing against the 8 weeks prior to release.</p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <StatCard value="+53%" label="Increase in users writing at least one reflection per week" />
//                 <StatCard value="3.8×" label="More reflections saved per active user compared to the previous design" />
//                 <StatCard value="+29%" label="Increase in sharing actions, with 74% using a restricted audience" />
//                 <StatCard value="4.5/5" label="Comfort rating for the new sharing flow across post-launch surveys" />
//               </div>

//               <p className="mt-8 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
//                 The "save privately" shortcut became the most-used action in the reflection flow — used in 62% of completed reflections. That single insight confirmed what the research had suggested: a large portion of users wanted to reflect deeply but had no intention of sharing. Designing for that user, rather than designing to maximise sharing, was the right call.
//               </p>

//               <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <PhoneMock label="Prompt (live)" dark />
//                 <PhoneMock label="Save privately" dark />
//                 <PhoneMock label="Reflection saved" dark />
//                 <PhoneMock label="Feed activity" dark />
//               </div>
//             </motion.div>
//           </section>

//           <Divider />

//           {/* ── Reflections ── */}
//           <section id="Reflections">
//             <motion.div {...fadeUp(0.1)}>
//               <SectionLabel>Reflections</SectionLabel>
//               <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
//                 What I took away
//               </h2>
//               <div className="space-y-5 max-w-2xl">
//                 <LearnItem
//                   icon="🛡️"
//                   text="Designing for psychological comfort is a legitimate UX problem, not a product aspiration. Users were failing to use real features because the experience didn't account for the emotional stakes involved. That's a design problem, and it has design solutions."
//                 />
//                 <Divider className="my-4" />
//                 <LearnItem
//                   icon="✂️"
//                   text="Decoupling reflection and sharing was the single most impactful structural change. The original flow implied that reflection was a step towards sharing. Separating them meant each could succeed on its own terms — and they did."
//                 />
//                 <Divider className="my-4" />
//                 <LearnItem
//                   icon="💬"
//                   text="Prompt wording matters as much as interface design. 'What stayed with you?' produced longer, more engaged reflections than neutral or instructional prompts in every test session. Language design is UX design."
//                 />
//                 <Divider className="my-4" />
//                 <LearnItem
//                   icon="📱"
//                   text="Maintaining the dark visual language through the reflection UI was a small decision with outsized impact. Users consistently described the post-prayer flow as feeling 'connected' rather than 'interrupted' — a distinction that came entirely from visual continuity."
//                 />
//               </div>
//             </motion.div>
//           </section>

//         </main> */}
