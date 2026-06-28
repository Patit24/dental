"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Custom cubic bezier easing matching Emil's standard
const easeOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

const words = [
  "DIAGNOSTICS",
  "PREVENTATIVE",
  "AESTHETICS",
  "ORTHODONTICS",
  "ENDODONTICS",
  "RESTORATION",
  "EMERGENCY CARE",
  "FAMILY CARE",
  "DR SHAHEEN",
];

interface TypographicPreloaderProps {
  onComplete: () => void;
}

export function TypographicPreloader({ onComplete }: TypographicPreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 5000; // 5 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      const eased = easeOutCubic(t);
      const currentProgress = Math.floor(eased * 100);
      setProgress(currentProgress);

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 250); // Let user view the 100% complete state briefly
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  // Determine current active word and font weight (100 to 900)
  const index = Math.min(words.length - 1, Math.floor(progress / (100 / words.length)));
  const currentWord = words[index];
  const currentWeight = 100 + index * 100;

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1], // iOS drawer-like slide curve
      }}
      className="fixed inset-0 z-[99999] flex flex-col justify-between p-6 md:p-12 bg-[#072329] text-white select-none pointer-events-none overflow-hidden"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center w-full font-heading text-xs tracking-[0.2em] font-bold">
        <span className="text-[var(--teal)]">DR. SHAHEEN&apos;S</span>
        <span className="text-[#e2f8f6]/70">DENTAL CLINIC / HABRA</span>
      </div>

      {/* Main Typography Grid */}
      <div className="flex flex-col md:flex-row items-baseline md:justify-between w-full border-b border-[#072329] pb-8 md:pb-12">
        <h2
          className="font-heading tracking-tighter leading-none uppercase text-white"
          style={{
            fontSize: "clamp(2rem, 6.5vw, 5.5rem)",
            fontWeight: currentWeight,
            transition: "font-weight 80ms ease-out",
          }}
        >
          {currentWord}
        </h2>
        <span
          className="font-heading tracking-tighter leading-none text-[#e2f8f6] text-right mt-2 md:mt-0"
          style={{
            fontSize: "clamp(4.5rem, 14vw, 11rem)",
            fontWeight: currentWeight,
            transition: "font-weight 80ms ease-out",
          }}
        >
          {progress.toString().padStart(2, "0")}%
        </span>
      </div>

      {/* Bottom Bar Info */}
      <div className="flex justify-between items-center w-full font-heading text-[10px] tracking-[0.1em] text-[#e2f8f6]/50">
        <span>PATIT24 / PREMIUM EXPERIENCES</span>
        <span className="text-[#e2f8f6]/80 font-bold uppercase">
          {progress === 100 ? "READY" : "LOADING..."}
        </span>
      </div>

      {/* Progress Bar Line */}
      <div
        className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--teal)] to-[#e2f8f6] origin-left transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </motion.div>
  );
}

interface PreloaderWrapperProps {
  children: React.ReactNode;
}

export function PreloaderWrapper({ children }: PreloaderWrapperProps) {
  const hasLoadedBefore = () => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("dr_shaheen_clinic_loaded") === "true";
  };
  const [loading, setLoading] = useState(() => !hasLoadedBefore());
  const [completed, setCompleted] = useState(() => hasLoadedBefore());

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [loading]);

  const handleComplete = () => {
    sessionStorage.setItem("dr_shaheen_clinic_loaded", "true");
    setLoading(false);
    
    // Wait for the exit slide-up animation to complete before cleaning wrapper styles
    setTimeout(() => {
      setCompleted(true);
    }, 850);
  };

  // If completed, return clean children without transforms to keep absolute/sticky layout fully intact
  if (completed) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <TypographicPreloader onComplete={handleComplete} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={loading ? {} : { opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 16,
          mass: 1,
          delay: 0.1,
        }}
        style={{ transformOrigin: "top center" }}
        className="w-full min-h-screen origin-top"
      >
        {children}
      </motion.div>
    </>
  );
}
