"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return <motion.div
    initial={reduce ? false : { opacity: 0, y: 8, filter: "blur(3px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ type: "spring", duration: .42, bounce: 0 }}
  >{children}</motion.div>;
}
