import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Assets from "../assets";
import { ExitIcon, Hamburger } from "../assets/avatars";

type NavItem = { label: string; to: string };

const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About Me", to: "/about" },
  // { label: "Design x A.I", to: "/design-ai" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `hover:text-[#191919] transition-colors px-8 py-[18px] ${
    isActive ? "text-[#191919] font-bold" : "text-[#3D3D4E] font-semibold"
  }`;



const NavLabel = ({ isActive, label }: { isActive: boolean; label: string }) => (
  <motion.span
    className={isActive ? "underline decoration-2 underline-offset-4" : "hover:underline decoration-1 underline-offset-4"}
    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
  >

    {/* style={{ textUnderlineOffset: isActive ? "8px" : "6px"}} */}

    {label}
  </motion.span>
);

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
    <nav className="flex items-center justify-between pt-8 pb-6">

        <NavLink to="/" onClick={() => setOpen(false)}>
          {() => (
            <motion.div
              className="relative inline-block"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <Assets.Logo />
            </motion.div>
          )}
        </NavLink>
     

      {/* Desktop nav */}
      <motion.nav
        className="hidden lg:flex items-center tracking-[0.5%]"
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
      className="lg:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {!open  && <Hamburger />}
        {open  && <ExitIcon />}
      </button>
    </nav>

    {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="lg:hidden -mx-4 sm:mx-0 px-10 sm:px-6 pb-6 flex flex-col gap-5 text-[15px] text-center flex-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {NAV.map((n, i) => (
              <motion.div
                key={n.label}
                className="w-full"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.2 }}
              >
                <NavLink
                  to={n.to}
                  onClick={() => setOpen(false)}
                >
                 <span className={`flex items-center justify-center w-full py-4 px-4 rounded-xl font-semibold transition-colors duration-200 hover:bg-[#F3F4F6] hover:text-[#3D3D4E] active:bg-[#E8E8EE] active:text-[#191919]`}>
                      {n.label}
                    </span>
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
