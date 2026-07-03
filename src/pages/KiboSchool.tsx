import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Assets from "../assets";
import Footer from "../component/Footer";
import Carousel from "../component/Carousel";
import CaseStudyHero from "../component/CaseStudyHero";
// import Divider from "../component/Divider";
import { useNavigate } from "react-router";
import BackButton from "../utils/BackButton";

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
  <p className={`text-[10px] lg:text-[16px] tracking-normal leading-none text-[#6A6A6A] font-semibold ${className ?? ""}`}>{children}</p>
);

const SectionHeading = ({ label, title, titleClassName = "mb-6" }: { label: string; title: string; titleClassName?: string }) => (
  <div className="flex flex-col gap-4">
    <SectionLabel>{label}</SectionLabel>
    <h2 className={`text-[20px] lg:text-[24px] text-[#191919] font-semibold tracking-none leading-7.5 ${titleClassName}`}>
      {title}
    </h2>
  </div>
);

const SectionIntro = ({
  label,
  title,
  className,
  children,
}: {
  label: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}) => (
  <div className={`flex flex-col gap-6 ${className ?? ""}`}>
    <SectionHeading label={label} title={title} titleClassName="mb-0" />
    {children}
  </div>
);


const ImageCard = ({ seed, className = "" }: { seed: string; className?: string }) => (
  <div className={`overflow-hidden ${className}`}>
    <img src={seed} alt="" className="w-full h-full object-center" />
  </div>
);




// const LearnItem = ({ icon, text }: { icon: string; text: string }) => (
//   <div className="flex gap-3 items-start">
//     <span className="text-[18px] ">{icon}</span>
//     <p className="text-[14px] leading-relaxed text-[#3D3D4E]">{text}</p>
//   </div>
// );

const SLIDES = [
  { src: Assets.Contextone, title: "Students Dashboard" },
  { src: Assets.Contexttwo, title: "Course Units" },
  { src: Assets.Contextthree, title: "Course Activities" },
  { src: Assets.Contextfour, title: "Students Progress" },
  { src: Assets.Contextfive, title: "Course Information" },
];

const DESIGNSLIDES = [
  { src: Assets.Contextsix, title: "Option 1" },
  { src: Assets.Contextseven, title: "Option 1" },
  { src: Assets.Contexteight, title: "Option 1" },
];

