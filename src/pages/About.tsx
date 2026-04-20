import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import Assets from "../assets";
import Footer from "../component/Footer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: "easeOut", delay } as Transition,
});

const processCards = [
  {
    title: "Strategy",
    body: "Understand the problem space through research and stakeholder alignment. Define user needs, business goals and success metrics to ensure we're solving the right problem before designing solutions.",
  },
  {
    title: "Iterate",
    body: "Design, prototype and test solutions continuously. Move from generated and medium-fidelity concepts to high-fidelity designs, gathering feedback along the way to refine and improve the solution.",
  },
  {
    title: "Launch",
    body: "Collaborate with development to bring designs to life. Prepare for smooth handoff by ensuring design specifications are clear then monitor implementation quality.",
  },
  {
    title: "Measure",
    body: "Track success metrics and gather user feedback post-launch. Analyze how the product performs against goals, identify areas for improvement and use insights to inform the next iteration.",
  },
];

const icebergLayers = [
  {
    title: "Surface",
    body: "Visual design, user interface, interaction design, design systems, components, brand integration, responsive design, accessibility, typography, color, high fidelity prototypes",
  },
  {
    title: "Skeleton",
    body: "Sketches, wireframes, generated concepts, medium-fidelity prototypes",
  },
  {
    title: "Structure",
    body: "Information Architecture, user flows, user journey mapping",
  },
  {
    title: "Scope",
    body: "Requirements, success metrics/KPIs, prioritization, roadmaps",
  },
  {
    title: "Strategy",
    body: "User, market & product research, stakeholder interviews, user personas, business goals alignment, value proposition, concept testing",
  },
];

const About = () => (
  <div className="pt-16 md:pt-20">

    {/* ── Bio ── */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
      <motion.div className="space-y-5 font-medium text-[20px] leading-7.5" {...fadeUp(0.1)}>
        <p>
          Hi, I'm Folarin 👋. I've been designing digital products for 9 years. I approach problems from first principles to have the best chance at implementing effective solutions.
        </p>
        <p>
          I have degrees in product design engineering and entrepreneurship which gives me a unique perspective. I understand the business realities, technical constraints and human needs that must align for products to succeed.
        </p>
        <p>
          Before designing digital products, I designed physical ones. It's interesting how both design spheres share many principles.
        </p>
        <p>
          Beyond design, I love cosmology, emerging tech and techno! 🪐🤖💃
        </p>
      </motion.div>

      <motion.div className="flex justify-center md:justify-end" {...fadeUp(0.2)}>
        <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden bg-neutral-200 shrink-0">
          <img
            src={Assets.Avatar}
            alt="Folarin Lawal"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>

    {/* ── Divider ── */}
    <motion.div
      className="my-16 border-t border-dashed border-neutral-300"
      {...fadeUp(0.1)}
    />

    {/* ── Design Process ── */}
    <motion.h2
      className="text-[24px] font-semibold text-center mb-10"
      {...fadeUp(0.1)}
    >
      Design Process ⚙️
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {processCards.map((card, i) => (
        <motion.div
          key={card.title}
          className=" rounded-lg p-5 bg-[#F9FAFB]"
          {...fadeUp(0.1 + i * 0.07)}
        >
          <p className="text-[16px] font-semibold mb-2">{card.title}</p>
          <p className="text-[14px] font-medium leading-relaxed text-[#3D3D4E] ">{card.body}</p>
        </motion.div>
      ))}
    </div>

    {/* ── Iceberg ── */}
    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 items-center">
      <motion.div className="flex justify-items-end " {...fadeUp(0.1)}>
        <img
          src={Assets.Iceshot}
          alt="Iceberg illustration"
          className="w-full max-w-sm object-cover rounded-sm sm:ml-62 z-50"
        />
      </motion.div>

      <motion.div className="space-y-6" {...fadeUp(0.2)}>
        {icebergLayers.map((layer, i) => (
          <motion.div key={layer.title} {...fadeUp(0.1 + i * 0.06)}>
            <p className="text-[14px] font-bold">{layer.title}</p>
            <p className="text-[12px] font-medium leading-relaxed text-[#6A6A6A] mt-1">{layer.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>


       <Footer reversed={true} />

  </div>
);

export default About;
