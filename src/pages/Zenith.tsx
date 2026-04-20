import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Footer from "../component/Footer";
import { useNavigate } from "react-router";
import Assets from "../assets";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

const InfoBlock = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <p className="text-[14px] tracking-widest text-[#808080] font-semibold uppercase mb-1">{label}</p>
    <div className="text-[18px] leading-6.75 text-[#191919] font-medium">{children}</div>
  </div>
);

const ImageCard = ({ caption, url = "zenith.app", className }: { caption: string; url?: string , className?: string}) => (
  <motion.div className="w-full" {...fadeUp(0)}>
  <div className={`overflow-hidden ${className}`}>
    <img src={url} alt="" className="w-full h-full object-center" />
  </div>
    <p className="text-center text-[14px] md:text-[16px] font-semibold max-w-md mx-auto leading-6">{caption}</p>
  </motion.div>
);

const SCREENS = [
  {
    url: Assets.Zenithone, caption:  "Teachers can add recorded classroom sessions (observations) and request feedback",
  },
  {
    url: Assets.Zenithtwo,
    caption: "Teachers can view completed observations with feedback from their Principal or Assistant Principal",

  },
  {
    url: Assets.Zeniththree,
    caption: "Principals & Assistant Principals can add observations then auto generate feedback with the option to edit or delete",

  },
  {
    url: Assets.Zenithfour,
    caption: "Principal & Assistant Principals can view auto generated feedback for observations requested by teachers - they can also add custom feedback",

  }
 
];

// ═══════════════════════════════════════════════════════════════
const Zenith = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-10 md:pt-16">

      <div className="flex gap-12 lg:gap-20 items-start">

        {/* ── Left: sticky info sidebar ── */}
        <aside className="hidden md:flex shrink-0 sticky top-10 self-start w-56 lg:w-64 flex-col gap-5">


          <motion.h1 className="text-[28px] lg:text-[32px] font-semibold text-[#191919] " {...fadeUp(0.08)}>
            Zenith
          </motion.h1>


          <motion.button onClick={() => navigate(-1)} className="group flex w-fit mt-6 mb-4" {...fadeUp(0.05)}>
            <div className="bg-[#3D3D4E1F] px-4 py-2 rounded-3xl group-hover:bg-[#3D3D4E] inline-flex items-center gap-1.5 text-[13px] text-[#3D3D4E] hover:text-white transition-colors">
              <div className="flex justify-center items-center border-2 font-bold border-[#3D3D4E] group-hover:border-white rounded-full w-6 h-6">←</div>
              <span className="translate-x-2 group-hover:translate-x-0 transition-all duration-300">Back</span>
            </div>
          </motion.button>

         

          <motion.div className="flex flex-col gap-4" {...fadeUp(0.12)}>
            <InfoBlock label="Role">
              Product Designer
            </InfoBlock>

            <InfoBlock label="Team">
              1 Product Manager
            </InfoBlock>

            <InfoBlock label="Duration">
              2 Weeks
            </InfoBlock>

            <InfoBlock label="Company">
              Undisclosed school in New York
            </InfoBlock>

            <InfoBlock label="Scope">
              Designed & prototyped key user flows & high-impact interactions that demonstrate the core product value for an experimental AI-powered professional development platform targeting educators.
            </InfoBlock>

            <InfoBlock label="Approach">
              UI design, Interaction design
            </InfoBlock>

            <InfoBlock label="Impact">
              <ul className="space-y-2 mt-1">
                <li className="flex gap-2 items-start">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#3D3D4E] shrink-0" />
                  Enabled stakeholder alignment across technical, educational and business teams through tangible design artifacts.
                </li>
                <li className="flex gap-2 items-start">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#3D3D4E] shrink-0" />
                  Informed go/no-go investment decision by stakeholders without requiring full product development.
                </li>
              </ul>
            </InfoBlock>
          </motion.div>

        </aside>

        {/* ── Right: laptop mockups ── */}
        <main className="flex-1 min-w-0 flex flex-col ">

          {/* Mobile header */}
          <div className="md:hidden mb-2">
            <button onClick={() => navigate(-1)} className="group flex mb-4">
              <div className="bg-[#3D3D4E1F] px-4 py-2 rounded-3xl group-hover:bg-[#3D3D4E] inline-flex items-center gap-1.5 text-[13px] text-[#3D3D4E] hover:text-white transition-colors">
                <div className="flex justify-center items-center border-2 font-bold border-[#3D3D4E] group-hover:border-white rounded-full w-6 h-6">←</div>
                <span>Back</span>
              </div>
            </button>
            <h1 className="text-[28px] font-bold text-[#191919] mb-2">Zenith</h1>
          </div>

          {SCREENS.map((i) => (
            <ImageCard key={i.caption} caption={i.caption} url={i.url} />
          ))}

        </main>

      </div>

      <Footer isDetail={true} onClick={() => navigate("/kibo-school")} />
    </div>
  );
};

export default Zenith;
