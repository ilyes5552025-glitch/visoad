"use client";

import Image from "next/image";

export default function Contact() {
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
          <form className="bg-gray-300 p-8 rounded-2xl shadow-md lg:order-1 ">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                NAME
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                EMAIL
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                MESSAGE
              </label>
              <textarea
                placeholder="Write your message"
                className="w-full border border-black rounded-lg px-4 py-2 h-32 focus:ring-2 focus:ring-red-500 text-black"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Submit Form
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
