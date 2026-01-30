"use client";
import Image from "next/image";
import Header from "../components/Header";
import HeaderWithDivider from "../components/HeaderWithDivider";
import Partners from "@/components/Partners";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { useState } from "react";
import VideoModal from "@/components/VideoModal";



export default function Home() {
   const [openVideo, setOpenVideo] = useState(false);
  

  return (
    <div>
      <Header />
      
       
        <section id="home" className="relative min-h-screen overflow-hidden bg-[url('/images/i3.jpg')] bg-cover bg-no-repeat bg-center">

        {/* Left content */}

        <div className="container mx-auto  px-6 grid md:grid-cols-2 gap-12 items-center " >

          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 absolute top-30 w-full text-center " >
              <p>
                Our digital marketing generates <br />
                leads for your local business
                </p>
            </h1>
            <p className="text-lg text-zinc-200 mb-8  absolute bottom-50 w-full text-center ">
              We optimize your digital marketing for better results while saving
              you time and money!
            </p>
            <div className="flex justify-center gap-4 absolute bottom-40 w-full text-center">

              <button className="bg-sky-500 hover:bg-sky-600 transition px-6 py-3 rounded-full font-semibold">
                Get &nbsp; Started &nbsp;→
              </button>
              <button onClick={() => setOpenVideo(true)} className="border border-white/60 px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white/10 transition">
                Watch Our Video ▶
              </button>
              <VideoModal open={openVideo} onClose={() => setOpenVideo(false)} />
            </div>

          </div> 

        </div>
  </section>



    <section id="services" className="bg-white text-zinc-900 py-24">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold mb-16 text-center">
      
      <span className="text-red-600">SE</span>RVIC<span className="text-red-600">ES</span></h2>

    <div className="grid md:grid-cols-3 gap-10">
      {[
        { title: "digital marketing", desc: "We help your brand reach the right audience and generate qualified leads." },
        { title: "web development", desc: "Modern, fast and scalable websites built with the latest technologies." },
        { title: "content creation", desc: "High-quality visuals and content that strengthen your brand identity." },
        { title: "sales & account management", desc: "Optimized sales processes and customer relationship management." },
        { title: "Design services", desc: "Creative and professional designs tailored to your business." },
        { title: "cctv monitoring", desc: "Advanced monitoring solutions for security and control." }
      ].map((s, i) => (
        <div key={i} className="bg-zinc-50 rounded-2xl p-10 shadow-sm hover:shadow-md transition">
          <h3 className="text-2xl font-semibold mb-4">{s.title}</h3>
          <p className="text-zinc-600">{s.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
                 {/*proven by numbres*/}
    <section className="bg-zinc-100 py-24">
      <div className="container mx-auto px-6 text-center">
        
        <Reveal>
          <h2 className="text-4xl font-bold mb-4">
                 <span className="text-black">PROVEN BY</span><span className="text-red-500">NUMBERS</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Our expertise and impact on our partners success are backed by solid facts and figures..
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
  <Reveal delay={0.3}>
    <div className="bg-white p-8 rounded-xl shadow">
      <h3 className="text-4xl font-bold text-black">+15k</h3>
      <p className=" mt-2 text-black">Social Media monthly Reach</p>
    </div>
  </Reveal>

  <Reveal delay={0.4}>
    <div className="bg-white p-8 rounded-xl shadow">
      <h3 className="text-4xl font-bold text-black">900+</h3>
      <p className=" mt-2 text-black">Professional Photoshoots Projects</p>
    </div>
  </Reveal>

  <Reveal delay={0.5}>
    <div className="bg-white p-8 rounded-xl shadow">
      <h3 className="text-4xl font-bold text-black">80%</h3>
      <p className=" mt-2 text-black">Client Satisfaction Rate</p>
    </div>
  </Reveal>

  {/* New second row rectangles */}
  <Reveal delay={0.6}>
    <div className="bg-white p-8 rounded-xl shadow">
      <h3 className="text-4xl font-bold text-black">2022</h3>
      <p className="text-black mt-2">in the industry since</p>
    </div>
  </Reveal>

  <Reveal delay={0.7}>
    <div className="bg-white p-8 rounded-xl shadow">
      <h3 className="text-4xl font-bold text-black">500+</h3>
      <p className="text-black mt-2">Campaign Reach and Effectiveness</p>
    </div>
  </Reveal>

  <Reveal delay={0.8}>
    <div className="bg-white p-8 rounded-xl shadow">
      <h3 className="text-4xl font-bold text-black">100+</h3>
      <p className="text-black mt-2">Campaign Reach and Effectiveness</p>
    </div>
  </Reveal>
</div>
      </div>
    </section>

      <Partners />
      <FAQ />
      <Contact />
      <Footer />

    
</div>
  );
}
