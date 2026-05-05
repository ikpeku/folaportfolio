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
  <section id="home" className="flex  flex-col-reverse md:flex-row md:items-start gap-10 pt-14 md:pt-50.75 pb-px [border-bottom:none] bg-[repeating-linear-gradient(90deg,#B1B1B8_0,#B1B1B8_16px,transparent_16px,transparent_24px)] bg-size-[100%_1px] bg-bottom bg-no-repeat">
    <div className="mt-2 mb-10 md:my-10">
      <motion.p
        className="font-medium text-[24px] leading-9 max-w-md"
        {...fadeUp(0.15)}
      >
        I'm a generalist product designer focused on creating simple, intuitive and visually appealing user experiences.
      </motion.p>
      
      <motion.div className="mt-5 flex flex-wrap gap-2" {...fadeUp(0.28)}>
        <LinkChip icon={<Assets.ResumeIcon />} label="Resume" href="https://drive.google.com/file/d/1rtFla6HYYecrwvXsFqgdXbHrvFb1B-Ni/view" />
        <LinkChip icon={<Assets.LinkedInIcon />} label="LinkedIn" href="https://www.linkedin.com/in/folarin-lawal/" />
        <LinkChip icon={<Assets.EmailIcon />} label="Email" href="mailto:lawal.folarin@gmail.com" />
      </motion.div>
    </div>

    <motion.div className="md:ml-auto" {...fadeUp(0.2)}>
      <img
        src={Assets.HeroBanner}
        alt="Hero banner"
        className="w-1/2 md:w-full md:h-96 max-w-sm md:max-w-full rounded-xl object-contain"
      />
    </motion.div>
  </section>
);

export default Hero;
