"use client";

import { motion, Variants } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
};

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Reveal({ children, delay = 0 }: RevealProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
