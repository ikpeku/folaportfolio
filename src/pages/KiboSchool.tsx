import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Assets from "../assets";
import Footer from "../component/Footer";
import Carousel from "../component/Carousel";
import { useNavigate } from "react-router";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

const NAV_ITEMS = [
  { id: "Context", title: "Context" },
  { id: "EvaluatingAnchor", title: "Evaluating Anchor" },
  { id: "Problems", title: "Problems" },
  { id: "Explorations", title: "Explorations" },
  { id: "DesignTesting", title: "Design & Testing" },
  { id: "Impact", title: "Impact" },
  { id: "Reflections", title: "Reflections" },
];

// ── Shared primitives ────────────────────────────────────────
const SectionLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-[10px] md:text-[14px] tracking-widest text-[#6A6A6A] font-semibold ${className ?? ""}`}>{children}</p>
);

const Divider = ({className}) => (
  <motion.div className={` border-t border-dashed border-neutral-200 ${className}`} {...fadeUp(0)} />
);

const ImageCard = ({ seed, className = "" }: { seed: string; className?: string }) => (
  <div className={`overflow-hidden ${className}`}>
    <img src={seed} alt="" className="w-full h-full object-center" />
  </div>
);




const LearnItem = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex gap-3 items-start">
    <span className="text-[18px] ">{icon}</span>
    <p className="text-[14px] leading-relaxed text-[#3D3D4E]">{text}</p>
  </div>
);

const SLIDES = [
  { src: Assets.Contextone, title: "Students Dashboard" },
  { src: Assets.Contextone, title: "Students Dashboard 2" },
  { src: Assets.Contextone, title: "Students Dashboard 3" },
  { src: Assets.Contextone, title: "Students Dashboard 4" },
];

