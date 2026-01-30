/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do I know which services are right for my business?",
    answer:
      "We offer a free consultation to identify the services that best align with your goals."
  },
  {
    question: "How do your content creation services help my brand?",
    answer:
      "We create high-quality, SEO-optimized content that increases visibility and engagement."
  },
  {
    question: "How does your CCTV monitoring service work?",
    answer:
      "Our system provides 24/7 monitoring, real-time alerts, and secure access to footage."
  },
  {
    question: "How does VISIOAD ensure marketing campaign success?",
    answer:
      "We use data-driven strategies, performance tracking, and continuous optimization."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);


  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Image */}
        <img
          src="/images/p2.jpg"
          className="rounded-2xl object-cover"
          alt="FAQ"
        />

        {/* FAQ Content */}
        <div>
          <h2 className="text-4xl font-bold mb-8 text-red-600">FAQ</h2>

          {faqs.map((faq, index) => (
            <div key={index} className="border-b py-5">
              
              {/* Question */}
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center text-left font-semibold text-lg text-black"
              >
                {faq.question}
                <span className="text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600 mt-3 overflow-hidden"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
