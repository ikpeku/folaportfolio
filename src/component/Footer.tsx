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


const AnimatedLogo = ({ className }: { className?: string }) => (
  <motion.div
    className={cn("relative inline-block", className)}
    variants={logoVariants}
    initial="rest"
    whileHover="hover"
    animate="rest"
  >
    <Assets.Logo />
  </motion.div>
);

const Footer = ({
  reversed = false,
  isDetail = false,
  onClick,
  description,
   avatartype="non-space" 
}: {
  description?: string;
  reversed?: boolean;
  isDetail?: boolean;
  onClick?: () => void;
  avatartype?: "space" | "non-space"
}) => (
  // pt-16 lg:mt-32 lg:pt-32  
  <footer
    className={cn(
      `mt-20 
      h-101.5 lg:h-143.25
      flex flex-col justify-end lg:flex-row lg:items-end
      [border-top:none] bg-[repeating-linear-gradient(90deg,#B1B1B8_0,#B1B1B8_4px,transparent_4px,transparent_8px)] bg-size-[100%_1px] bg-top bg-no-repeat 
      `,
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

    <div className={cn(" flex  lg:my-0 lg:justify-center", reversed ? "justify-end" : "justify-start")}>
     {/* w-1/3 lg:w-full max-h-112.75 max-w-sm lg:max-w-full */}
      <img
        src={avatartype ==  "space" ? Assets.Footerbannershot : Assets.HeroBanner}
        alt="Footer banner"
        className={cn("w-33.25 h-33.25 lg:w-101.25 lg:h-113 rounded-xl object-contain", )}
      />
      {/* reversed && "scale-x-[-1]" */}
    </div>
{/* my-4 lg:my-10  */}
    {!isDetail && (
      <div
        className={cn(
          " my-6 lg:my-27  flex flex-wrap items-center gap-6 lg:flex-1 ",
          !reversed
            ? " lg:justify-end"
            : "lg:justify-start",
        )}
      >
        {reversed && <AnimatedLogo className="hidden lg:block mr-12" />}
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
       {!reversed && <AnimatedLogo className="hidden lg:block ml-12" />}
      </div>
    )}

    <div>

      <div className={cn("flex", !reversed
            ? "justify-end"
            : "justify-start",)}>
      <AnimatedLogo className={cn("mt-16.5 mb-4.5 lg:hidden",)} />
      </div>
    </div>
  </footer>
);

export default Footer;
