import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Assets from "../../assets";
import { LinkChip } from "../../utils/LinkChip";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

const Hero = () => (
  <section id="home" className="flex gap-2 flex-col-reverse lg:flex-row lg:items-start lg:gap-10 pt-14 lg:pt-38.75 pb-16.5 lg:mb-0 lg:pb-px [border-bottom:none] bg-[repeating-linear-gradient(90deg,#B1B1B8_0,#B1B1B8_4px,transparent_4px,transparent_8px)] bg-size-[100%_1px] bg-bottom bg-no-repeat ">
    <div className="space-y-2 lg:space-y-8 mt-2 lg:mb-10 lg:my-10 lg:max-w-1/2">
      <motion.p
        className="font-medium leading-7.5 text-[20px] lg:text-[24px] lg:leading-9 "
        {...fadeUp(0.15)}
      >
        I'm a generalist product designer focused on creating simple, intuitive and visually appealing user experiences.
      </motion.p>
      
      <motion.div className="mt-5 flex flex-wrap gap-6" {...fadeUp(0.28)}>
        <LinkChip icon={<Assets.ResumeIcon />} label="Resume" href="https://drive.google.com/file/d/1rtFla6HYYecrwvXsFqgdXbHrvFb1B-Ni/view" />
        <LinkChip icon={<Assets.LinkedInIcon />} label="LinkedIn" href="https://www.linkedin.com/in/folarin-lawal/" />
        <LinkChip icon={<Assets.EmailIcon />} label="Email" href="mailto:lawal.folarin@gmail.com" />
      </motion.div>
    </div>

    <motion.div className="max-w-1/2 lg:ml-auto  lg:self-end lg:flex lg:items-end " {...fadeUp(0.2)}>
      <img
        src={Assets.HeroBanner}
        alt="Hero banner"
        className="w-33.25 h-33.25 lg:w-101.25 lg:h-113 "
      />
    </motion.div>
  </section>
);

export default Hero;
