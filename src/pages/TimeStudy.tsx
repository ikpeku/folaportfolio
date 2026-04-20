import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Assets from "../assets";
import Footer from "../component/Footer";
import { useNavigate } from "react-router";
import Carousel from "../component/Carousel";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

const NAV_ITEMS = [
  { id: "Context", title: "Context & Problem" },
  { id: "Users", title: "Users" },
  { id: "Process", title: "Process" },
  { id: "Design", title: "Design" },
  { id: "Solution", title: "Solution" },
  { id: "BuildHandover", title: "Build & Handover" },
  { id: "Impact", title: "Impact" },
  { id: "Reflections", title: "Reflections" },
];

const ACCENT = "#7C3AED";

// ── Shared primitives ─────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] md:text-[14px] tracking-widest text-[#6A6A6A] font-semibold">{children}</p>
);

const Divider = ({ className = "my-16" }: { className?: string }) => (
  <motion.div className={`border-t border-dashed border-neutral-200 ${className}`} {...fadeUp(0)} />
);



// ── ImageCard ─────────────────────
const ImageCard = ({ caption, url, className = "" }: { caption?: string; url: string, className?: string }) => (
  <motion.div className="w-full" {...fadeUp(0)}>
    <div className={`overflow-hidden ${className}`}>
      <img src={url} alt="" className="w-full h-full object-center" />
    </div>
    <p className="text-[#6A6A6A] text-center text-[14px] md:text-[16px] font-medium max-w-md mx-auto mt-4">{caption}</p>
  </motion.div>
);




const PhoneMock = ({ label, bg = "#F3F4F6" }: { label: string; bg?: string }) => (
  <div className="flex flex-col items-center">
    <div
      className="w-full rounded-[2rem] overflow-hidden shadow-lg"
      style={{ background: bg, aspectRatio: "9/19" }}
    >
      <div className="flex items-center justify-center h-full">
        <span className="text-[12px] font-semibold text-[#B1B1B8] text-center px-4">{label}</span>
      </div>
    </div>
  </div>
);

const StatCard = ({ value, label, accent = ACCENT }: { value: string; label: string; accent?: string }) => (
  <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-8">
    <p className="text-[20px] md:text-[28px] font-bold mb-2" style={{ color: accent }}>{value}</p>
    <p className="text-[14px] md:text-[16px] font-medium leading-snug text-[#6A6A6A]">{label}</p>
  </div>
);

const HMW = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#F9FAFB] border-[#E5E5E5] border p-4 md:p-8 my-8 border-l-2" style={{ borderLeftColor: ACCENT }}>
    <p className="text-[14px] italic tracking-widest text-[#6A6A6A] font-semibold mb-3">How might we...</p>
    <p className="text-[16px] md:text-[18px] italic font-semibold leading-relaxed text-[#3D3D4E]">{children}</p>
  </div>
);

const LearnItem = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex gap-3 items-start">
    <span className="text-[18px]">{icon}</span>
    <p className="text-[14px] leading-relaxed text-[#3D3D4E]">{text}</p>
  </div>
);




const DESIGNSCREENS = [
  {
    url: Assets.Timestudysix, caption: "Search for vendors or view vendors by category",
  },
  {
    url: Assets.Timestudyseven,
    caption: "Wireframe alternatives comparatively tested with a few of TS Inc’s existing clients.",
  },
  {
    url: Assets.Timestudyeight,
    caption: "TS Inc’s existing visual identity which had to be adapted for mobile and our use case.",
  },
];


const SolutionSCREENS1 = [
  {
    title: "Activity Selection", 
    caption: "The activity list shows color and icon coded activities assigned by admins so that over time practitioners build visual memory and can start time tracking even faster.",
    url: Assets.Timestudysolutionone, 
  },
];




const DESIGNSLIDES = [
  { src: Assets.Timestudynine, title: "Alt 1" },
  { src: Assets.Timestudyten, title: "Alt 2" },
  { src: Assets.Timestudyelleven, title: "Alt 3" }
];



