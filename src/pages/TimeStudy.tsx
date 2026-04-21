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


const SolutionSCREENS = [
  {
    title: "1. Activity Selection",
    caption: "The activity list shows color and icon coded activities assigned by admins so that over time practitioners build visual memory and can start time tracking even faster.",
    urls: [Assets.Timestudysolutionone, Assets.Timestudysolutiontwo],
  },
  {
    title: "2. Time Tracking",
    caption: "One tap to start and stop tracking with no confirmation dialogs. A persistent lock screen notification keeps the timer accessible when the phone is pocketed mid-task.",
    urls: [Assets.Timestudysolutionthree, Assets.Timestudysolutionfour],
  },
  {
    title: "3. Activity Session Summaries",
    caption: "Every completed session shows activity name, category and duration. Sessions auto-sync to Time Study Inc's web platform in real time so that admins can see data as it's recorded rather than waiting two weeks. Practitioners can edit sessions directly if they make mistakes.",
    urls: [Assets.Timestudysolutionfive, Assets.Timestudysolutionsix],
  },
  {
    title: "4. Detailed Summaries & Sharing",
    caption: "Practitioners can share detailed breakdowns of how they spent their time across specific time periods with admins.",
    urls: [Assets.Timestudysolutionseven, Assets.Timestudysolutioneight],
  },
];

const BuildHandover = [
  {
    title: "1. Organzation Switcher",
    caption: "Practitioners working at multiple organizations using TS Inc’s services needed to be able to switch organizations upfront rather than in settings.",
    urls: [Assets.Timestudybuildhandoverone, Assets.Timestudybuildhandovertwo],
  },
  {
    title: "2. Manual Activity Logging",
    caption: "For practitioners who forget to track their time or who would rather focus on their core duties at work the app needed an escape hatch. Manual logging lets them select an activity, set start and end times then save. Manually logged activities sync and appear to admins identically to real-time sessions, removing any stigma from forgetting. Validations on the backend prevent overlapping entries.",
    urls: [Assets.Timestudybuildhandoverthree, Assets.Timestudybuildhandoverfour],
  },
  {
    title: "3. Sync Status",
    caption: "A visual indicator for sync status was added to activity session summaries to give practitioners confidence their data is reaching admins. The app had a built in mechanism to continuously retry failed sync until they’re successful but showing status upfront helped to eliminate uncertainty.",
    urls: [Assets.Timestudybuildhandoverfive, Assets.Timestudybuildhandoversix],
  },
];




const DESIGNSLIDES = [
  { src: Assets.Timestudynine, title: "Alt 1" },
  { src: Assets.Timestudyten, title: "Alt 2" },
  { src: Assets.Timestudyelleven, title: "Alt 3" }
];



const OPERATIONIMAGES = [
  { src: Assets.Timestudyoperationone, title: "Alt 1" },
  { src: Assets.Timestudyoperationtwo, title: "Alt 2" },
  { src: Assets.Timestudyoperationthree, title: "Alt 3" },
  { src: Assets.Timestudyoperationfour, title: "Alt 4" }
];