const TESTINGSLIDES = [
  { src: Assets.Contextnine, title: "Option 2" },
  { src: Assets.Contextten, title: "Option 2" },
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
    <div className="pt-10 lg:pt-16  ">

      {/* hero section */}
      <CaseStudyHero
        banner={Assets.Kiboschoolbanner}
        bannerAlt="Kibo banner"
        title="Helping students stay on top of assignments"
        company="Kibo School"
        dateRange="Oct 2022 - Apr 2024"
        role="Solo Product Designer"
        team="1 Product Manager & 2 Full Stack Developers"
      />




      {/* ── Two-column layout ── */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">

        {/* ── Sticky sidebar — desktop: text labels, mobile: dot strip ── */}
        <aside className="hidden lg:block lg:col-span-3 shrink-0 sticky top-10 self-start">

          {/* Desktop */}
          <div className="hidden lg:flex flex-col gap-1 w-40 ">
            <BackButton className="mb-6" />
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

        {/* Mobile — vertical dot strip */}
        <div className="lg:hidden fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              aria-label={item.title}
              className={`rounded-full transition-all duration-300 ${active === item.id
                  ? "w-2 h-2 bg-[#191919]"
                  : "w-1.5 h-1.5 bg-[#B1B1B8] hover:bg-[#6A6A6A]"
                }`}
            />
          ))}
        </div>


        {/* ── Main content ── */}
        <main className="lg:col-span-9 min-w-0 space-y-16 lg:space-y-30">


          {/* ── Context ── */}
          <section id="Context" className=" ">
            <motion.div className="grid grid-cols-1 gap-10" {...fadeUp(0.1)}>
              <SectionIntro label="Context" title="A learning platform to support a fully remote BSc. Computer Science Degree">
                <p className="font-medium text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]">Kibo School offers an Africa-focused, fully online BSc. in Computer Science. Students are dispersed across the continent — no campus, no in-person lectures, no face-to-face support structures.</p>
                <p className="font-medium text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]">I joined as a Product Manager embedded with the engineering team to redesign the core learning platform — the digital space students spend most of their academic lives in.</p>
              </SectionIntro>

              <Carousel slides={SLIDES} />
            </motion.div>
          </section>



          {/* ── Evaluating Anchor ── */}
          <section id="EvaluatingAnchor">
            <motion.div {...fadeUp(0.1)}>
              <SectionIntro label="Evaluating Anchor" title="Listening to students after launch">
                  <p className="font-medium text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]" >After launching the platform, we immediately began receiving feedback through the built-in feedback form. I worked with the PM to send out surveys evaluating how well the platform addressed issues students had with their prior learning tools, then synthesised the results alongside complaint patterns from the issue tracker. We then planned and carried out user interviews to understand the reasons behind what we were seeing.</p>
                  <p className="font-medium text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]" >Pulling all three sources together gave us a clear picture of the most pressing issues, how widespread they were and what was causing them.</p>
              </SectionIntro>

              <div className="space-y-12 mt-12">
                <ImageCard seed={Assets.Issuetrackeranalysis} className="w-full" />
                <ImageCard seed={Assets.Evaluatinganchortwo} className="w-full" />


              </div>

              <div className="my-10 lg:my-24">
                <h2 className="text-[20px] lg:text-[24px] text-[#3D3D4E] font-semibold leading-7.5 my-6">
                  Four pain points, one urgent
                </h2>

                <div className="font-medium space-y-4 text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]">
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

              <SectionIntro label="The Problem" title="Defining the problem">
                  <p className="font-medium text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]" >Before sketching anything, the PM and I aligned on a clear problem statement to give us a benchmark to measure any solution against.</p>
              </SectionIntro>


              <div className="bg-[#F9FAFB] border-[#E5E5E5] p-4 lg:p-8 my-8">
                <p className="text-[14px] italic tracking-widest text-[#6A6A6A] font-semibold mb-3">Problem Statement</p>
                <p className="text-[16px] lg:text-[18px] italic font-semibold leading-6.75 text-[#3D3D4E]">
                  Students can't get a quick view of what assignments are due across all their courses and they have no reliable way to confirm they've submitted in all required places.
                </p>
              </div>

              <p className="my-6 text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]">
                From this we created two “How Might We” statements to begin exploring solutions:
              </p>


              <div className="bg-[#F9FAFB] border-[#E5E5E5] p-4 lg:p-8 my-8 border-l-4 border-l-[#5D5FEF]">
                <p className="text-[14px] italic tracking-widest text-[#6A6A6A] font-semibold mb-3">How might we...</p>
                <p className="text-[16px] lg:text-[18px] italic font-semibold leading-6.75 text-[#3D3D4E]">
                  Give students a quick view of what assignments are due across all their courses?
                </p>
              </div>

              <div className="bg-[#F9FAFB] border-[#E5E5E5] p-4 lg:p-8 my-8 border-l-4 border-l-[#5D5FEF]">
                <p className="text-[14px] italic tracking-widest text-[#6A6A6A] font-semibold mb-3">How might we...</p>
                <p className="text-[16px] lg:text-[18px] italic font-semibold leading-6.75 text-[#3D3D4E]">
                  Give students a reliable way to confirm they've submitted their assignments in all required places?
                </p>
              </div>


            </motion.div>
          </section>


          {/* ── Explorations ── */}
          <section id="Explorations">
            <motion.div {...fadeUp(0.1)}>

              <SectionIntro label="Explorations" title="Exploring directions, then narrowing down">
                  <p className="font-medium text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]" >We explored five potential directions and evaluated each against how well it resolved both HMW statements, how naturally it fit into existing student behaviour on the platform and what was technically feasible for our team to ship.</p>
              </SectionIntro>

              <div className="mt-12">



                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">

                  <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                    <div className="flex items-center gap-2">

                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.86344 14.3613C9.93242 14.3612 10.0007 14.3747 10.0645 14.401C10.1282 14.4274 10.1862 14.466 10.2349 14.5148C10.2837 14.5636 10.3224 14.6215 10.3487 14.6853C10.3751 14.749 10.3886 14.8173 10.3884 14.8863V16.7248C10.3884 16.7937 10.3749 16.862 10.3485 16.9257C10.3221 16.9894 10.2834 17.0472 10.2347 17.096C10.1859 17.1447 10.128 17.1834 10.0643 17.2098C10.0007 17.2362 9.93238 17.2498 9.86344 17.2498H8.025C7.95606 17.2498 7.88779 17.2362 7.82409 17.2098C7.7604 17.1834 7.70252 17.1447 7.65377 17.096C7.60502 17.0472 7.56635 16.9894 7.53996 16.9257C7.51358 16.862 7.5 16.7937 7.5 16.7248V14.8863C7.5 14.7471 7.55531 14.6136 7.65377 14.5151C7.75223 14.4166 7.88576 14.3613 8.025 14.3613H9.86344Z" fill="#191919" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0721 2.90586C17.0721 2.83684 17.0585 2.76849 17.0321 2.70473C17.0057 2.64098 16.9669 2.58306 16.918 2.5343C16.8692 2.48553 16.8112 2.44688 16.7474 2.42055C16.6836 2.39423 16.6152 2.38074 16.5462 2.38086H15.7221C15.6532 2.38074 15.5848 2.39423 15.5211 2.42057C15.4573 2.44691 15.3994 2.48558 15.3506 2.53435C15.3019 2.58313 15.2632 2.64105 15.2369 2.70481C15.2105 2.76856 15.197 2.83688 15.1971 2.90586V4.35242H8.74902V2.90586C8.74902 2.76662 8.69371 2.63309 8.59525 2.53463C8.4968 2.43617 8.36326 2.38086 8.22402 2.38086H7.39902C7.25978 2.38086 7.12625 2.43617 7.02779 2.53463C6.92934 2.63309 6.87402 2.76662 6.87402 2.90586V4.35899C5.95998 4.41645 5.10218 4.82003 4.47519 5.48761C3.84819 6.15518 3.49913 7.03658 3.49902 7.95242V17.7596C3.49902 18.7144 3.87831 19.6301 4.55344 20.3052C5.22857 20.9803 6.14424 21.3596 7.09902 21.3596H16.9043C17.8591 21.3596 18.7748 20.9803 19.4499 20.3052C20.1251 19.6301 20.5043 18.7144 20.5043 17.7596V7.95242C20.5044 7.02667 20.1478 6.13648 19.5086 5.46677C18.8695 4.79707 17.9969 4.39933 17.0721 4.35617V2.90586ZM15.7203 9.44117H18.6265V17.7624C18.6265 18.2199 18.4448 18.6587 18.1213 18.9822C17.7978 19.3057 17.359 19.4874 16.9015 19.4874H7.09621C6.63871 19.4874 6.19995 19.3057 5.87645 18.9822C5.55295 18.6587 5.37121 18.2199 5.37121 17.7624V9.43836L15.7203 9.44117Z" fill="#191919" />
                      </svg>

                      <h2 className="text-[14px] lg:text-[18px] tracking-widest text-[#191919] font-semibold ">Calendar view</h2>

                    </div>
                    <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      All activities and due dates in a calendar format.
                    </p>
                  </div>

                  <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                    <div className="flex items-center gap-2">

                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.9999 3C17.0018 2.99899 16.0264 3.29853 15.2009 3.85962C14.5215 3.46573 13.7754 3.2002 12.9999 3.07629V2C12.9999 1.73478 12.8946 1.48043 12.7071 1.29289C12.5195 1.10536 12.2652 1 11.9999 1C11.7347 1 11.4804 1.10536 11.2928 1.29289C11.1053 1.48043 10.9999 1.73478 10.9999 2V3.08923C9.66282 3.29485 8.42487 3.91774 7.4629 4.86894C6.50093 5.82015 5.86414 7.05101 5.6435 8.38574L4.87395 13.0161C4.77864 13.5674 4.50075 14.0706 4.08495 14.4448L3.68944 14.7886C3.3781 15.071 3.12926 15.4154 2.95889 15.7997C2.78852 16.184 2.70039 16.5996 2.70015 17.02C2.69881 17.1403 2.70435 17.2606 2.71675 17.3804C2.80593 18.1033 3.1564 18.7687 3.70213 19.2512C4.24786 19.7337 4.95119 20.0001 5.67964 20H8.55049C8.66701 20.832 9.0803 21.5938 9.71419 22.1451C10.3481 22.6964 11.1599 23 11.9999 23C12.84 23 13.6518 22.6964 14.2857 22.1451C14.9196 21.5938 15.3329 20.832 15.4494 20H18.2802C19.0226 20.0032 19.7394 19.7288 20.2898 19.2305C20.8402 18.7322 21.1844 18.0462 21.2548 17.3071C21.2568 17.2871 21.2587 17.2437 21.2587 17.2061C21.3015 16.7335 21.2304 16.2576 21.0515 15.8182C20.8726 15.3787 20.591 14.9885 20.2304 14.6802L19.956 14.4458C19.5171 14.0671 19.2237 13.5475 19.1259 12.9761L19.1079 12.8667C20.3066 12.5953 21.3632 11.8914 22.0755 10.8898C22.7878 9.88815 23.1058 8.65904 22.9687 7.43762C22.8315 6.2162 22.2489 5.08823 21.3322 4.2695C20.4154 3.45078 19.229 2.99878 17.9999 3ZM11.9999 21C11.6907 20.999 11.3894 20.9024 11.1373 20.7233C10.8852 20.5443 10.6947 20.2916 10.5919 20H13.4079C13.3052 20.2916 13.1147 20.5443 12.8626 20.7233C12.6105 20.9024 12.3091 20.999 11.9999 21ZM19.2646 17.1128C19.2407 17.3568 19.1265 17.5831 18.9444 17.7472C18.7623 17.9114 18.5254 18.0015 18.2802 18H5.67964C5.4396 18.0004 5.2077 17.913 5.02765 17.7542C4.84759 17.5955 4.7318 17.3764 4.7021 17.1382C4.69819 17.0986 4.70015 17.0596 4.70015 17.02C4.69958 16.8825 4.72729 16.7462 4.78155 16.6198C4.83581 16.4934 4.91547 16.3795 5.01558 16.2852L5.40913 15.9438C6.16788 15.2643 6.67449 14.3481 6.84663 13.3442L7.61616 8.71484C7.78684 7.67598 8.32162 6.73176 9.1248 6.05114C9.92799 5.37051 10.9472 4.99791 11.9999 5C12.6076 5.00262 13.2084 5.12871 13.7658 5.37061C13.3318 6.05855 13.0735 6.84256 13.0134 7.65374C12.9534 8.46492 13.0936 9.27842 13.4216 10.0227C13.7496 10.7671 14.2554 11.4194 14.8946 11.9225C15.5338 12.4255 16.2868 12.7638 17.0873 12.9077L17.1542 13.311C17.3342 14.3393 17.8621 15.2745 18.6494 15.96L18.9296 16.1993C19.0564 16.3122 19.1533 16.4546 19.2117 16.614C19.2702 16.7734 19.2883 16.9447 19.2646 17.1128Z" fill="#191919" />
                      </svg>


                      <h2 className="text-[14px] lg:text-[18px] tracking-widest text-[#191919] font-semibold ">Notification system</h2>

                    </div>
                    <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      Notifications for upcoming assignments and events.
                    </p>
                  </div>


                  <div className="bg-[rgba(93, 95, 239, 0.03)] border border-[#5D5FEF] p-4 lg:p-8 ">
                    <div className="flex items-center gap-2">

                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7999 13.7955C10.7999 13.1355 11.3355 12.6004 11.997 12.6004H20.4029C21.064 12.6004 21.5999 13.1364 21.5999 13.7955V20.4053C21.5999 21.0653 21.0643 21.6004 20.4029 21.6004H11.997C11.3358 21.6004 10.7999 21.0644 10.7999 20.4053V13.7955ZM11.9999 14.1011V20.0997C11.9999 20.2625 12.1338 20.4004 12.2989 20.4004H20.1009C20.268 20.4004 20.3999 20.2657 20.3999 20.0997V14.1011C20.3999 13.9382 20.2661 13.8004 20.1009 13.8004H12.2989C12.1318 13.8004 11.9999 13.935 11.9999 14.1011ZM2.3999 13.7955C2.3999 13.1355 2.94107 12.6004 3.60502 12.6004H8.39478C9.06035 12.6004 9.5999 13.1364 9.5999 13.7955V20.4053C9.5999 21.0653 9.05873 21.6004 8.39478 21.6004H3.60502C2.93945 21.6004 2.3999 21.0644 2.3999 20.4053V13.7955ZM3.5999 14.1011V20.0997C3.5999 20.2625 3.73433 20.4004 3.90016 20.4004H8.09964C8.26143 20.4004 8.3999 20.2657 8.3999 20.0997V14.1011C8.3999 13.9382 8.26547 13.8004 8.09964 13.8004H3.90016C3.73838 13.8004 3.5999 13.935 3.5999 14.1011ZM14.9999 3.59552C14.9999 2.93547 15.54 2.40039 16.1951 2.40039H20.4047C21.0648 2.40039 21.5999 2.93643 21.5999 3.59552V10.2053C21.5999 10.8653 21.0598 11.4004 20.4047 11.4004H16.1951C15.535 11.4004 14.9999 10.8644 14.9999 10.2053V3.59552ZM16.1999 3.90113V9.89965C16.1999 10.0625 16.3351 10.2004 16.502 10.2004H20.0978C20.2602 10.2004 20.3999 10.0657 20.3999 9.89965V3.90113C20.3999 3.73824 20.2647 3.60039 20.0978 3.60039H16.502C16.3396 3.60039 16.1999 3.73504 16.1999 3.90113ZM2.3999 3.59552C2.3999 2.93547 2.93446 2.40039 3.59836 2.40039H12.6014C13.2633 2.40039 13.7999 2.93643 13.7999 3.59552V10.2053C13.7999 10.8653 13.2653 11.4004 12.6014 11.4004H3.59836C2.93647 11.4004 2.3999 10.8644 2.3999 10.2053V3.59552ZM3.5999 3.90113V9.89965C3.5999 10.0625 3.73397 10.2004 3.89935 10.2004H12.3005C12.4657 10.2004 12.5999 10.0657 12.5999 9.89965V3.90113C12.5999 3.73824 12.4658 3.60039 12.3005 3.60039H3.89935C3.73411 3.60039 3.5999 3.73504 3.5999 3.90113Z" fill="#5D5FEF" stroke="#5D5FEF" stroke-width="0.5" />
                      </svg>


                      <h2 className="text-[14px] lg:text-[18px] tracking-widest text-[#5D5FEF] font-semibold ">Assignment widgets</h2>
                      <h1 className="text-[14px] lg:text-[18px] tracking-widest text-[#5D5FEF] font-semibold ml-auto ">CHOSEN</h1>

                    </div>
                    <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      Upcoming assignments and submission widgets.
                    </p>
                  </div>

                  <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                    <div className="flex items-center gap-2">

                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3182 8.30809C11.3182 8.67899 11.0131 8.97939 10.6364 8.97939H7.56834C7.19162 8.97939 6.88652 8.67899 6.88652 8.30809C6.88652 7.9372 7.19162 7.6368 7.56834 7.6368H10.6364C11.0131 7.6368 11.3182 7.9372 11.3182 8.30809ZM10.6364 13.0072H7.56834C7.19162 13.0072 6.88652 13.3076 6.88652 13.6785C6.88652 14.0494 7.19162 14.3498 7.56834 14.3498H10.6364C11.0131 14.3498 11.3182 14.0494 11.3182 13.6785C11.3182 13.3076 11.0131 13.0072 10.6364 13.0072ZM16.2904 5.81925L14.3864 7.69469L13.846 7.16268C13.5801 6.90086 13.148 6.90086 12.8821 7.16268C12.6162 7.4245 12.6162 7.84992 12.8821 8.11173L13.9048 9.11868C14.0378 9.24958 14.2116 9.31503 14.3864 9.31503C14.5611 9.31503 14.735 9.24958 14.8687 9.11868L17.2552 6.76903C17.5211 6.50722 17.5211 6.0818 17.2552 5.81998C16.9884 5.55733 16.5571 5.55744 16.2904 5.81925ZM16.2904 11.1896L14.3864 13.0651L13.846 12.5331C13.5801 12.2712 13.148 12.2712 12.8821 12.5331C12.6162 12.7949 12.6162 13.2203 12.8821 13.4821L13.9048 14.489C14.0378 14.6199 14.2116 14.6854 14.3864 14.6854C14.5611 14.6854 14.735 14.6199 14.8687 14.489L17.2552 12.1394C17.5211 11.8776 17.5211 11.4522 17.2552 11.1904C16.9884 10.9277 16.5571 10.9278 16.2904 11.1896ZM20.1819 3.94456V17.3705C20.1819 17.5484 20.1103 17.7196 19.9824 17.8454L15.8915 21.8732C15.7637 21.9991 15.5898 22.0696 15.4091 22.0696H5.86369C4.73613 22.0696 3.81824 21.1658 3.81824 20.0557V3.94455C3.81824 2.83439 4.73613 1.93066 5.86369 1.93066H18.1364C19.264 1.93066 20.1819 2.8344 20.1819 3.94456ZM18.5361 17.3705H16.4319C15.8677 17.3705 15.4091 17.8219 15.4091 18.3774V20.4492L18.5361 17.3705ZM18.8182 3.94456C18.8182 3.5745 18.5123 3.27327 18.1364 3.27327H5.86368C5.48782 3.27327 5.18186 3.5745 5.18186 3.94456V20.0557C5.18186 20.4257 5.48782 20.727 5.86368 20.727H14.0455V18.3773C14.0455 17.0817 15.1159 16.0277 16.432 16.0277H18.8184L18.8182 3.94456Z" fill="#191919" stroke="#191919" stroke-width="0.5" />
                      </svg>


                      <h2 className="text-[14px] lg:text-[18px] tracking-widest text-[#191919] font-semibold ">Submission checklist</h2>

                    </div>
                    <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      A checklist for all platforms where assignment submission are required.
                    </p>
                  </div>

                  <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                    <div className="flex items-center gap-2">

                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.5258 15H3.4739C1.834 15 0.5 13.6541 0.5 11.9999C0.5 10.3457 1.834 9 3.4739 9H20.5258C22.1657 9 23.5 10.3457 23.5 11.9999C23.5 13.6541 22.1657 15 20.5258 15ZM3.4739 9.51557C2.11588 9.51557 1.01111 10.63 1.01111 11.9999C1.01111 13.3698 2.11588 14.4844 3.4739 14.4844H20.5258C21.8841 14.4844 22.9889 13.3698 22.9889 11.9999C22.9889 10.63 21.8841 9.51557 20.5258 9.51557H3.4739Z" fill="#191919" stroke="black" stroke-width="0.5" />
                        <path d="M15.6149 14.8371H3.60314C2.03673 14.8371 0.766602 13.5673 0.766602 12.0006C0.766602 10.4339 2.03673 9.16406 3.60314 9.16406H15.6149C17.1815 9.16406 18.4514 10.4342 18.4514 12.0006C18.4517 13.5673 17.1815 14.8371 15.6149 14.8371Z" fill="#191919" />
                      </svg>



                      <h2 className="text-[14px] lg:text-[18px] tracking-widest text-[#191919] font-semibold ">Progress bar</h2>

                    </div>
                    <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                      A visual indicator of assignment submission progress based on required platforms.
                    </p>
                  </div>







                  {/* <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                  <p className="text-[14px] lg:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">Notification system</p>
                  <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Notifications for upcoming assignments and events.
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                  <p className="text-[14px] lg:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">Assignment widgets</p>
                  <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Upcoming assignments and submission widgets.
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                  <p className="text-[14px] lg:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">Submission checklist</p>
                  <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    A checklist for all platforms where assignment submission are required.
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                  <p className="text-[14px] lg:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">Progress bar</p>
                  <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    A visual indicator of assignment submission progress based on required platforms.
                  </p>
                </div> */}


                </div>


              </div>

              <p className="my-6 text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]">
                The widget approach stood out because it solved both HMW statements without requiring any change in behaviour or an extra page to visit. Especially since we already had a status section on assignment pages.
              </p>

            </motion.div>
          </section>


          {/* ── Design & Testing ── */}
          <section id="DesignTesting" >
            <motion.div className="grid grid-cols-1 " {...fadeUp(0.1)}>
              <SectionIntro className="mb-4" label="Design & Testing" title="Two prototypes, tested comparatively">
                  <p className="font-medium text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]">I explored alternative designs around three questions: where should the widgets live, how should they look and what information should they show. From sketches I built two prototypes for each widget then ran comparative usability tests with students to observe: where they hesitated, what was unclear and which version gave them more confidence.</p>
              </SectionIntro>

              <div className="space-y-16 mt-8">
                <Carousel slides={DESIGNSLIDES} />
                <Carousel slides={TESTINGSLIDES} />
              </div>


              <p className="my-6 text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]">
                I iterated based on usability findings, then aligned with the PM to confirm the design solved our problem statement and was feasible before handing off to development. Handoff included full specifications for all states (i.e incomplete, submitted, graded, overdue). As development progressed, I reviewed builds to flag anything that deviated from the intended experience before the widgets went live.
              </p>


              <div className="mt-6">
                <ImageCard seed={Assets.Designtestingone} className="w-full" />
                <ImageCard seed={Assets.Designtestingtwo} className="w-full hidden lg:block" />
                <ImageCard seed={Assets.Designtestingtwomobile} className="w-full my-3 lg:hidden" />
              </div>

            </motion.div>
          </section>


          {/* ── Impact ── */}
          <section id="Impact">
            <motion.div className="grid grid-cols-1 " {...fadeUp(0.1)}>
              <SectionIntro className="mb-4" label="Impact" title="Validating the Solution">
                  <p className="font-medium text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]" >We launched assignment widgets in time for the January term. After a couple months we carried out a follow up survey and interviews to evaluate the solution.</p>
              </SectionIntro>

              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                  <p className="text-[14px] lg:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">3.97/5</p>
                  <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Rating in students confidence that they know which assignments are due when across all courses.
                  </p>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                  <p className="text-[14px] lg:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">3.97/5</p>
                  <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Rating in students confidence that they know which assignments are due when across all courses.
                  </p>
                </div>

              </div>


              <p className="my-2 text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]">
                From the follow up interviews with 5 students:
              </p>


              <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                  <p className="text-[14px] lg:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">3.97/5</p>
                  <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Rating in students confidence that they know which assignments are due when across all courses.
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                  <p className="text-[14px] lg:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">3.97/5</p>
                  <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Rating in students confidence that they know which assignments are due when across all courses.
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                  <p className="text-[14px] lg:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">3.97/5</p>
                  <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Rating in students confidence that they know which assignments are due when across all courses.
                  </p>
                </div>

                <div className="bg-[#F9FAFB] border border-[#E5E5E5] p-4 lg:p-8 ">
                  <p className="text-[14px] lg:text-[24px] tracking-widest text-[#5D5FEF] font-bold mb-3">3.97/5</p>
                  <p className="text-[14px] lg:text-[16px] font-medium leading-6.75 text-[#6A6A6A]">
                    Rating in students confidence that they know which assignments are due when across all courses.
                  </p>
                </div>


              </div>

              <p className="my-6 text-[14px] lg:text-[18px] leading-6.75 text-[#3D3D4E]">
                Before the redesign students had to navigate into every individual course to find upcoming assignments. After launching the upcoming assignments widget 47% of students surveyed rarely or never needed to. Instructors also reported fewer students saying the forgot as their reason for submitting late.
              </p>

            </motion.div>


          </section>


          {/* ── Reflections ── */}
          {/* <section id="Reflections">
            <motion.div {...fadeUp(0.1)}>
              <SectionIntro className="mb-4" label="Reflections" title="What stood out looking back" />


              <div className="space-y-5 max-w-2xl">
                <LearnItem icon="🏫" text="Being at the same institution as our users was a significant advantage, feedback was quick to gather and grounded in real, ongoing experiences rather than recalled frustrations." />
                <Divider variant="gradient" className="my-4" />
                <LearnItem icon="🔀" text="Combining three feedback sources meant no single source carried too much weight. Each answered a different question: what were the issues, how widespread were they and what was causing them." />
                <Divider variant="gradient" className="my-4" />
                <LearnItem icon="📌" text="The submission status widget was scoped to the two platforms assignments are always required to be submitted on. Students submitting on additional platforms still experienced some uncertainty. Full platform coverage became a clear priority for the next iteration." />
                <Divider variant="gradient" className="my-4" />
                <LearnItem icon="🤔" text='Post launch feedback showed students wanted visibility beyond the next 5 upcoming assignments. We decided it would be worth coming back later on to figure out whether to expose more upcoming assignments or extend the upcoming assignments widget beyond assignments to "upcoming events".' />
              </div>
            </motion.div>
          </section> */}

        </main>
        
      </div>
      <Footer isDetail={true} onClick={() => navigate("/time-study")}
        description="Helping healthcare practitioners track their time so they can be appropriately reimbursed by the government"
      />
    </div>
  );
};

export default KiboSchool;