const SolutionCard1 = ({title, caption, url}) => (
  <div>

              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">{title}</h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>{caption}</p>
              </div>
                <ImageCard url={url} className="w-full " />
</div>

)



// ═══════════════════════════════════════════════════════════════
const TimeStudy = () => {
  const [active, setActive] = useState<string | null>(null);
  const visibilityRef = useRef<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const pick = () => {
      const found = ids.find((id) => visibilityRef.current[id]) ?? null;
      setActive(found);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { visibilityRef.current[e.target.id] = e.isIntersecting; });
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
          <img src={Assets.Timestudybanner} alt="Time Study banner" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* ── Title + meta ── */}
      <motion.div className="mt-10" {...fadeUp(0.1)}>
        <h1 className="text-[28px] md:text-[36px] font-medium leading-tight italic max-w-4xl">
          Designing a time-tracking tool for a healthcare environment
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:mt-5 mt-6">
          <div>
            <p className="text-[14px] font-semibold text-[#3D3D4E]">Time Study Inc.</p>
            <p className="text-[14px] md:text-[16px] font-semibold text-[#6A6A6A] mt-1">Jan 2020 – Feb 2021</p>
          </div>
          <div>
            <SectionLabel>ROLE</SectionLabel>
            <p className="text-[14px] md:text-[18px] font-medium leading-snug mt-1">Solo Product Designer</p>
          </div>
          <div>
            <SectionLabel>TEAM</SectionLabel>
            <p className="text-[14px] md:text-[18px] font-medium leading-snug mt-1">2 Product Owners, 1 Product Manager & 2 Full Stack Developers</p>
          </div>
        </div>
      </motion.div>

      <Divider />

      {/* ── Two-column layout ── */}
      <div className="flex gap-12 items-start">

        {/* ── Sticky sidebar ── */}
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
                className={`text-left text-[14px] font-semibold py-1 transition-colors duration-200 ${active === item.id ? "text-[#191919]" : "text-[#B1B1B8] hover:text-[#6A6A6A]"
                  }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Mobile dot strip */}
          <div className="lg:hidden fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-label={item.title}
                className={`rounded-full transition-all duration-300 ${active === item.id ? "w-2 h-2 bg-[#191919]" : "w-1.5 h-1.5 bg-[#B1B1B8] hover:bg-[#6A6A6A]"
                  }`}
              />
            ))}
          </div>

        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0 space-y-16">

          {/* ── Context ── */}
          <section id="Context">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Context & Problem</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                A legally required process held together by contracted observers
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>When my team met Time Study Inc (TS Inc) they served 30+ hospitals and healthcare systems. Healthcare organizations are legally required to conduct quarterly time studies documenting how practitioners spend their time so the government can accurately reimburse them and so that administrators can identify operational inefficiencies.</p>
                <p>Before Time Study Now, TS Inc’s clients relied on contracted human observers physically following practitioners for two weeks, recording every activity by hand, then transcribing those notes to activity codes on a TS Inc’s web platform. This created a lot of problems for TS Inc’s clients.</p>
              </div>

              <div className="mt-12">
                <ImageCard url={Assets.Timestudyone} className="w-full " />
              </div>

              <div className="bg-[#F9FAFB] border-[#E5E5E5] p-4 md:p-8 my-8">
                <p className="text-[14px] italic tracking-widest text-[#6A6A6A] font-semibold mb-3">The Core Problem</p>
                <p className="text-[16px] md:text-[18px] italic font-semibold leading-6.75 text-[#3D3D4E]">
                  Healthcare practitioners need a way to seamlessly track their time while working without disruptions to patient care so they can be appropriately reimbursed by the government and provide visibility to admins looking to improve processes.
                </p>
              </div>


            </motion.div>
          </section>


          {/* ── Users ── */}
          <section id="Users">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Users</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                Defining our users and their goals
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>Through expert interviews with Time Study stakeholders, we outlined the user types and their contexts.</p>
              </div>

              <div className="mt-12 space-y-4">
                <ImageCard url={Assets.Timestudytwo} className="w-full " />
                <ImageCard url={Assets.Timestudythree} className="w-full " />
              </div>

            </motion.div>
          </section>

          {/* ── Process ── */}
          <section id="Process">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Process</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                From strategy to a mobile-first solution
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>I worked with the PM and Time Study Inc stakeholders across five phases, from discovery through to delivery.</p>
              </div>

              <div className="mt-12 space-y-4">
                <ImageCard url={Assets.Timestudyfour} className="w-full " />
                <p className="my-6 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                  Evaluating platform options against the realities of practitioner life and TS Inc’s constraints made mobile the clear choice. Practitioners always have their phones, native mobile enables fast interactions, offline capability is critical for basement exam rooms and voice recording is built in natively. Web tracking wouldn't work because practitioners don't sit at computers often. Wearables or location mapping would require hardware procurement across all TS Inc’s clients.
                </p>
                <ImageCard url={Assets.Timestudyfive} className="w-full " />
              </div>

            </motion.div>
          </section>


          {/* ── Design ── */}
          <section id="Design">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Design</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                Wireframes, visual identity and design alternatives
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>The core design challenge was straightforward: time studies needed to be intuitive and fast so that using the app never pulled practitioner's attention away from their core duties. That constraint shaped the wireframes, the visual decisions and how I worked with Time Study Inc's existing brand.</p>
              </div>

              <div className="mt-12 space-y-8">
                {DESIGNSCREENS.map((i) => (
                  <ImageCard key={i.caption} caption={i.caption} url={i.url} />
                ))}

                <Carousel slides={DESIGNSLIDES} gapPx={0} slideWidthPct={100} />

                <p className="text-[#6A6A6A] text-center text-[14px] md:text-[16px] font-medium max-w-md mx-auto ">
                  Visual design alternatives tested for activity recognition, time to start tracking and visual appeal.
                </p>
              </div>

            </motion.div>
          </section>


 {/* ── Solution ── */}
          <section id="Process">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Solution</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                Time Study Now - the core features
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>I progressively iterated on the design based on making time tracking easy, quick and mistake proof. I factored in takeaways from user testing sessions such as: relying on icons and color to build muscle memory for quicker activity selection, making activity session summaries editable to allow mistakes to be corrected and providing admins with detailed summaries for analysis. The final design for the core features are shown below.</p>
              </div>

               <div className="mt-12 space-y-8">
                {SolutionSCREENS1.map((i) => (
                  <SolutionCard1 key={i.title} title={i.title} caption={i.caption} url={i.url} />
                ))}
                </div>




            

            </motion.div>
          </section>




          {/* ── Reflections ── */}
          <section id="Reflections">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Reflections</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                Looking back
              </h2>
              <div className="space-y-5 max-w-2xl">
                <LearnItem icon="👩‍⚕️" text="Context of use drove every decision. Designing for someone who is moving, patient-focused and time pressured meant speed, simplicity and familiarity were absolutely necessary." />
                <Divider className="my-4" />
                <LearnItem icon="🎯" text="The 0% churn rate was a really meaningful metric. Adoption tells you people tried it. Retention tells you it solved something real. In an enterprise context where users have a choice, voluntary continued use is high praise." />
                <Divider className="my-4" />
                <LearnItem icon="🤝" text="Involving Time Study Inc's internal team throughout rather than handing over a finished product made the transition smooth. The handover month was spent mostly on orientation because the decisions and their rationale were already shared." />
                <Divider className="my-4" />
                <LearnItem icon="📊" text="Real-time data changed what administrators could do. The shift from delayed manual transcriptions to live data improved efficiency and allowed admins to make operational decisions that simply weren't possible before based on data from TS Inc’s services." />
              </div>
            </motion.div>
          </section>

        </main>
      </div>
      <Footer isDetail={true} onClick={() => navigate("/behold")} />
    </div>
  );
};

export default TimeStudy;







          // {/* ── Research ── */}
          // <section id="Research">
          //   <motion.div {...fadeUp(0.1)}>
          //     <SectionLabel>Research</SectionLabel>
          //     <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
          //       Understanding the current experience
          //     </h2>
          //     <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
          //       <p>Before designing anything I spent two weeks observing practitioners on shift at a partner clinic and running contextual interviews. I wanted to understand not just what they were doing but when, where and under what pressures they were expected to log time.</p>
          //       <p>What I found was that practitioners weren't resistant to logging — they were just doing it under the worst possible conditions: end of shift, mentally exhausted, often interrupted by the next task before finishing a log.</p>
          //     </div>

          //     <div className="mt-10 bg-[#F9FAFB] rounded-xl p-6 md:p-8">
          //       <p className="text-[13px] font-semibold mb-6 text-[#191919]">What makes it hard to complete time logs?</p>
          //       <div className="space-y-4">
          //         {[
          //           { label: "Logging happens too long after the activity", pct: 81 },
          //           { label: "Hard to remember exact durations mid-shift", pct: 74 },
          //           { label: "Paper forms are slow and easy to lose", pct: 68 },
          //           { label: "Activity categories are confusing", pct: 52 },
          //           { label: "No feedback that the log was received", pct: 39 },
          //         ].map(({ label, pct }) => (
          //           <div key={label} className="flex items-center gap-3">
          //             <span className="text-[12px] text-[#3D3D4E] w-56 shrink-0">{label}</span>
          //             <div className="flex-1 bg-neutral-200 rounded-full h-2.5">
          //               <div className="h-2.5 rounded-full" style={{ width: `${pct}%`, background: ACCENT }} />
          //             </div>
          //             <span className="text-[12px] font-semibold w-8 text-right">{pct}%</span>
          //           </div>
          //         ))}
          //       </div>
          //     </div>

          //     <div className="mt-12">
          //       <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 mb-6">
          //         Three practitioner archetypes
          //       </h2>
          //       <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
          //         <p>Across my interviews, three distinct patterns emerged in how practitioners related to time-logging: those who tried to log in real time but gave up due to friction, those who batched logs at the end of the day and accepted the inaccuracy, and those who had stopped logging consistently altogether.</p>
          //         <p>Each archetype had different unmet needs, but all three shared the same root frustration: the logging process demanded more attention than practitioners could spare in the moment.</p>
          //       </div>
          //       <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          //         {[
          //           { type: "The Real-Timer", desc: "Tries to log as activities happen. High motivation, high friction. Gives up when the app or form is too slow.", color: "#EDE9FE" },
          //           { type: "The Batcher", desc: "Logs everything at end of shift. Accepts reduced accuracy. Would log in real time if it required less effort.", color: "#F3F4F6" },
          //           { type: "The Dropout", desc: "Has stopped logging consistently. Frustrated by the gap between effort required and perceived benefit.", color: "#FEF3C7" },
          //         ].map(({ type, desc, color }) => (
          //           <div key={type} className="rounded-xl p-5" style={{ background: color }}>
          //             <p className="text-[15px] font-semibold text-[#191919] mb-2">{type}</p>
          //             <p className="text-[13px] text-[#3D3D4E] leading-relaxed">{desc}</p>
          //           </div>
          //         ))}
          //       </div>
          //     </div>
          //   </motion.div>
          // </section>

          // <Divider />

          // {/* ── Problems ── */}
          // <section id="Problems">
          //   <motion.div {...fadeUp(0.1)}>
          //     <SectionLabel>The Problem</SectionLabel>
          //     <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-4">
          //       Defining the problem
          //     </h2>
          //     <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
          //       <p>The research made the core tension clear. The goal isn't just to build a logging tool — it's to design something that fits inside the natural rhythm of a clinical shift, not something that competes with it for attention.</p>
          //     </div>

          //     <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-8 my-8">
          //       <p className="text-[14px] italic tracking-widest text-[#6A6A6A] font-semibold mb-3">Problem Statement</p>
          //       <p className="text-[16px] md:text-[18px] italic font-semibold leading-6.75 text-[#3D3D4E]">
          //         Healthcare practitioners have no reliable, low-friction way to log their activities in real time, leading to incomplete records, inaccurate reimbursement and a growing frustration with the logging process itself.
          //       </p>
          //     </div>

          //     <p className="my-6 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
          //       From this we created two "How Might We" statements to focus exploration:
          //     </p>

          //     <HMW>
          //       Reduce the cognitive cost of logging an activity so that practitioners can capture it in the moment without breaking their workflow?
          //     </HMW>

          //     <HMW>
          //       Give practitioners enough visibility into their logged time that they feel confident their records are accurate before submission?
          //     </HMW>
          //   </motion.div>
          // </section>

          // <Divider />

          // {/* ── Explorations ── */}
          // <section id="Explorations">
          //   <motion.div {...fadeUp(0.1)}>
          //     <SectionLabel>Explorations</SectionLabel>
          //     <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-4">
          //       Four directions, one constraint
          //     </h2>
          //     <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
          //       <p>I sketched four directions with the PM and evaluated each against our two HMW statements, how minimal the interaction overhead was and what the engineering team could realistically ship in the first release.</p>
          //     </div>

          //     <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          //       {[
          //         { title: "One-tap activity tags", body: "A persistent tray of the practitioner's most-used activity tags. One tap starts a timer, one tap stops it. No form, no typing. Maximum speed for the most common activities.", chosen: true },
          //         { title: "Voice-first logging", body: "Practitioners describe their activity by voice and the app categorises and logs it. Minimal interruption — but dependent on ambient noise conditions in clinical environments." },
          //         { title: "Smart shift summary", body: "An end-of-shift prompt that pre-fills a log estimate based on the day's calendar and prompts the practitioner to confirm or correct. Lower friction than blank forms, still relies on recall." },
          //         { title: "Wearable integration", body: "Log activities from a smartwatch without taking out a phone. Very low friction in theory, but hardware dependency and limited adoption ruled it out for the MVP." },
          //       ].map(({ title, body, chosen }) => (
          //         <div key={title} className={`rounded-xl border p-5 ${chosen ? "border-[#191919] bg-white" : "border-neutral-200 bg-[#F9FAFB]"}`}>
          //           {chosen && (
          //             <span className="inline-block text-[11px] font-semibold bg-[#191919] text-white rounded-full px-2.5 py-0.5 mb-3">
          //               Chosen direction
          //             </span>
          //           )}
          //           <p className="text-[15px] font-semibold text-[#191919]">{title}</p>
          //           <p className="text-[13px] text-[#3D3D4E] mt-2 leading-relaxed">{body}</p>
          //         </div>
          //       ))}
          //     </div>

          //     <p className="mt-8 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
          //       The one-tap tag approach solved both HMW statements most directly. It brought logging into the moment without requiring any typing or recall, and it gave practitioners an immediate visible record they could trust.
          //     </p>

          //     <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          //       <PhoneMock label="Sketch A — Tag tray" bg="#EDE9FE" />
          //       <PhoneMock label="Sketch B — Quick log" bg="#F3F4F6" />
          //       <PhoneMock label="Sketch C — Summary" bg="#F3F4F6" />
          //       <PhoneMock label="Sketch D — Timeline" bg="#EDE9FE" />
          //     </div>
          //   </motion.div>
          // </section>

          // <Divider />

          // {/* ── Design & Testing ── */}
          // <section id="DesignTesting">
          //   <motion.div {...fadeUp(0.1)}>
          //     <SectionLabel>Design & Testing</SectionLabel>
          //     <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
          //       Two prototypes, tested in context
          //     </h2>
          //     <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
          //       <p>I built two mid-fidelity prototypes exploring different interaction models for the tag tray: one where tapping a tag immediately starts a timed session (tap-to-start), and one where tapping opens a micro-form to confirm duration before logging (confirm-then-log).</p>
          //       <p>I ran five moderated usability sessions with practitioners during a light-traffic part of their shift, asking them to log a patient consultation, an admin task and a handover — tasks they performed every day.</p>
          //     </div>

          //     <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          //       <PhoneMock label="Onboarding" bg="#EDE9FE" />
          //       <PhoneMock label="Tag Tray" bg="#EDE9FE" />
          //       <PhoneMock label="Active Timer" bg="#F3F4F6" />
          //       <PhoneMock label="Log Confirmation" bg="#F3F4F6" />
          //     </div>

          //     <div className="mt-10 bg-[#F9FAFB] rounded-xl p-6 md:p-8">
          //       <p className="text-[13px] font-semibold mb-4 text-[#191919]">Key findings from usability sessions</p>
          //       <div className="space-y-3">
          //         {[
          //           "Tap-to-start was faster, but practitioners worried they'd forget to stop the timer — 4 out of 5 mentioned this unprompted.",
          //           "Confirm-then-log felt slightly slower but gave practitioners a sense of control that matched how they already thought about their time.",
          //           "Tag labels needed to match clinical terminology exactly — generic labels like 'Admin' were ambiguous and caused hesitation.",
          //           "A shift timeline view was requested by all five participants — they wanted to see their day at a glance before submitting.",
          //         ].map((finding, i) => (
          //           <div key={i} className="flex gap-3 items-start">
          //             <span className="text-[12px] font-bold mt-0.5 shrink-0" style={{ color: ACCENT }}>{i + 1}.</span>
          //             <p className="text-[14px] text-[#3D3D4E] leading-relaxed">{finding}</p>
          //           </div>
          //         ))}
          //       </div>
          //     </div>

          //     <div className="mt-10">
          //       <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 mb-6">
          //         Final design
          //       </h2>
          //       <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E] mb-8">
          //         <p>The final design combined the speed of tap-to-start with a subtle auto-stop prompt after inactivity to address the "forgot to stop" anxiety. I added a shift timeline as the home screen so the day's log was always visible at a glance. Tag labels were updated in collaboration with the clinical administrator at the partner clinic.</p>
          //       </div>
          //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          //         <PhoneMock label="Home — Timeline" bg="#EDE9FE" />
          //         <PhoneMock label="Active Session" bg="#EDE9FE" />
          //         <PhoneMock label="Day Summary" bg="#F3F4F6" />
          //         <PhoneMock label="Submit & Review" bg="#F3F4F6" />
          //       </div>
          //       <p className="mt-4 text-center text-[14px] text-[#6A6A6A] font-semibold">Final high-fidelity screens</p>
          //     </div>

          //     <div className="mt-10">
          //       <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 mb-6">
          //         Edge cases and states
          //       </h2>
          //       <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E] mb-8">
          //         <p>Handoff included full specifications for all states: no activity logged, active session, session paused, session auto-stopped, shift submitted, shift reopened and error states. As development progressed I reviewed builds to flag anything that deviated from the intended experience.</p>
          //       </div>
          //       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          //         <PhoneMock label="Empty state" bg="#F9FAFB" />
          //         <PhoneMock label="Paused session" bg="#FEF3C7" />
          //         <PhoneMock label="Submission error" bg="#FEE2E2" />
          //       </div>
          //     </div>
          //   </motion.div>
          // </section>

          // <Divider />

          // {/* ── Impact ── */}
          // <section id="Impact">
          //   <motion.div {...fadeUp(0.1)}>
          //     <SectionLabel>Impact</SectionLabel>
          //     <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
          //       Validating the solution
          //     </h2>
          //     <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E] mb-8">
          //       <p>We launched with the partner clinic in Q3 2020 and measured impact over a 10-week period, comparing log completeness and reimbursement accuracy against the three months prior on the paper system.</p>
          //     </div>

          //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          //       <StatCard value="+62%" label="Increase in shift log completion rate within the first month" />
          //       <StatCard value="3.1×" label="More activities logged per shift compared to the paper baseline" />
          //       <StatCard value="-48%" label="Drop in reimbursement discrepancies flagged by administrators" />
          //       <StatCard value="4.4/5" label="Practitioner satisfaction score across ease-of-use questions" />
          //     </div>

          //     <p className="mt-8 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
          //       The shift timeline home screen became the most used feature — practitioners checked it far more frequently than we expected, using it not just for submission but as a running reminder of what they'd done that day. That insight directly shaped the roadmap for the next release.
          //     </p>
          //   </motion.div>
          // </section>

          // <Divider />