const GridImagesCard = ({ title, caption, urls }: { title: string; caption: string; urls: string[] }) => (
  <div>
    <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">{title}</h2>
    <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
      <p>{caption}</p>
    </div>
    <div className={`mt-6 grid gap-4 ${urls.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
      {urls.map((url, i) => (
        <ImageCard
          key={i}
          url={url}
          className={`w-full${urls.length % 2 !== 0 && i === urls.length - 1 ? " md:col-span-2" : ""}`}
        />
      ))}
    </div>
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
              <SectionLabel>Context & Problem</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                A legally required process held together by contracted observers
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>When my team met Time Study Inc (TS Inc) they served 30+ hospitals and healthcare systems. Healthcare organizations are legally required to conduct quarterly time studies documenting how practitioners spend their time so the government can accurately reimburse them and so that administrators can identify operational inefficiencies.</p>
                <p>Before Time Study Now, TS Inc’s clients relied on contracted human observers physically following practitioners for two weeks, recording every activity by hand, then transcribing those notes to activity codes on a TS Inc’s web platform. This created a lot of problems for TS Inc’s clients.</p>
              </div>


              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 ">
                  <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#191919] lg:mb-6">
                    Participation Increase
                  </p>
                  <p className="text-[14px] italic md:text-[16px] pl-4 tracking-widest text-[#6A6A6A] border-l-2 border-[#6D42FF] font-bold mb-3">
                    "It's incredibly uncomfortable having non-medical observers follow me while I'm trying to care for patients."
                  </p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    😩 Invasion of professional space
                  </p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    😩 No control over their own data
                  </p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    😩 Uncertainty about compensation accuracy
                  </p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    😩 Disruptive to sensitive patient moments
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 ">
                  <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#191919] lg:mb-6">
                    For Administrators
                  </p>
                  <p className="text-[14px] italic md:text-[16px] pl-4 tracking-widest text-[#6A6A6A] border-l-2 border-[#6C7486] font-bold mb-3">
                    “There's so much room for human error. If they record inaccurate times, we can't reimburse practitioners correctly."
                  </p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    😩 Manual transcription errors
                  </p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    😩 Data only available after 2 week study ends
                  </p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    😩 Expensive contracted observer costs
                  </p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    😩 Operational decisions built on flawed data
                  </p>
                </div>



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


                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">

                  <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 border-t-2 border-t-[#6D42FF]">
                    <p className="text-[16px] md:text-[18px] font-semibold  text-[#191919] lg:mb-6">
                      Participation Increase
                    </p>

                    <p className="text-[14px] md:text-[16px] font-semibold leading-6.75  text-[#3D3D4E] lg:mb-3">
                      Dr. Robyn Dahn
                    </p>

                    <p className="text-[14px] md:text-[16px] leading-6 text-[#6A6A6A]  font-medium mb-3">
                      General Practitioner at LifeSavers Group who participates in quarterly two week time studies. She’s followed around by a contracted observer whose recordings directly determine her wages. She has no visibility into the accuracy of the recorded data and no way to verify.
                    </p>

                    <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      🎯 Track time without disrupting patient care
                    </p>
                    <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      🎯 Trust that her compensation reflects actual work
                    </p>
                    <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      🎯 Have visibility and control over her own data
                    </p>

                  </div>

                  <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 border-t-2 border-t-[#6C7486]">
                    <p className="text-[16px] md:text-[18px] font-semibold  text-[#191919] lg:mb-6">
                      Secondary user
                    </p>

                    <p className="text-[14px] md:text-[16px] font-semibold leading-6.75  text-[#3D3D4E] lg:mb-3">
                      James Morgan
                    </p>

                    <p className="text-[14px] md:text-[16px] leading-6 text-[#6A6A6A]  font-medium mb-3">
                      Administrator at LifeSavers Group. He maps practitioner time data to billing codes for government reimbursement and analyses aggregated patterns to inform staffing decisions. He currently works with data he can't fully trust.
                    </p>

                    <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      🎯 Access accurate, real-time, time-use data
                    </p>
                    <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      🎯 Submit correct reimbursement data to the government
                    </p>
                    <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      🎯 Spot operational patterns to improve staffing
                    </p>

                  </div>



                </div>





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


                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {
                    OPERATIONIMAGES.map(v => <ImageCard key={v.title} url={v.src} className="w-full " />)
                  }
                </div>


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
          <section id="Solution">
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
          </section>


          {/* ── BuildHandover ── */}
          <section id="BuildHandover">
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
          </section>

          {/* ── Impact ── */}
          <section id="Impact">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Impact</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                The numbers Time Study Inc reported
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>About a year after handing over, Time Study Inc shared some results with us. The app didn't just meet targets, it dramatically exceeded them.</p>
              </div>

              <div className="mt-12 space-y-8">

                {/* first */}
                <div className="mt-4 grid grid-cols-1">

                  <div className="bg-[#6D42FF08] border border-[#6D42FF] p-4 md:p-6 ">
                    <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#6A6A6A] lg:mb-6">
                      Churn Rate
                    </p>
                    <p className="text-[14px] md:text-[24px] tracking-widest text-[#6D42FF] font-bold mb-3">0%</p>
                    <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      Practitioners who started using the app continued using it rather than falling back to contracted observers.
                    </p>
                  </div>

                </div>
                {/* second */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">

                  <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 ">
                    <p className="text-[16px] md:text-[18px] font-semibold leading-6.75 text-[#6A6A6A] lg:mb-6">
                      Participation Increase
                    </p>
                    <p className="text-[14px] md:text-[24px] tracking-widest text-[#6D42FF] font-bold mb-3">128%</p>
                    <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      From existing and new clients. This was more than double the 50% adoption target set at the start.
                    </p>
                  </div>

                  <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 ">
                    <p className="text-[16px] md:text-[18px] font-semibold leading-6 text-[#6A6A6A] lg:mb-6">
                      Mobile Driven Growth
                    </p>
                    <p className="text-[14px] md:text-[24px] tracking-widest text-[#6D42FF] font-bold mb-3">95%</p>
                    <p className="text-[14px] md:text-[16px] font-medium leading-6 text-[#6A6A6A]">
                      Most of the new participation came from mobile app users, not contracted observers.
                    </p>
                  </div>

                </div>

                {/* third */}
                <div className="mt-4 grid grid-cols-1">

                  <div className="bg-[#6D42FF08] border border-[#6D42FF] p-4 md:p-6 ">
                    <p className="text-[14px] md:text-[24px] tracking-widest text-[#6D42FF] font-bold mb-3">Real World Outcome</p>
                    <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      One healthcare organization identified that paediatric surgeons were consistently working overtime using Time Study Now data. They hired two additional surgeons to improve their surgeons wellbeing. This is the kind of operational decision that wasn't possible when data arrived on a clipboard.
                    </p>
                  </div>

                </div>

                {/* fourth */}
                <div className="mt-4 flex gap-4 md:gap-8 flex-col md:flex-row ">

                  <div className="bg-[#6D42FF08] border border-[#6D42FF] p-4 md:p-6 self-start ">
                    <p className="text-[14px] md:text-[24px] tracking-widest text-[#6D42FF] font-bold">10M+ hours tracked</p>
                  </div>

                  <div className="bg-[#6D42FF08] border border-[#6D42FF] p-4 md:p-6 self-start">
                    <p className="text-[14px] md:text-[24px] tracking-widest text-[#6D42FF] font-bold ">$1M+ ARR for Time Study Inc</p>
                  </div>

                </div>

                {/* fifth */}
                <div className="mt-4 flex gap-4 md:gap-8 flex-col md:flex-row ">
                  <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-6 self-start  ">
                    <p className="text-[14px] font-medium leading-6.75 text-[#6A6A6A]  ">
                      Mobile became a core differentiator for their sales
                    </p>
                  </div>

                </div>


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
      <Footer isDetail={true} onClick={() => navigate("/behold")}
        description="Helping Christians maintain consistent prayer practice through daily guided prayers & meditations."
      />
    </div>
  );
};

export default TimeStudy;
