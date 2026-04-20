import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export interface CarouselSlide {
  src: string;
  title: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  slideWidthPct?: number;
  gapPx?: number;
  autoplayMs?: number;
  accentColor?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  slideWidthPct = 70,
  gapPx = 50,
  autoplayMs = 3000,
  accentColor = "#4522A9",
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => setIndex(Math.max(0, Math.min(slides.length - 1, next))),
    [slides.length]
  );

  const goWrap = useCallback(
    (next: number) => setIndex(((next % slides.length) + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goWrap(index + 1), autoplayMs);
    return () => clearInterval(id);
  }, [index, paused, goWrap, autoplayMs]);

  return (
    <div
      className="w-full select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-xl">
        <motion.div
          className="flex"
          style={{ gap: gapPx }}
          animate={{ x: `calc(-${index} * (${slideWidthPct}% + ${gapPx}px))` }}
          transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
        >
          {slides.map((s, i) => (
            <div
              key={s.title}
              className="shrink-0 rounded-xl overflow-hidden border-3"
              style={{ width: `${slideWidthPct}%`, borderColor: accentColor }}
            >
              <div className="aspect-video bg-neutral-100 overflow-hidden">
                <img
                  src={s.src}
                  alt={s.title}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    i !== index ? "scale-[1.04] brightness-75" : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <p className="text-center text-[16px] text-[#262626] font-semibold mt-4">
        {slides[index].title}
      </p>

      <div className="relative flex items-center justify-center mt-3">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === index ? "w-5 h-2 bg-[#5D5FEF]" : "w-2 h-2 bg-[#5D5FEF]/20 hover:bg-[#5D5FEF]/50"
              }`}
            />
          ))}
        </div>

        <div className="absolute right-0 flex gap-2">
          <button
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="w-8 h-8 rounded-full border border-neutral-200 bg-white hover:bg-[#3D3D4E] disabled:opacity-30 flex items-center justify-center text-[#191919] hover:text-white text-sm font-bold transition-all"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={() => go(index + 1)}
            disabled={index === slides.length - 1}
            className="w-8 h-8 rounded-full border border-neutral-200 bg-white hover:bg-[#3D3D4E] disabled:opacity-30 flex items-center justify-center text-[#191919] hover:text-white text-sm font-bold transition-all"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
