import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Footer from "../component/Footer";
import Assets from "../assets";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

const ComingSoon = () => (
  <span className="inline-flex items-center gap-2  rounded-full px-3 py-1.5 text-[13px] font-medium text-[#191919] bg-[#F3F4F6]">
    <span className="w-2 h-2 rounded-full bg-[#05A3C7] inline-block " />
    Coming Soon
  </span>
);

type MetaProps = {
  stage: string;
  platform: string;
  buildingWith: string;
};

const Meta = ({ stage, platform, buildingWith }: MetaProps) => (
  <div className="mt-6 space-y-3">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-[#808080] font-semibold">Stage</p>
        <p className="text-[14px] font-medium mt-1">{stage}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-[#808080] font-semibold">Platform</p>
        <p className="text-[14px] font-medium mt-1">{platform}</p>
      </div>
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-widest text-[#808080] font-semibold">Building With</p>
      <p className="text-[14px] font-medium mt-1">{buildingWith}</p>
    </div>
  </div>
);

const projects = [
  {
    title: "Getting early signals on how well designs perform against user goals.",
    body: "Getting meaningful feedback on designs usually means planning and running user testing sessions, synthesising the results, then sharing findings - the process takes weeks. Working on a design critique tool that lets me test early designs against simulated user personas so I can test more refined ideas/concepts/designs with real people.",
    stage: "Web App is live & being tested",
    platform: "Web App",
    buildingWith: "Claude AI, Claude API, React, Supabase & Vercel",
    imageSeed: Assets.Aidesignone,
    imageAlt: "AI Design Critique app screenshot",
    flip: false,
  },
  {
    title: "Generate multiple breakpoints from one screen to reduce the time spent on manual adaptations.",
    body: "It takes a while to adapt designs for multiple breakpoints. I haven't found a tool that works the way I want. I'm exploring how I can use Claude to build a Figma plugin that takes a single frame and generates multiple breakpoints.",
    stage: "Deployed in Figma, refining output",
    platform: "Figma Plugin",
    buildingWith: "Claude AI, Claude API, Figma Plugin API & JavaScript",
    imageSeed: Assets.Aidesigntwo,
    imageAlt: "Figma breakpoint plugin screenshot",
    flip: true,
  },
];

const DesignAI = () => (
  <div className="py-16 md:py-20">

    {/* ── Intro ── */}
    <motion.p
      className="text-[22px] md:text-[24px] font-medium leading-snug max-w-xl"
      {...fadeUp(0.1)}
    >
      Exploring how A.I can sharpen the design process — for myself, other designers and the cross-functional teams we work closest with 🤖
    </motion.p>

    {/* ── Divider ── */}
    <motion.div className="my-14 border-t border-dashed border-neutral-300" {...fadeUp(0.15)} />

    {/* ── Projects ── */}
    <div className="space-y-24">
      {projects.map((p, i) => (
        <motion.div
          key={i}
          className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${p.flip ? "md:[&>*:first-child]:order-2" : ""}`}
          {...fadeUp(0.1)}
        >
          {/* Text */}
          <div>
            <h2 className="text-[18px] md:text-[20px] font-semibold leading-snug">{p.title}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[#3D3D4E]">{p.body}</p>
            <Meta stage={p.stage} platform={p.platform} buildingWith={p.buildingWith} />
            <div className="mt-6">
              <ComingSoon />
            </div>
          </div>

          {/* Image */}
          <div className="rounded-xl overflow-hidden bg-neutral-900 aspect-16/10 relative">
            <img
              src={p.imageSeed}
              alt={p.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      ))}
    </div>

    <Footer reversed={true} />

  </div>
);

export default DesignAI;
