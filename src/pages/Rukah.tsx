import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Assets from "../assets";
import Footer from "../component/Footer";
import { useNavigate } from "react-router";
import BackButton from "../utils/BackButton";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

// ── Info row in left sidebar ──────────────────────────────────

const InfoBlock = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <p className="text-[14px] tracking-widest text-[#808080] font-semibold uppercase mb-1">{label}</p>
    <div className="text-[18px] leading-6.75 text-[#191919] font-medium">{children}</div>
  </div>
);

// ── ImageCard ─────────────────────
const ImageCard = ({ caption, url = "zenith.app", className }: { caption: string; url?: string, className?: string }) => (
  <motion.div className="w-full" {...fadeUp(0)}>
    <div className={`overflow-hidden ${className}`}>
      {url.endsWith(".mp4") ? (
        <video
          src={url}
          autoPlay
          loop
          muted
          playsInline
          aria-label={caption}
          className="w-full h-full object-center"
        />
      ) : (
        <img src={url} alt="" className="w-full h-full object-center" />
      )}
    </div>
    <p className="text-center text-[14px] lg:text-[16px] font-semibold max-w-md mx-auto leading-6">{caption}</p>
  </motion.div>
);

const SCREENS = [
  {
    url: Assets.Rukahseachvendor, caption: "Search for vendors or view vendors by category",
  },
  {
    url: Assets.Rukahvendorinfo,
    caption: "View vendor information & user generated reviews",
  },
  {
    url: Assets.Rukahaddreviews,
    caption: "Add reviews",
  },
  {
    url: Assets.Rukahaddvendor,
    caption: "Admins & users can add vendors",
  },
  {
    url: Assets.Rukahapprovevendor,
    caption: "Admins can verify & approve vendors added by users",
  },
];

// ═══════════════════════════════════════════════════════════════
const Rukah = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-10 lg:pt-16">

      <div className="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-20 items-start">

        {/* ── Left: sticky info sidebar ── */}
        <aside className="hidden lg:flex lg:col-span-4 shrink-0 sticky top-10 self-start flex-col gap-5">

          <motion.h1 className="text-[28px] lg:text-[32px] font-semibold text-[#191919] " {...fadeUp(0.08)}>
            Rukah
          </motion.h1>


          <BackButton className="w-fit mt-6 mb-4" />

          <motion.div className="flex flex-col gap-4" {...fadeUp(0.12)}>
            <InfoBlock label="Role">
              Product Manager & Product Designer
            </InfoBlock>

            <InfoBlock label="Team">
              1 Product Owner & 2 Full Stack Developers
            </InfoBlock>

            <InfoBlock label="Duration">
              18 Months
            </InfoBlock>

            <InfoBlock label="Company">
              Rukah – building a community of vetted wedding vendors, couples getting married & newly weds.
            </InfoBlock>

            <InfoBlock label="Scope">
              Led product strategy and product design. Conducted user research, scoped MVP features, designed the complete platform (vendor discovery, reviews, admin moderation) & managed development to launch.
            </InfoBlock>

            <InfoBlock label="Approach">
              Product Research, Feature Prioritization, Roadmap Planning, UI Design, Usability Testing, Project Planning, Developer handoff & Development Support, Progress Tracking, QA Testing.
            </InfoBlock>

            <InfoBlock label="Impact">
              <ul className="space-y-2 mt-1">
                <li className="flex gap-2 items-start">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#3D3D4E] shrink-0" />
                  <p> Launched August 2024 as Nigeria's first dedicated wedding vendor review platform.</p>
                 
                </li>
                <li className="flex gap-2 items-start">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#3D3D4E] shrink-0" />
                  <p><strong>30+ verified vendors</strong> added in first month.</p>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#3D3D4E] shrink-0" />
                  <p>Created accountability framework in an industry with zero transparency.</p>
                </li>
              </ul>
            </InfoBlock>
          </motion.div>

        </aside>

        {/* ── Right: laptop mockups ── */}
        <main className="lg:col-span-8 min-w-0 flex flex-col">

          {/* Mobile: title + back (shown only on small screens) */}
          <div className="lg:hidden mb-2">
            <BackButton className="mb-4" animated={false} />
            <h1 className="text-[28px] font-bold text-[#191919] mb-2">Rukah</h1>
          </div>

          {SCREENS.map((i) => (
            <ImageCard key={i.caption} caption={i.caption} url={i.url} />
          ))}

        </main>

      </div>

      <Footer isDetail={true} onClick={() => navigate("/zenith")}
      description="Designing an AI professional development platform to help educators grow."
      />
    </div>
  );
};

export default Rukah;
