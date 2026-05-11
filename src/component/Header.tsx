import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Assets from "../assets";

type NavItem = { label: string; to: string };

const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About Me", to: "/about" },
  { label: "Design x A.I", to: "/design-ai" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `hover:text-[#191919] transition-colors text-[16px] ${
    isActive ? "text-[#191919] font-bold" : "text-[#3D3D4E] font-semibold"
  }`;

const ease = [0.4, 0, 0.2, 1] as const;

const logoVariants = {
  rest:   { scale: 1,    transition: { duration: 0.35, ease } },
  hover:  { scale: 1.04, transition: { duration: 0.35, ease } },
  // active: { scale: 1.04, transition: { duration: 0.35, ease } },
};

// const logoUnderlineVariants = {
//   rest:   { bottom: 2,  transition: { duration: 0.35, ease } },
//   hover:  { bottom: -8, transition: { duration: 0.35, ease } },
//   active: { bottom: -8, transition: { duration: 0.35, ease } },
// };

const NavLabel = ({ isActive, label }: { isActive: boolean; label: string }) => (
  <motion.span
    className={isActive ? "underline decoration-2" : "hover:underline decoration-1"}
    style={{ textUnderlineOffset: "8px" }}
    // whileHover={{ textUnderlineOffset: "16px" }}
    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
  >
    {label}
  </motion.span>
);

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between pt-8 pb-6">

        <NavLink to="/" onClick={() => setOpen(false)}>
          {() => (
            <motion.div
              className="relative inline-block"
              variants={logoVariants}
              initial="rest"
              whileHover="hover"
              animate={"rest"}
            >
              <Assets.Logo className="" />
            </motion.div>
          )}
        </NavLink>
     

      {/* Desktop nav */}
      <motion.nav
        className="hidden md:flex items-center gap-10 text-[14px]"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      >
        {NAV.map((n) => (
          <NavLink key={n.label} to={n.to} className={navLinkClass}>
            {({ isActive }) => <NavLabel isActive={isActive} label={n.label} />}
          </NavLink>
        ))}
      </motion.nav>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.25 p-2 -mr-2"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <motion.span
          className="block h-[1.5px] w-5 bg-[#191919] origin-center"
          animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
        />
        <motion.span
          className="block h-[1.5px] w-5 bg-[#191919]"
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-[1.5px] w-5 bg-[#191919] origin-center"
          animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.25 }}
        />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="md:hidden fixed top-18 left-0 right-0 z-50 bg-white border-b border-neutral-100 px-6 pb-6 flex flex-col gap-5 text-[15px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {NAV.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
              >
                <NavLink
                  to={n.to}
                  className={navLinkClass}
                  onClick={() => setOpen(false)}
                >
                  {({ isActive }) => <NavLabel isActive={isActive} label={n.label} />}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
