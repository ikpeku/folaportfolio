import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../component/landingpage/Hero";
import type { Transition } from "framer-motion";
import Assets from "../assets";
import Footer from "../component/Footer";

const PaperPlaneEmoji = ({ icon }: { icon: React.ReactNode }) => (
  <span aria-hidden className="inline-block ml-1 translate-y-px">{icon}</span>
);





const scrollFadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: "easeOut" } as Transition,
};

// ——————————————————— Section components ———————————————————

const SelectedProjectsHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <motion.h2 className=" text-[18px] lg:text-[20px] font-semibold  lg:mt-32 lg:mb-24 " {...scrollFadeUp}>
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
  <motion.article className="relative mb-16.5 lg:mt-26 lg:mb-16 group cursor-pointer overflow-hidden" {...scrollFadeUp}>
    {href && <Link to={href} className="text-[20px] lg:text-[24px] font-semibold text-[#191919]   absolute inset-0 z-10" aria-label={title} />}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-[20px] lg:text-[24px] font-semibold">{title}</h3>
          <div className=" opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">

            <Assets.ArrowCircleRight />
          </div>
        </div>

        <div className="text-[14px] lg:text-[16px] text-[#808080] font-semibold mt-0.5">{dates}</div>
      </div>
      <p className="text-[16px] lg:text-[20px] font-medium text-[#191919]  lg:justify-self-end leading-6 tracking-[0%] lg:tracking-normal lg:leading-7.5">
        {description}
      </p>
    </div>
    <div className="rounded-xl overflow-hidden">
      <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03]">
        {children}
      </div>
    </div>
  </motion.article>
);

const OtherProjectCard: React.FC<{
  title: string;
  dates: string;
  description: string;
  src: string;
  srcSet?: string;
  href?: string;
}> = ({ title, dates, description, src, srcSet, href }) => (
  <motion.div
    className="relative group cursor-pointer"
    {...scrollFadeUp}
  >
    {href && <Link to={href} className="text-[20px] lg:text-[24px] font-semibold text-[#191919] absolute inset-0 z-10" aria-label={title} />}
    <div className="grid grid-cols-1  gap-4 lg:gap-6 mb-6 lg:mb-8">

      <div>
        <div className="flex items-center gap-3">
          <h3 className="text-[20px] lg:text-[24px] font-semibold">{title}</h3>
          <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <Assets.ArrowCircleRight />
          </div>
        </div>
        <div className="text-[14px] lg:text-[16px] text-[#808080] font-semibold mt-0.5">{dates}</div>

      </div>

      <p className="text-[16px] lg:text-[20px] font-medium text-[#191919]  lg:justify-self-end leading-6 tracking-[0%] lg:tracking-normal lg:leading-7.5">
        {description}
      </p>
    </div>

    <div className=" rounded-xl overflow-hidden aspect-16/10">
      <img
        src={src}
        srcSet={srcSet}
        alt=""
        className="w-full h-full object-cover transition-transform duration-100 group-hover:scale-[1.03] group-hover:-skew-y-1"
      />
    </div>
  </motion.div>
);



// ——————————————————— Page ———————————————————

const LandingPage: React.FC = () => (
  <div className="w-full ">
    <Hero />




    <div className="mt-16.5 mb-11" >
      <SelectedProjectsHeader title={"Selected Projects"} icon={<img src={Assets.SelectProjectOmoji} alt="" className="inline-block w-12 h-12 lg:w-16 lg:h-16" />} />
    </div>

    <ProjectBlock
      title="Kibo School"
      dates="Oct 2022 - Apr 2024"
      description="Designing a learning platform to support a fully remote BSc. Computer Science Degree."
      href="/kibo-school"
    >
      <img src={Assets.Kiboschool4x}
        // srcSet={Assets.KiboschoolSrcSet}
        alt="" className="w-full h-full max-h-155 object-cover" />
    </ProjectBlock>

    <ProjectBlock
      title="Time Study Inc"
      dates="Jan 2020 - Feb 2021"
      description="Helping healthcare practitioners track their time so they can be appropriately reimbursed by the government."
      href="/time-study"
    >
      <img src={Assets.Timestudy4x}
        // srcSet={Assets.TimestudySrcSet}
        alt="" className="w-full h-full max-h-155 object-cover" />
    </ProjectBlock>

    <ProjectBlock
      title="Behold"
      dates="Dec 2019 - Jan 2021"
      description="Helping Christians maintain consistent prayer practice through daily guided prayers & meditations."
      href="/behold"
    >
      <img src={Assets.Beholdshot4x}
        // srcSet={Assets.BeholdshotSrcSet}
        alt="" className="w-full h-full max-h-155 object-cover" />
    </ProjectBlock>


    <SelectedProjectsHeader title={"Other Projects"} icon={<img src={Assets.OtherProjectOmoji} alt="" className="inline-block w-12 h-12 lg:w-16 lg:h-16" />} />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
      <OtherProjectCard
        title="Rukah"
        dates="Jan 2023 - Aug 2024"
        description="Building a wedding vendor discovery and review platform from the ground up."
        src={Assets.Rukahshot4x}
        // srcSet={Assets.RukahshotSrcSet}
        href="/rukah"
      />
      <OtherProjectCard
        title="Undisclosed School in New York"
        dates="Jun 2025 - Jul 2025"
        description="Experimental design for an AI professional development platform to help educators grow."
        src={Assets.Zenithshot4x}
        // srcSet={Assets.ZenithshotSrcSet}
        href="/zenith"
      />
    </div>
    <Footer reversed={false} avatartype="space" />
  </div>
);

export default LandingPage;
