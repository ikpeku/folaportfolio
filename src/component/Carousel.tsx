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
                i === index
                  ? "w-5 h-2 bg-[#5D5FEF]"
                  : "w-2 h-2 bg-[#5D5FEF]/20 hover:bg-[#5D5FEF]/50"
              }`}
            />
          ))}
        </div>

        <div className="absolute right-0 flex gap-2">
          <button
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="group text-[#3D3D4E] hover:opacity-30 disabled:opacity-30 transition-colors duration-200"
            aria-label="Previous"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 38.2754C9.57881 38.2754 1.09961 29.7969 1.09961 19.375C1.09961 8.95308 9.57881 0.474609 20 0.474609C30.4212 0.474609 38.9004 8.95308 38.9004 19.375C38.9004 29.7969 30.4212 38.2754 20 38.2754ZM20 36.5186C29.4531 36.5186 37.1436 28.8281 37.1436 19.375C37.1436 9.92192 29.4531 2.23145 20 2.23145C10.5469 2.23145 2.85645 9.92192 2.85645 19.375C2.85645 28.8281 10.5469 36.5186 20 36.5186Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              <path
                d="M15.1846 20.3838C14.6991 20.3837 14.3066 19.9895 14.3066 19.5049C14.3068 19.0204 14.6992 18.6271 15.1846 18.627H25.6211C26.1066 18.627 26.4998 19.0204 26.5 19.5049C26.5 19.9896 26.1067 20.3838 25.6211 20.3838H15.1846Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              <path
                d="M18.79 24.7109C18.4112 24.9466 17.9093 24.8589 17.6328 24.501L14.1885 20.041C13.9391 19.7178 13.9452 19.266 14.2031 18.9492L18.0537 14.2305L18.0527 14.2295C18.2253 14.0165 18.4791 13.9053 18.7334 13.9053C18.9285 13.9053 19.1243 13.9713 19.2871 14.1035C19.664 14.4102 19.7194 14.9632 19.4131 15.3389L16.0039 19.5195L19.0225 23.4268C19.3192 23.8105 19.2489 24.3624 18.8643 24.6592L18.79 24.7109Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.3"
              />
            </svg>
          </button>

          <button
            onClick={() => go(index + 1)}
            disabled={index === slides.length - 1}
            className="group text-[#3D3D4E] hover:opacity-30 disabled:opacity-30 transition-colors duration-200"
            aria-label="Next"
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 1.72461C30.4212 1.72461 38.9004 10.2031 38.9004 20.625C38.9004 31.0469 30.4212 39.5254 20 39.5254C9.57881 39.5254 1.09961 31.0469 1.09961 20.625C1.09961 10.2031 9.57881 1.72461 20 1.72461ZM20 3.48145C10.5469 3.48145 2.85645 11.1719 2.85645 20.625C2.85645 30.0781 10.5469 37.7686 20 37.7686C29.4531 37.7686 37.1436 30.0781 37.1436 20.625C37.1436 11.1719 29.4531 3.48145 20 3.48145Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              <path
                d="M24.8146 19.6162C25.3001 19.6163 25.6925 20.0105 25.6925 20.4951C25.6923 20.9796 25.3 21.3729 24.8146 21.373H14.3781C13.8926 21.373 13.4993 20.9796 13.4991 20.4951C13.4991 20.0104 13.8924 19.6162 14.3781 19.6162H24.8146Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.3"
              />
              <path
                d="M21.2104 15.2891C21.5893 15.0534 22.0912 15.1411 22.3677 15.499L25.812 19.959C26.0614 20.2822 26.0553 20.734 25.7974 21.0508L21.9468 25.7695L21.9478 25.7705C21.7752 25.9835 21.5214 26.0947 21.2671 26.0947C21.0719 26.0947 20.8762 26.0287 20.7134 25.8965C20.3364 25.5898 20.2811 25.0368 20.5874 24.6611L23.9966 20.4805L20.978 16.5732C20.6812 16.1895 20.7516 15.6376 21.1362 15.3408L21.2104 15.2891Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