// ════════════════════════════════════════════════════════════
const KiboSchool = () => {
  const [active, setActive] = useState<string | null>(null);
  const visibilityRef = useRef<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const navigate = useNavigate()

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const pick = () => {
      // find the first section (in DOM order) that is currently visible
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
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pt-10 md:pt-16">

      {/* ── Hero image ── */}
      <motion.div {...fadeUp(0.05)}>
        <div className="w-full aspect-16/8 bg-neutral-100 rounded-xl overflow-hidden">
          <img src={Assets.Kiboschoolbanner} alt="Kibo banner" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* ── Title + meta ── */}
      <motion.div className="mt-10" {...fadeUp(0.1)}>
        <h1 className="text-[28px] md:text-[36px] font-medium leading-tight italic">
          Helping students stay on top of assignments
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:mt-5 mt-6">
          {/* Company */}
          <div>
            <p className="text-[14px] font-semibold text-[#3D3D4E]">Kibo School</p>
            <p className="text-[14px] md:text-[16px] font-semibold text-[#6A6A6A] mt-1">Oct 2022 - Apr 2024</p>
          </div>
          {/* Role */}
          <div>
            <SectionLabel>ROLE</SectionLabel>
            <p className="text-[14px] md:text-[18px] font-medium leading-snug mt-1">Solo Product Designer</p>
          </div>
          {/* Team */}
          <div>
            <SectionLabel>TEAM</SectionLabel>
            <p className="text-[14px] md:text-[18px] font-medium leading-snug mt-1">1 Product Manager & 2 Full Stack Developers</p>
          </div>
        </div>
      </motion.div>

      <Divider className={"my-16"}/>

      {/* ── Two-column layout ── */}
      <div className="flex gap-12 items-start">

        {/* ── Sticky sidebar — desktop: text labels, mobile: dot strip ── */}
        <aside className="shrink-0 sticky top-10 self-start">

          {/* Desktop */}
          <div className="hidden lg:flex flex-col gap-1 w-40 ">
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

          {/* Mobile — vertical dot strip */}
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
        <main className="flex-1 min-w-0 space-y-16">


          {/* ── Context ── */}
          <section id="Context" className=" border-b-2 border-dashed border-neutral-200 pb-16">
            <motion.div className="grid grid-cols-1" {...fadeUp(0.1)}>
              <div className="mb-4" >
                <SectionLabel>Context</SectionLabel>
                <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                  A learning platform to support a fully remote BSc. Computer Science Degree
                </h2>
                <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                  <p>Kibo School offers an Africa-focused, fully online BSc. in Computer Science. Students are dispersed across the continent — no campus, no in-person lectures, no face-to-face support structures.</p>
                  <p>I joined as a Product Manager embedded with the engineering team to redesign the core learning platform — the digital space students spend most of their academic lives in.</p>
                </div>
              </div>

              <Carousel slides={SLIDES} />
            </motion.div>
          </section>

          {/* <Divider /> */}

          {/* ── Evaluating Anchor ── */}
          <section id="EvaluatingAnchor">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel>Evaluating Anchor</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                Listening to students after launch
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>After launching the platform, we immediately began receiving feedback through the built-in feedback form. I worked with the PM to send out surveys evaluating how well the platform addressed issues students had with their prior learning tools, then synthesised the results alongside complaint patterns from the issue tracker. We then planned and carried out user interviews to understand the reasons behind what we were seeing.</p>
                <p>Pulling all three sources together gave us a clear picture of the most pressing issues, how widespread they were and what was causing them.</p>
              </div>

              <div className="space-y-12 mt-12">
                <ImageCard seed={Assets.Issuetrackeranalysis} className="w-full" />
                <ImageCard seed={Assets.Evaluatinganchortwo} className="w-full" />


              </div>

              <div className="my-10 md:my-24">
                <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                  Four pain points, one urgent
                </h2>

                <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                  <p>Bringing all the feedback together, students were struggling with four main issues: tracking assignment due dates and where to submit, navigating certain parts of the platform, tracking their progress through course content and keeping track of upcoming events like live classes and office hours.</p>
                  <p>Assignment tracking rose to the top and rightfully so, late submissions carried a 10% grade penalty. Instructors also reported that students frequently cited forgetting to submit as their reason for missing deadlines. The stakes were too high to address anything else first.</p>
                </div>

                <div className="mt-12">
                  <ImageCard seed={Assets.Evaluatinganchorthree} className="w-full " />

                </div>

              </div>

            </motion.div>

          </section>


          {/* ── Problems ── */}
          <section id="Problems">
            <motion.div {...fadeUp(0.1)}>

              <SectionLabel>The Problem</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-4">
                Defining the problem
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>Before sketching anything, the PM and I aligned on a clear problem statement to give us a benchmark to measure any solution against.</p>
              </div>


              <div className="bg-[#F9FAFB] border-[#E5E5E5] p-4 md:p-8 my-8">
                <p className="text-[14px] italic tracking-widest text-[#6A6A6A] font-semibold mb-3">Problem Statement</p>
                <p className="text-[16px] md:text-[18px] italic font-semibold leading-6.75 text-[#3D3D4E]">
                  Students can't get a quick view of what assignments are due across all their courses and they have no reliable way to confirm they've submitted in all required places.
                </p>
              </div>

              <p className="my-6 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                From this we created two “How Might We” statements to begin exploring solutions:
              </p>


              <div className="bg-[#F9FAFB] border-[#E5E5E5] p-4 md:p-8 my-8 border-l-2 border-l-[#5D5FEF]">
                <p className="text-[14px] italic tracking-widest text-[#6A6A6A] font-semibold mb-3">How might we...</p>
                <p className="text-[16px] md:text-[18px] italic font-semibold leading-6.75 text-[#3D3D4E]">
                  Give students a quick view of what assignments are due across all their courses?
                </p>
              </div>

              <div className="bg-[#F9FAFB] border-[#E5E5E5] p-4 md:p-8 my-8 border-l-2 border-l-[#5D5FEF]">
                <p className="text-[14px] italic tracking-widest text-[#6A6A6A] font-semibold mb-3">How might we...</p>
                <p className="text-[16px] md:text-[18px] italic font-semibold leading-6.75 text-[#3D3D4E]">
                  Give students a reliable way to confirm they've submitted their assignments in all required places?
                </p>
              </div>


            </motion.div>
          </section>


          {/* ── Explorations ── */}
          <section id="Explorations">
            <motion.div {...fadeUp(0.1)}>

              <SectionLabel>Explorations</SectionLabel>
              <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-4">
                Exploring directions, then narrowing down
              </h2>
              <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                <p>We explored five potential directions and evaluated each against how well it resolved both HMW statements, how naturally it fit into existing student behaviour on the platform and what was technically feasible for our team to ship.</p>
              </div>

              <div className="mt-12">
                <ImageCard seed={Assets.Explodebannerone} className="w-full " />
              </div>

              <p className="my-6 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                The widget approach stood out because it solved both HMW statements without requiring any change in behaviour or an extra page to visit. Especially since we already had a status section on assignment pages.
              </p>

            </motion.div>
          </section>


          {/* ── Design & Testing ── */}
          <section id="DesignTesting" >
            <motion.div className="grid grid-cols-1 " {...fadeUp(0.1)}>
              <div className="mb-4" >
                <SectionLabel>Design & Testing</SectionLabel>
                <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                  Two prototypes, tested comparatively
                </h2>
                <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                  <p>I explored alternative designs around three questions: where should the widgets live, how should they look and what information should they show. From sketches I built two prototypes for each widget then ran comparative usability tests with students to observe: where they hesitated, what was unclear and which version gave them more confidence.</p>
                </div>
              </div>

              <div className="space-y-16 mt-8">
                <Carousel slides={SLIDES} />
                <Carousel slides={SLIDES} />
              </div>


              <p className="my-6 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                I iterated based on usability findings, then aligned with the PM to confirm the design solved our problem statement and was feasible before handing off to development. Handoff included full specifications for all states (i.e incomplete, submitted, graded, overdue). As development progressed, I reviewed builds to flag anything that deviated from the intended experience before the widgets went live.
              </p>


              <div className="mt-6">
                <ImageCard seed={Assets.Designtestingone} className="w-full" />
                <ImageCard seed={Assets.Designtestingtwo} className="w-full" />
                <p className="my-6 text-center text-[14px] md:text-[18px] text-[#3D3D4E] font-semibold">Submission Widget Variants</p>
              </div>

            </motion.div>
          </section>


          {/* ── Impact ── */}
          <section id="Impact">
            <motion.div className="grid grid-cols-1 " {...fadeUp(0.1)}>
              <div className="mb-4" >
                <SectionLabel>Impact</SectionLabel>
                <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                  Validating the Solution
                </h2>
                <div className="font-medium space-y-4 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                  <p>We launched assignment widgets in time for the January term. After a couple months we carried out a follow up survey and interviews to evaluate the solution.</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-8 ">
                  <p className="text-[14px] md:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">3.97/5</p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Rating in students confidence that they know which assignments are due when across all courses.
                  </p>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-8 ">
                  <p className="text-[14px] md:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">3.97/5</p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Rating in students confidence that they know which assignments are due when across all courses.
                  </p>
                </div>

              </div>


              <p className="my-2 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                From the follow up interviews with 5 students:
              </p>


               <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-8 ">
                  <p className="text-[14px] md:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">3.97/5</p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Rating in students confidence that they know which assignments are due when across all courses.
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-8 ">
                  <p className="text-[14px] md:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">3.97/5</p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Rating in students confidence that they know which assignments are due when across all courses.
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-8 ">
                  <p className="text-[14px] md:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">3.97/5</p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Rating in students confidence that they know which assignments are due when across all courses.
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 md:p-8 ">
                  <p className="text-[14px] md:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">3.97/5</p>
                  <p className="text-[14px] md:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Rating in students confidence that they know which assignments are due when across all courses.
                  </p>
                </div>


              </div>

              <p className="my-6 text-[14px] md:text-[18px] leading-6.75 text-[#3D3D4E]">
                Before the redesign students had to navigate into every individual course to find upcoming assignments. After launching the upcoming assignments widget 47% of students surveyed rarely or never needed to. Instructors also reported fewer students saying the forgot as their reason for submitting late.
              </p>

            </motion.div>


          </section>


          {/* ── Reflections ── */}
          <section id="Reflections">
            <motion.div {...fadeUp(0.1)}>
              <div className="mb-4" >
                <SectionLabel>Reflections</SectionLabel>
                <h2 className="text-[20px] md:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                  What stood out looking back
                </h2>
              </div>
             

              <div className="space-y-5 max-w-2xl">
                <LearnItem icon="🏫" text="Being at the same institution as our users was a significant advantage, feedback was quick to gather and grounded in real, ongoing experiences rather than recalled frustrations." />
                      <Divider className={"my-4"} />
                <LearnItem icon="🔀" text="Combining three feedback sources meant no single source carried too much weight. Each answered a different question: what were the issues, how widespread were they and what was causing them." />
                 <Divider className={"my-4"} />
                <LearnItem icon="📌" text="The submission status widget was scoped to the two platforms assignments are always required to be submitted on. Students submitting on additional platforms still experienced some uncertainty. Full platform coverage became a clear priority for the next iteration." />
                <Divider className={"my-4"} />
                <LearnItem icon="🤔" text='Post launch feedback showed students wanted visibility beyond the next 5 upcoming assignments. We decided it would be worth coming back later on to figure out whether to expose more upcoming assignments or extend the upcoming assignments widget beyond assignments to "upcoming events".' />
              </div>
            </motion.div>
          </section>

        </main>
      </div>
      <Footer isDetail={true} onClick={() => navigate("/time-study")} />
    </div>
  );
};

export default KiboSchool;
