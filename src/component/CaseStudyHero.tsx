import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Divider from "./Divider";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] lg:text-[14px] tracking-widest text-[#6A6A6A] font-semibold">{children}</p>
);

interface CaseStudyHeroProps {
  banner: string;
  bannerAlt?: string;
  title: string;
  company: string;
  dateRange: string;
  role: string;
  team: string;
}

const CaseStudyHero = ({
  banner,
  bannerAlt = "",
  title,
  company,
  dateRange,
  role,
  team,
}: CaseStudyHeroProps) => (
  <div>
    <motion.div {...fadeUp(0.05)}>
      <div className="w-full aspect-16/8 bg-neutral-100 rounded-xl overflow-hidden">
        <img src={banner} alt={bannerAlt} className="w-full h-full object-cover" />
      </div>
    </motion.div>

    <motion.div className="mt-10" {...fadeUp(0.1)}>
      <h1 className="text-[28px] lg:text-[36px] font-medium leading-tight italic">{title}</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:mt-5 mt-6">
        <div>
          <p className="text-[14px] font-semibold text-[#3D3D4E]">{company}</p>
          <p className="text-[14px] lg:text-[16px] font-semibold text-[#6A6A6A] mt-1">{dateRange}</p>
        </div>
        <div>
          <SectionLabel>ROLE</SectionLabel>
          <p className="text-[14px] lg:text-[18px] font-medium leading-snug mt-1">{role}</p>
        </div>
        <div>
          <SectionLabel>TEAM</SectionLabel>
          <p className="text-[14px] lg:text-[18px] font-medium leading-snug mt-1">{team}</p>
        </div>
      </div>
    </motion.div>

    <Divider variant="gradient" className="my-16" />
  </div>
);

export default CaseStudyHero;
