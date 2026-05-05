import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Assets from "../assets";
import { LinkChip } from "../utils/LinkChip";

const cn = (...inputs: Parameters<typeof clsx>) => twMerge(clsx(inputs));

const ease = [0.4, 0, 0.2, 1] as const;

const logoVariants = {
  rest: { scale: 1, transition: { duration: 0.35, ease } },
  hover: { scale: 1.04, transition: { duration: 0.35, ease } },
};

const logoUnderlineVariants = {
  rest: { bottom: 2, transition: { duration: 0.35, ease } },
  hover: { bottom: -8, transition: { duration: 0.35, ease } },
};

const AnimatedLogo = ({ className }: { className?: string }) => (
  <motion.div
    className={cn("relative inline-block", className)}
    variants={logoVariants}
    initial="rest"
    whileHover="hover"
  >
    <Assets.Logo className="h-8 w-auto" />
    <motion.span
      className="absolute left-0 h-0.5 bg-[#191919]"
      style={{ width: "100%" }}
      variants={logoUnderlineVariants}
    />
  </motion.div>
);

const Footer = ({
  reversed = false,
  isDetail = false,
  onClick,
  description,
}: {
  description?: string;
  reversed?: boolean;
  isDetail?: boolean;
  onClick?: () => void;
}) => (
  <footer
    className={cn(
      "mt-24 pt-12 border-t border-dashed border-[#B1B1B8] flex flex-col lg:flex-row lg:items-end",
      reversed && "lg:flex-row-reverse",
    )}
  >
    {isDetail && (
      <div className="flex-1 ">
        <button onClick={onClick} className="group mb-6 ">
          <div className="bg-[#3D3D4E1F] px-4 py-2 rounded-3xl group-hover:bg-[#3D3D4E] inline-flex items-center gap-1.5 text-[13px] text-[#3D3D4E] hover:text-white transition-colors">
            <span className="-translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              Next Project
            </span>
            <div className="flex justify-center items-center border-2 font-bold border-[#3D3D4E] group-hover:border-white rounded-full w-6 h-6">
              →
            </div>
          </div>
        </button>
        <p className="font-semibold text-[20px] lg:max-w-xl">{description}</p>

        <div className="flex">
          <AnimatedLogo className="mt-28 mb-8 hidden lg:block" />
        </div>
      </div>
    )}

    <div className={cn("flex my-4 lg:my-0 lg:justify-center", reversed ? "justify-end" : "justify-start")}>
      <img
        src={Assets.Footerbannershot}
        alt="Footer banner"
        className={cn("w-1/3 lg:w-full max-h-112.75 max-w-sm md:max-w-full rounded-xl object-contain", reversed && "scale-x-[-1]")}
      />
    </div>

    {!isDetail && (
      <div
        className={cn(
          "my-10 flex flex-wrap items-center gap-4 flex-1 ",
          !reversed
            ? "justify-center lg:justify-end"
            : "justify-center lg:justify-start",
        )}
      >
        <LinkChip
          icon={<Assets.ResumeIcon />}
          label="Resume"
          href="https://drive.google.com/file/d/1rtFla6HYYecrwvXsFqgdXbHrvFb1B-Ni/view"
        />
        <LinkChip
          icon={<Assets.LinkedInIcon />}
          label="LinkedIn"
          href="https://www.linkedin.com/in/folarin-lawal/"
        />
        <LinkChip
          icon={<Assets.EmailIcon />}
          label="Email"
          href="mailto:lawal.folarin@gmail.com"
        />
        <AnimatedLogo className="hidden lg:block" />
      </div>
    )}

    <div>
      <AnimatedLogo className="mb-8 lg:hidden" />
    </div>
  </footer>
);

export default Footer;
