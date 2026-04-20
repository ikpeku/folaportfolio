import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./component/Header";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import DesignAI from "./pages/DesignAI";
import KiboSchool from "./pages/KiboSchool";
import TimeStudy from "./pages/TimeStudy";
import Behold from "./pages/Behold";
import Rukah from "./pages/Rukah";
import Zenith from "./pages/Zenith";

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.28, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  const location = useLocation();
  return (
    <main className="min-h-screen font-sans antialiased relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Header />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/design-ai" element={<PageWrapper><DesignAI /></PageWrapper>} />
            <Route path="/kibo-school" element={<PageWrapper><KiboSchool /></PageWrapper>} />
            <Route path="/time-study" element={<PageWrapper><TimeStudy /></PageWrapper>} />
            <Route path="/behold" element={<PageWrapper><Behold /></PageWrapper>} />
            <Route path="/rukah" element={<PageWrapper><Rukah /></PageWrapper>} />
            <Route path="/zenith" element={<PageWrapper><Zenith /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
     
      </div>
    </main>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
