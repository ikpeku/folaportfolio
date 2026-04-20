import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../component/landingpage/Hero";
import type { Transition } from "framer-motion";
import Assets from "../assets";
import Footer from "../component/Footer";

const PaperPlaneEmoji = ({icon}) => (
  <span aria-hidden className="inline-block ml-1 translate-y-px">{icon}</span>
);

const scrollFadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: "easeOut" } as Transition,
};

// ——————————————————— Section components ———————————————————

const SelectedProjectsHeader = ({icon, title}) => (
  <motion.h2 className="text-[20px] font-semibold mt-16" {...scrollFadeUp}>
    {title} <PaperPlaneEmoji icon={icon} />
  </motion.h2>
);

const ProjectBlock: React.FC<{
  title: string;
  dates: string;
  description: string;
  href?: string;
  children: React.ReactNode;
}> = ({ title, dates, description, href, children }) => (
  <motion.article className="relative mt-16 group cursor-pointer" {...scrollFadeUp}>
    {href && <Link to={href} className="absolute inset-0 z-10" aria-label={title} />}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5">
      <div>
         <div className="flex items-center gap-3">
      <h3 className="text-[24px] font-semibold">{title}</h3>
      <div className="flex justify-center items-center border-2 text-[#191919] font-bold border-[#191919] rounded-full w-8 h-8 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        →
      </div>
    </div>


        <div className="text-[16px] text-[#808080] font-semibold mt-0.5">{dates}</div>
      </div>
      <p className="text-[20px] font-medium text-[#191919] max-w-md md:justify-self-end leading-7.5">
        {description}
      </p>
    </div>
    <div
     className="transition-transform duration-500 group-hover:scale-[1.03]"
    >
    {children}
    </div>
  </motion.article>
);

const OtherProjectCard: React.FC<{
  title: string;
  dates: string;
  description: string;
  src: string;
  href?: string;
}> = ({ title, dates, description, src, href }) => (
  <motion.div className="relative group cursor-pointer" {...scrollFadeUp}>
    {href && <Link to={href} className="absolute inset-0 z-10" aria-label={title} />}
    <div className="flex items-center gap-3">
      <h3 className="text-[24px] font-semibold">{title}</h3>
      <div className="flex justify-center items-center border-2 text-[#191919] font-bold border-[#191919] rounded-full w-8 h-8 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        →
      </div>
    </div>

    <div className="text-[16px] text-[#808080] font-semibold mt-0.5">{dates}</div>
    <p className="text-[20px] font-medium mt-3 leading-7.5 max-w-md">{description}</p>

    <div className="mt-4 aspect-16/10 rounded-sm overflow-hidden">
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] group-hover:-skew-y-1"
      />
    </div>
  </motion.div>
);



// ——————————————————— Page ———————————————————

const LandingPage: React.FC = () => (
  <div className="w-full">
    <Hero />

    <SelectedProjectsHeader title={"Selected Projects"} icon={"🚀"} />

    <ProjectBlock
      title="Kibo School"
      dates="Oct 2022 - Apr 2024"
      description="Designing a learning platform to support a fully remote BSc. Computer Science Degree."
      href="/kibo-school"
    >
      <img src={Assets.Kiboschool} alt="" className="w-full h-full max-h-155 object-cover" />
    </ProjectBlock>

    <ProjectBlock
      title="Time Study Inc"
      dates="Jan 2020 - Feb 2021"
      description="Helping healthcare practitioners track their time so they can be appropriately reimbursed by the government."
      href="/time-study"
    >
      <img src={Assets.Timestudy} alt="" className="w-full h-full max-h-155 object-cover" />
    </ProjectBlock>

    <ProjectBlock
      title="Behold"
      dates="Dec 2019 - Jan 2021"
      description="Helping Christians maintain consistent prayer practice through daily guided prayers & meditations."
      href="/behold"
    >
      <img src={Assets.Beholdshot} alt="" className="w-full h-full max-h-155 object-cover" />
    </ProjectBlock>

    
    <SelectedProjectsHeader title={"Other Projects"} icon={"✈️"} />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
      <OtherProjectCard
        title="Rukah"
        dates="Jan 2023 - Aug 2024"
        description="Building a wedding vendor discovery and review platform from the ground up."
        src={Assets.Rukahshot}
        href="/rukah"
      />
      <OtherProjectCard
        title="Undisclosed School in New York"
        dates="Jun 2025 - Jul 2025"
        description="Experimental design for an AI professional development platform to help educators grow."
        src={Assets.Zenithshot}
        href="/zenith"
      />
    </div>
       <Footer  />
  </div>
);

export default LandingPage;
