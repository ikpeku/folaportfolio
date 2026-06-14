import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: "easeOut" } as Transition,
};

interface DividerProps {
  className?: string;
  variant?: "gradient" | "dashed";
}

const Divider = ({ className = "my-16", variant = "dashed" }: DividerProps) => {
  const styles =
    variant === "gradient"
      ? "h-1 [border-bottom:none] bg-[repeating-linear-gradient(90deg,#B1B1B8_0,#B1B1B8_4px,transparent_4px,transparent_8px)] bg-size-[100%_1px] bg-bottom bg-no-repeat"
      : "border-t border-dashed border-neutral-200";

  return <motion.div className={`${styles} ${className}`} {...fadeUp} />;
};

export default Divider;
