"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";

// استيراد ملفات JSON مباشرة
import googleAnimation from "../animated/Google Icon.json";
import amazonAnimation from "../animated/Amazon Logo.json";
import metaAnimation from "../animated/Meta animation.json";
import microsoftAnimation from "../animated/microsoft.json";

export default function Partners() {
  const brands = [
    { name: "Google", animation: googleAnimation },
    { name: "Amazon", animation: amazonAnimation },
    { name: "Meta", animation: metaAnimation },
    { name: "Microsoft", animation: microsoftAnimation },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.1, y: -5, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4 text-center"
        >
          <span className="text-black">INDUSTRY</span>{" "}
          <span className="text-red-500">RECOGNIZED</span>{" "}
          <span className="text-black">PARTNERSHIPS</span>
        </motion.h2>

        <p className="text-gray-600 mb-12 text-center">
          Empowering Your Business with the Best in the Industry
        </p>

        <motion.div
          className="grid md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              whileHover="hover"
              className="h-48 bg-white rounded-2xl flex items-center justify-center p-4 shadow-md"
            >
              <Lottie
                animationData={brand.animation} // <-- هذا هو المهم
                loop={true}
                className="w-32 h-32"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
