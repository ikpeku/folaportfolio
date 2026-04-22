import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Assets from "../assets";
import Footer from "../component/Footer";
import { useNavigate } from "react-router";
// import Carousel from "../component/Carousel";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

const NAV_ITEMS = [
  { id: "Context", title: "Context" },
  { id: "Discovery", title: "Discovery" },
  { id: "Research", title: "Research" },
  { id: "FramingTheProblem", title: "Framing the Problem" },
  { id: "Explorations", title: "Explorations" },
  { id: "DesignTesting", title: "Design & Testing" },
  { id: "Impact", title: "Impact" },
  { id: "Reflections", title: "Reflections" },
];


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
    {caption && <p className="text-[#6A6A6A] text-center text-[14px] md:text-[16px] font-medium max-w-md mx-auto mt-4">{caption}</p>}
  </motion.div>
);



const LearnItem = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex gap-3 items-start">
    <span className="text-[18px]">{icon}</span>
    <p className="text-[14px] leading-relaxed text-[#3D3D4E]">{text}</p>
  </div>
);


// ,
// ,
// ,
// ,
// Beholddesignfive,
// Beholddesignsix,
// Beholddesignseven,
// Beholddesigneight,
// Beholddesignnine

const DESIGNSCREENS = [
  {
    url: Assets.Beholddesignone, 
    caption: "Option 1",
    description: "Combining both actions in one screen starting off with a call to reflect after which users are asked to share. "
  },
  {
    url: Assets.Beholddesigntwo,
    caption: "Option 1",
    description: "Combining both actions in one screen starting off with a call to share after which users are asked to reflect."
  },
  {
    url: Assets.Beholddesignthree,
  },
  {
    url: Assets.Beholddesignfour,
    
  },
];


// const SolutionSCREENS = [
//   {
//     title: "1. Activity Selection",
//     caption: "The activity list shows color and icon coded activities assigned by admins so that over time practitioners build visual memory and can start time tracking even faster.",
//     urls: [Assets.Timestudysolutionone, Assets.Timestudysolutiontwo],
//   },
//   {
//     title: "2. Time Tracking",
//     caption: "One tap to start and stop tracking with no confirmation dialogs. A persistent lock screen notification keeps the timer accessible when the phone is pocketed mid-task.",
//     urls: [Assets.Timestudysolutionthree, Assets.Timestudysolutionfour],
//   },
//   {
//     title: "3. Activity Session Summaries",
//     caption: "Every completed session shows activity name, category and duration. Sessions auto-sync to Time Study Inc's web platform in real time so that admins can see data as it's recorded rather than waiting two weeks. Practitioners can edit sessions directly if they make mistakes.",
//     urls: [Assets.Timestudysolutionfive, Assets.Timestudysolutionsix],
//   },
//   {
//     title: "4. Detailed Summaries & Sharing",
//     caption: "Practitioners can share detailed breakdowns of how they spent their time across specific time periods with admins.",
//     urls: [Assets.Timestudysolutionseven, Assets.Timestudysolutioneight],
//   },
// ];

// const BuildHandover = [
//   {
//     title: "1. Organzation Switcher",
//     caption: "Practitioners working at multiple organizations using TS Inc’s services needed to be able to switch organizations upfront rather than in settings.",
//     urls: [Assets.Timestudybuildhandoverone, Assets.Timestudybuildhandovertwo],
//   },
//   {
//     title: "2. Manual Activity Logging",
//     caption: "For practitioners who forget to track their time or who would rather focus on their core duties at work the app needed an escape hatch. Manual logging lets them select an activity, set start and end times then save. Manually logged activities sync and appear to admins identically to real-time sessions, removing any stigma from forgetting. Validations on the backend prevent overlapping entries.",
//     urls: [Assets.Timestudybuildhandoverthree, Assets.Timestudybuildhandoverfour],
//   },
//   {
//     title: "3. Sync Status",
//     caption: "A visual indicator for sync status was added to activity session summaries to give practitioners confidence their data is reaching admins. The app had a built in mechanism to continuously retry failed sync until they’re successful but showing status upfront helped to eliminate uncertainty.",
//     urls: [Assets.Timestudybuildhandoverfive, Assets.Timestudybuildhandoversix],
//   },
// ];



