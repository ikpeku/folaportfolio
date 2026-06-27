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
      pt-22 lg:pt-0 lg:h-143.25
      flex flex-col justify-end lg:flex-row lg:items-end
      [border-top:none] bg-[repeating-linear-gradient(90deg,#B1B1B8_0,#B1B1B8_4px,transparent_4px,transparent_8px)] bg-size-[100%_1px] bg-top bg-no-repeat 
      `,
      reversed && "lg:flex-row-reverse",
    )}
  >
    {isDetail && (
      <div className="flex-1 ">
        <button onClick={onClick} className="group mb-6">
          <div className="bg-[#3D3D4E1F] px-4 py-2 rounded-3xl group-hover:bg-[#3D3D4E] inline-flex items-center gap-1.5 text-[13px] text-[#3D3D4E] group-hover:text-white transition-colors duration-200">
            <span className="-translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              Next Project
            </span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 0.75C13.5491 0.75 17.25 4.45058 17.25 9C17.25 13.5494 13.5491 17.25 9 17.25C4.45091 17.25 0.75 13.5494 0.75 9C0.75 4.45058 4.45091 0.75 9 0.75ZM9 1.87109C5.06941 1.87109 1.87109 5.06941 1.87109 9C1.87109 12.9306 5.06941 16.1289 9 16.1289C12.9306 16.1289 16.1289 12.9306 16.1289 9C16.1289 5.06941 12.9306 1.87109 9 1.87109Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <path
                d="M11.0542 8.38379C11.3642 8.3838 11.6147 8.635 11.6147 8.94434C11.6147 9.25373 11.3642 9.50487 11.0542 9.50488H6.60107C6.2911 9.50481 6.04053 9.2537 6.04053 8.94434C6.0406 8.63504 6.29114 8.38386 6.60107 8.38379H11.0542Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <path
                d="M9.37073 6.59863C9.61676 6.40821 9.96857 6.45575 10.1569 6.69922L11.6266 8.60254H11.6276C11.7866 8.80895 11.7822 9.09791 11.6178 9.2998L9.97522 11.3135L9.97424 11.3125C9.86369 11.4488 9.7024 11.5195 9.54065 11.5195C9.41578 11.5195 9.29061 11.4776 9.18713 11.3936C8.94625 11.1976 8.91066 10.8441 9.10608 10.6045L10.4674 8.93555L9.27014 7.38477C9.08095 7.13993 9.12553 6.78816 9.37073 6.59863Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </svg>
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
          " my-6 lg:my-16  flex flex-wrap items-center gap-6 lg:flex-1 ",
          !reversed
            ? " lg:justify-end"
            : "lg:justify-start",
        )}
      >
        {reversed && <AnimatedLogo className="hidden lg:block mr-6" />}
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
       {!reversed && <AnimatedLogo className="hidden lg:block ml-6" />}
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
