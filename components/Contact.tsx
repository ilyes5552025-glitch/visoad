"use client";

import Image from "next/image";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="bg-gray-200 py-24">
      <div className="container mx-auto px-6 lg:px-20">

        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-red-500">WE&apos;RE HERE</span>{" "}
            <span className="text-black">TO HELP</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            DO YOU HAVE ANY QUESTIONS
          </p>
        </div>

        {/* IMAGE + FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* FORM */}
          <form onSubmit={handleSubmit} className="bg-gray-300 p-8 rounded-2xl shadow-md lg:order-1 ">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                NAME
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full border border-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                EMAIL
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 text-black"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                MESSAGE
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message"
                className="w-full border border-black rounded-lg px-4 py-2 h-32 focus:ring-2 focus:ring-red-500 text-black"
                required
              />
            </div>

            {status && (
              <p className={`mb-4 ${status.includes("success") ? "text-green-600" : "text-red-600"}`}>
                {status}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Submit Form"}
            </button>
          </form>

          {/* IMAGE */}
          <div className="lg:order-2">
            <Image
              src="/images/p1.jpg"
              alt="Contact"
              width={600}
              height={600}
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