const ContextPhotos = [
  {
    title: "Daily Meditations",
    caption: "", urls: [Assets.Beholdcontextone, Assets.Beholdcontexttwo],
  },
  {
    title: "Topical Collections",
    caption: "", urls: [Assets.Beholdcontextthree, Assets.Beholdcontextfour],
  },
  {
    title: "Saved Meditations & Reflections",
    caption: "", urls: [Assets.Beholdcontextfive, Assets.Beholdcontextsix],
  },
  {
    title: "Daily Reminders & Streaks", caption: "",
    urls: [Assets.Beholdcontextseven,],
  },
];




const BeholdexplorationsImages = [
  { src: Assets.Beholdexplorationsone, title: "Alt 1" },
  { src: Assets.Beholdexplorationstwo, title: "Alt 2" },
  { src: Assets.Beholdexplorationsthree, title: "Alt 3" },

  { src: Assets.Beholdexplorationsfour, title: "Alt 4" },
  { src: Assets.Beholdexplorationsfive, title: "Alt 5" },
  { src: Assets.Beholdexplorationssix, title: "Alt 5" },
];



const ResearchIMAGES = [
  { src: Assets.Beholdrresearchone, title: "Alt 1" },
  { src: Assets.Beholdrresearchtwo, title: "Alt 2" },
  { src: Assets.Beholdrresearchthree, title: "Alt 3" }
];








const GridImagesCard = ({ title, caption, urls }: { title: string; caption: string; urls: string[] }) => (
  <div>
    <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">{title}</h2>
    <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
      <p>{caption}</p>
    </div>
    <div className={`mt-6 grid gap-4 grid-cols-1 md:grid-cols-2`}>
      {urls.map((url, i) => (
        <ImageCard
          key={i}
          url={url}
          className={`w-full  md:col-span-2`}
        />
      ))}
    </div>
    {/* <div className={`mt-6 grid gap-4 ${urls.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
      {urls.map((url, i) => (
        <ImageCard
          key={i}
          url={url}
          className={`w-full${urls.length % 2 !== 0 && i === urls.length - 1 ? " md:col-span-2" : ""}`}
        />
      ))}
    </div> */}
  </div>
)



// ═══════════════════════════════════════════════════════════════
const Behold = () => {
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
      { threshold: 0, rootMargin: "0px 0px -55% 0px" }
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
          <img src={Assets.Beholdbanner} alt="Time Study banner" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* ── Title + meta ── */}
      <motion.div className="mt-10" {...fadeUp(0.1)}>
        <h1 className="text-[28px] md:text-[36px] font-medium leading-tight italic max-w-4xl">
          Redesigning Reflections & Sharing around user context.
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:mt-5 mt-6">
          <div>
            <p className="text-[14px] font-semibold text-[#3D3D4E]">Behold</p>
            <p className="text-[14px] md:text-[16px] font-semibold text-[#6A6A6A] mt-1">Dec 2019 - Jan 2021</p>
          </div>
          <div>
            <SectionLabel>ROLE</SectionLabel>
            <p className="text-[14px] md:text-[18px] font-medium leading-snug mt-1">Solo Product Designer</p>
          </div>
          <div>
            <SectionLabel>TEAM</SectionLabel>
            <p className="text-[14px] md:text-[18px] font-medium leading-snug mt-1">2 Product Owners, 1 Product Manager, 2 Full Stack Developers</p>
          </div>
        </div>
      </motion.div>

      <Divider />

      {/* ── Two-column layout ── */}
      <div className="flex gap-12 items-start">

        {/* ── Sticky sidebar ── */}
        <aside className="hidden lg:block shrink-0 sticky top-10 self-start">

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


        </aside>
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

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0 space-y-16">

          {/* ── Context ── */}
          <section id="Context">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Context</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                Outgrowing a Newsletter
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>The Behold team had been running a prayer newsletter delivering daily Christian meditations to a growing audience. What made their approach different was a focus on accessibility. Meditations were 10 minutes or less, audio-based and paired with accompanying scripture for reference. By the time they reached out to our team, they had grown to 200+ subscribers and were already partnering with authors and voice narrators to produce content.</p>
                <p>The newsletter had proven there was an audience so the Behold team decided it was time to go further. They partnered with us to design and build Behold, a mobile app that brought the newsletter experience to iOS and Android. The Behold app launched in March 2020 with:</p>
              </div>


              <div className="mt-12 space-y-8">
                {ContextPhotos.map((i) => (
                  <div key={i.title}>
                    <GridImagesCard title={i.title} caption={i.caption} urls={i.urls} />
                  </div>
                ))}
              </div>

            </motion.div>
          </section>

          {/* ── Discovery ── */}
          <section id="Discovery">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Discovery</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                After launch
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>About 4 months after launching we saw encouraging metrics: 67% of newsletter subscribers converted to app users, 78% of meditations started were completed and 45% of monthly active users visited the app daily. We also saw two metrics that weren’t performing so well.</p>
              </div>


              <div className="mt-4 grid grid-cols-1  gap-8">

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 border-l-2 border-l-[#211A4C]">
                  <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#6A6A6A] lg:mb-6">
                    Reflection Completion Rate
                  </p>
                  <p className="text-[14px] md:text-[24px] tracking-widest text-[#211A4C] font-bold mb-3">22%</p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Users were completing meditations but skipping reflection.
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 border-l-2 border-l-[#211A4C]">
                  <p className="text-[16px] md:text-[18px] font-semibold leading-6 text-[#6A6A6A] lg:mb-6">
                    Share Rate
                  </p>
                  <p className="text-[14px] md:text-[24px] tracking-widest text-[#211A4C] font-bold mb-3">5% </p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6 text-[#6A6A6A]">
                    The meditation screen had a share icon which allowed users to send meditations to their contacts via iMessage, WhatsApp or email.
                  </p>
                </div>

              </div>

              <p className="font-medium text-[#3D3D4E] text-[18px] leading-6.75 mt-4 " >
                The PM and I noted both metrics and agreed we needed to investigate. We continued monitoring them in Firebase while planning a round of user interviews to understand what was driving the underperformance in each.
              </p>


            </motion.div>
          </section>

          {/* ── Research ── */}
          <section id="Research">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Research</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                Understanding the metrics
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>We carried out user interviews with 12 active users focusing on their experience with the reflection feature and sharing. The interviews surfaced four findings across the two features with a common root cause.</p>
              </div>

                <div className="mt-12 space-y-8 max-w-4xl">

                <div>
                  <div className="flex items-end">
                    <p className="text-[14px] font-semibold text-[#6A6A6A] ">Reflections</p>
                    <hr className=" border-dotted flex-1 border-[#6A6A6A]" />
                  </div>
                  <div className="mt-4 grid grid-cols-1  gap-8">


                    <div className="flex">

                      <div className="flex flex-col items-center border border-[#E5E5E5] bg-[#F9FAFB] px-3">
                    <p className="text-[14px] font-semibold text-[#6A6A6A] py-5">1</p>
                    <div className="w-[0.1] border border-[#B1B1B8] flex-1 border-dashed" />
                  </div>

                    <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 space-y-4">
                      <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#191919] ">
                        Audio-only users forgot reflections existed
                      </p>
                      <p className="text-[14px] md:text-[16px] tracking-widest text-[#3D3D4E] font-medium ">A significant portion of users listened while multitasking (i.e commuting, cooking, getting ready, etc). By the time the audio ended, they had moved on. The reflection prompt lived on a separate page they never reached.</p>
                      <p className="border-l-[#211A4C] border-l-2 pl-4 italic text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                       "To be honest I didn't even realise there was a place to add reflections, I assumed the meditation ended."
                      </p>
                    </div>
                    </div>

                    <div className="flex">

                      <div className="flex flex-col items-center border border-[#E5E5E5] bg-[#F9FAFB] px-3">
                    <p className="text-[14px] font-semibold text-[#6A6A6A] py-5">2</p>
                    <div className="w-[0.1] border border-[#B1B1B8] flex-1 border-dashed" />
                  </div>

                    <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 space-y-4">
                      <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#191919] ">
                        Typing felt like too much effort
                      </p>
                      <p className="text-[14px] md:text-[16px] tracking-widest text-[#3D3D4E] font-medium ">The core appeal of Behold was fitting prayer into a busy schedule. Typing a reflection felt like an extra task rather than a natural part of the experience.</p>
                      <p className="border-l-[#211A4C] border-l-2 pl-4 italic text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                       "I’d like to use it but most times I don't feel like typing.”
                      </p>
                    </div>
                    </div>

                  </div>

                </div>


                <div>
                  <div className="flex items-end">
                    <p className="text-[14px] font-semibold text-[#6A6A6A] ">Sharing</p>
                    <hr className=" border-dotted flex-1 border-[#6A6A6A]" />
                  </div>
                  <div className="mt-4 grid grid-cols-1  gap-8">


                    <div className="flex">

                      <div className="flex flex-col items-center border border-[#E5E5E5] bg-[#F9FAFB] px-3">
                    <p className="text-[14px] font-semibold text-[#6A6A6A] py-5">1</p>
                    <div className="w-[0.1] border border-[#B1B1B8] flex-1 border-dashed" />
                  </div>

                    <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 space-y-4">
                      <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#191919] ">
                        Audio-only users missed the share icon entirely
                      </p>
                      <p className="text-[14px] md:text-[16px] tracking-widest text-[#3D3D4E] font-medium ">The share icon sat on the meditation screen alongside a save icon. Audio-only users weren’t actively looking at the screen during meditations.</p>
                    
                    </div>
                    </div>

                    <div className="flex">

                      <div className="flex flex-col items-center border border-[#E5E5E5] bg-[#F9FAFB] px-3">
                    <p className="text-[14px] font-semibold text-[#6A6A6A] py-5">2</p>
                    <div className="w-[0.1] border border-[#B1B1B8] flex-1 border-dashed" />
                  </div>

                    <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 space-y-4">
                      <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#191919] ">
                        Users who saw it didn't feel compelled to use it
                      </p>
                      <p className="text-[14px] md:text-[16px] tracking-widest text-[#3D3D4E] font-medium ">For users who did read along with the scripture, the share icon was just a button on a page. There was no surrounding prompt, no moment, nothing that made sharing feel relevant or timely. Without a reason to act, most didn't.</p>
                      <p className="border-l-[#211A4C] border-l-2 pl-4 italic text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                       "I notice it but I just don’t use it.”
                      </p>
                    </div>
                    </div>

                  </div>

                </div>


                <div>
                   <p className="font-medium text-[#3D3D4E] text-[14px] md:text-[18px] leading-6.75" >The interviews revealed a common thread across both features: users were missing them entirely. The reflection feature and the sharing both lived in parts of the experience that a large portion of users, especially those listening on the go, never reached. Addressing visibility was the shared starting point for solutions.</p>
                    <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {
                    ResearchIMAGES.map(v => <ImageCard key={v.title} url={v.src} className="w-full border-3 border-[#FFC60B] rounded-lg " />)
                  }
                </div>
                   
                   <p className="max-w-lg mx-auto text-center font-medium text-[#3D3D4E] text-[14px] md:text-[16px] leading-6.75" >The three meditation screens showing the audio player (along with options to save and share), the scripture for the day and a space to reflect.</p>

                </div>

               
              </div>

            </motion.div>
          </section>

    {/* ── FramingTheProblem ── */}
          <section id="FramingTheProblem">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Framing the Problem</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                How might we...
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>Based on our findings the PM and I created “How Might We” statements to frame the problems as opportunities and guide explorations.</p>
              </div>


              <div className="mt-4 grid grid-cols-1  gap-8">

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 border-l-2 border-l-[#211A4C]">
                  <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#6A6A6A] ">
                   How might we...
                  </p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Surface the reflection feature to users who are listening rather than looking at their screens?
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 border-l-2 border-l-[#211A4C]">
                  <p className="text-[16px] md:text-[18px] font-semibold leading-6 text-[#6A6A6A]">
                    How might we...
                  </p>
                 <p className="text-[14px] md:text-[16px] font-medium leading-6 text-[#6A6A6A]">
                   Make adding a reflection feel less like extra work?
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 border-l-2 border-l-[#211A4C]">
                  <p className="text-[16px] md:text-[18px] font-semibold leading-6 text-[#6A6A6A]">
                    How might we...
                  </p>
                 <p className="text-[14px] md:text-[16px] font-medium leading-6 text-[#6A6A6A]">
                  Surface the sharing option to users who are listening rather than reading?
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 border-l-2 border-l-[#211A4C]">
                  <p className="text-[16px] md:text-[18px] font-semibold leading-6 text-[#6A6A6A]">
                    How might we...
                  </p>
                 <p className="text-[14px] md:text-[16px] font-medium leading-6 text-[#6A6A6A]">
                 Compel users to share?
                  </p>
                </div>



              </div>

            

            </motion.div>
          </section>




    {/* ── Explorations ── */}
          <section id="Explorations">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Explorations</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                Exploring directions, then narrowing down
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>The PM and I explored a range of directions then evaluated each against a shared set of criteria to identify which were worth taking forward.</p>
              </div>


              <div className="mt-4 grid grid-cols-1 rounded-lg overflow-hidden">

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 flex items-center gap-4">
                  <img src={Assets.Diamondicon} className="w-4 h-4" />
                  <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#6A6A6A] ">
                   Does it address the visibility problem for audio-only users specifically?
                  </p>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 flex items-center gap-4">
                  <img src={Assets.Diamondicon} className="w-4 h-4" />
                  <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#6A6A6A] ">
                   Does it resolve the issue without adding new friction elsewhere in the experience?
                  </p>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 flex items-center gap-4">
                  <img src={Assets.Diamondicon} className="w-4 h-4" />
                  <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#6A6A6A] ">
                  Does it feel native to the meditation flow rather than interrupting it?
                  </p>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 flex items-center gap-4">
                  <img src={Assets.Diamondicon} className="w-4 h-4" />
                  <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#6A6A6A] ">
                   Does it address both features or require separate solutions for each?
                  </p>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 flex items-center gap-4">
                  <img src={Assets.Diamondicon} className="w-4 h-4" />
                  <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#6A6A6A] ">
                   Is it technically feasible within the current app architecture?
                  </p>
                </div>

                



              </div>


               <div className="mt-12 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {
                    BeholdexplorationsImages.map(v => <ImageCard key={v.title} url={v.src} className="w-full" />)
                  }
                </div>


              <p className="font-medium text-[#3D3D4E] text-[18px] leading-6.75 mt-4 " >
               The push notification addressed visibility but re-introduced friction by pulling users back into the app. Improving the share icon may have increased motivation to share for those who saw it but wouldn’t address visibility. The three chosen directions worked together. The timed pop-up and end-of-meditation callout solved visibility for audio-only users while the chips solved the effort barrier for reflection. Combining them into a single redesigned screen addressed all four of our HMW statements at once.
              </p>

            </motion.div>
          </section>



       
         
          {/* ── DesignTesting ── */}
          <section id="DesignTesting">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Design & Testing</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                Testing alternatives
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>With a clear direction, I designed three alternatives of the chosen solutions. I explored the order (i.e should users be asked to reflect first then share or vice versa) and how the call to reflect and share could be presented then tested them with 8 users.</p>
              </div>




  <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-24">
                  {
                    DESIGNSCREENS.map(v => (
                      <div>
                    <ImageCard key={v.url} url={v.url} className="w-full border-3 border-[#FFC60B] rounded-lg " />
                  
                  
                  </div>
                  ))
                  }
                </div>



              {/* <div className="mt-12 space-y-8">
                {DESIGNSCREENS.map((i) => (
                  <ImageCard key={i.caption} caption={i.caption} url={i.url} />
                ))}


                <p className="text-[#6A6A6A] text-center text-[14px] md:text-[16px] font-medium max-w-md mx-auto ">
                  Visual design alternatives tested for activity recognition, time to start tracking and visual appeal.
                </p>
              </div> */}


            
              <div className="my-12 grid grid-cols-1 ">
              <ImageCard url={Assets.Beholddesignnine} className="w-full" />
              </div>

            </motion.div>
          </section>


          {/* ── Solution ── */}
          {/* <section id="Solution">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Solution</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                Time Study Now - the core features
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>I progressively iterated on the design based on making time tracking easy, quick and mistake proof. I factored in takeaways from user testing sessions such as: relying on icons and color to build muscle memory for quicker activity selection, making activity session summaries editable to allow mistakes to be corrected and providing admins with detailed summaries for analysis. The final design for the core features are shown below.</p>
              </div>

              <div className="mt-12 space-y-8">
                {SolutionSCREENS.map((i) => (
                  <GridImagesCard key={i.title} title={i.title} caption={i.caption} urls={i.urls} />
                ))}
              </div>

            </motion.div>
          </section> */}


          {/* ── BuildHandover ── */}
          {/* <section id="BuildHandover">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Build & Handover</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                Testing the build and closing the loop
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>Once the beta was built, we tested it with both practitioners and administrators. Their feedback led to a round of improvements, both refinements to existing features and additions that weren't surfaced until the product was in real hands.</p>
              </div>

              <div className="mt-12 space-y-8">
                {BuildHandover.map((i) => (
                  <GridImagesCard key={i.title} title={i.title} caption={i.caption} urls={i.urls} />
                ))}

                <p className="my-6 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                  After incorporating build testing feedback we handed the project over to Time Study Inc's internal team. The handover covered everything they needed to continue developing and evaluating the product independently.
                </p>

                <ImageCard url={Assets.Timestudybuildhandoverseven} className="w-full " />
                <p className="my-6 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                  The handover process itself involved knowledge transfer sessions with Time Study Inc's developers as well as design and documentation walkthroughs. Because their internal team had been involved throughout the project rather than receiving a finished product at the end, the transition was orientation rather than education.
                </p>


              </div>


            </motion.div>
          </section> */}


          {/* ── Impact ── */}
          <section id="Impact">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Impact</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                Results
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>3 months after the shipping the redesign, we confirmed movement on both metrics in Firebase.</p>
              </div>

              <div className="mt-12 space-y-8">

                <div>
                  <div className="flex items-end">
                    <p className="text-[14px] font-semibold text-[#6A6A6A] ">Reflection Completion Rate</p>
                    <hr className=" border-dotted flex-1 border-[#6A6A6A]" />
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 ">
                      <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#6A6A6A] lg:mb-6">
                        Participation Increase
                      </p>
                      <p className="text-[14px] md:text-[24px] tracking-widest text-[#6A6A6A] font-bold mb-3">22%</p>
                      <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                        From existing and new clients. This was more than double the 50% adoption target set at the start.
                      </p>
                    </div>

                    <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 ">
                      <p className="text-[16px] md:text-[18px] font-semibold leading-6 text-[#6A6A6A] lg:mb-6">
                        Mobile Driven Growth
                      </p>
                      <p className="text-[14px] md:text-[24px] tracking-widest text-[#211A4C] font-bold mb-3">29% <span className="text-[#007F61] text-[18px] font-[Nunito Sans] ">↑30%</span></p>
                      <p className="text-[14px] md:text-[16px] font-medium leading-6 text-[#6A6A6A]">
                        Most of the new participation came from mobile app users, not contracted observers.
                      </p>
                    </div>

                  </div>




                </div>


                <div>
                  <div className="flex items-end">
                    <p className="text-[14px] font-semibold text-[#6A6A6A] ">Share Rate</p>
                    <hr className=" border-dotted flex-1 border-[#6A6A6A]" />
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 ">
                      <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#6A6A6A] lg:mb-6">
                        Before Redesign
                      </p>
                      <p className="text-[14px] md:text-[24px] tracking-widest text-[#6A6A6A] font-bold mb-3">5%</p>
                      <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                        Sharing was only accessible on the meditation page plus there was no motivation to use it.
                      </p>
                    </div>

                    <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 ">
                      <p className="text-[16px] md:text-[18px] font-semibold leading-6 text-[#6A6A6A] lg:mb-6">
                        After Redesign
                      </p>
                      <p className="text-[14px] md:text-[24px] tracking-widest text-[#211A4C] font-bold mb-3">16% <span className="text-[#007F61] text-[18px] font-[Nunito Sans] ">↑3%</span></p>
                      <p className="text-[14px] md:text-[16px] font-medium leading-6 text-[#6A6A6A]">
                        Dedicated call to share gave context and encouraged user to act.
                      </p>
                    </div>

                  </div>




                </div>

                <p className="font-medium text-[#3D3D4E] text-[14px] leading-6.75" >The share improvement was especially important. Shared meditations went directly to people the sender already had a relationship with via message or email. Recipients received a web preview link they could open and listen to without downloading the app, lowering the barrier to a first experience of Behold significantly.</p>
                <p className="font-medium text-[#3D3D4E] text-[14px] leading-6.75" >Before the redesign, the share rate was too low to generate meaningful data on installs from shared content. After the redesign we were able to track installs from shared content for the first time.</p>

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
                <LearnItem icon="🎧" text="Designing for multitasking users meant rethinking where features live, not just how they look. Both features performed poorly because they assumed users were actively looking at the screen. Understanding the real context of use (i.e commuting, cooking, getting ready, etc) revealed that visibility was the primary problem, not just design quality." />
                <Divider className="my-4" />
                <LearnItem icon="🎯" text="Closing the gap between intent and action helped to reduce friction. Many users wanted to reflect they just didn't want to type. Chips made reflections doable at the moment of engagement for users in the middle of their day." />
                <Divider className="my-4" />
                <LearnItem icon="🔗" text="The share feature was an acquisition channel not just a button. Designing what the recipient received (i.e a web preview they could listen to without downloading the app) was as important as the call to share itself." />

              </div>
            </motion.div>
          </section>

        </main>
      </div>
      <Footer isDetail={true} onClick={() => navigate("/rukah")}
        description="Building a wedding vendor discovery and review platform from the ground up."
      />
    </div>
  );
};

export default Behold;





//  <div className="mt-12 space-y-8">

//                 {/* first */}
//                 <div className="mt-4 grid grid-cols-1">

//                   <div className="bg-[#6D42FF08] border border-[#6D42FF] p-4 md:p-6 ">
//                     <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#6A6A6A] lg:mb-6">
//                       Churn Rate
//                     </p>
//                     <p className="text-[14px] md:text-[24px] tracking-widest text-[#6D42FF] font-bold mb-3">0%</p>
//                     <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
//                       Practitioners who started using the app continued using it rather than falling back to contracted observers.
//                     </p>
//                   </div>

//                 </div>
//                 {/* second */}
//                 <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">

//                   <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 ">
//                     <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#6A6A6A] lg:mb-6">
//                       Participation Increase
//                     </p>
//                     <p className="text-[14px] md:text-[24px] tracking-widest text-[#6D42FF] font-bold mb-3">128%</p>
//                     <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
//                       From existing and new clients. This was more than double the 50% adoption target set at the start.
//                     </p>
//                   </div>

//                   <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 ">
//                     <p className="text-[16px] md:text-[18px] font-semibold leading-6 text-[#6A6A6A] lg:mb-6">
//                       Mobile Driven Growth
//                     </p>
//                     <p className="text-[14px] md:text-[24px] tracking-widest text-[#6D42FF] font-bold mb-3">95%</p>
//                     <p className="text-[14px] md:text-[16px] font-medium leading-6 text-[#6A6A6A]">
//                       Most of the new participation came from mobile app users, not contracted observers.
//                     </p>
//                   </div>

//                 </div>

//                 {/* third */}
//                 <div className="mt-4 grid grid-cols-1">

//                   <div className="bg-[#6D42FF08] border border-[#6D42FF] p-4 md:p-6 ">
//                     <p className="text-[14px] md:text-[24px] tracking-widest text-[#6D42FF] font-bold mb-3">Real World Outcome</p>
//                     <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
//                       One healthcare organization identified that paediatric surgeons were consistently working overtime using Time Study Now data. They hired two additional surgeons to improve their surgeons wellbeing. This is the kind of operational decision that wasn't possible when data arrived on a clipboard.
//                     </p>
//                   </div>

//                 </div>

//                 {/* fourth */}
//                 <div className="mt-4 flex gap-4 md:gap-8 flex-col md:flex-row ">

//                   <div className="bg-[#6D42FF08] border border-[#6D42FF] p-4 md:p-6 self-start ">
//                     <p className="text-[14px] md:text-[24px] tracking-widest text-[#6D42FF] font-bold">10M+ hours tracked</p>
//                   </div>

//                   <div className="bg-[#6D42FF08] border border-[#6D42FF] p-4 md:p-6 self-start">
//                     <p className="text-[14px] md:text-[24px] tracking-widest text-[#6D42FF] font-bold ">$1M+ ARR for Time Study Inc</p>
//                   </div>

//                 </div>

//                 {/* fifth */}
//                 <div className="mt-4 flex gap-4 md:gap-8 flex-col md:flex-row ">
//                   <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 self-start  ">
//                     <p className="text-[14px] font-medium leading-6.75 text-[#6A6A6A]  ">
//                       Mobile became a core differentiator for their sales
//                     </p>
//                   </div>

//                 </div>


//               </div>