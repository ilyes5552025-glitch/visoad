"use client";
import Image from "next/image";
import Link from "next/link";


import { useEffect, useState } from "react";


export default function Header() {
    
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  

  return (
    <header

    
  
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    
      scrolled
  ? "bg-white/80 backdrop-blur-xl shadow-sm text-zinc-900"
  : "bg-transparent text-white"
}`} 
>
        
      <div className="container mx-auto px-6 h-20 flex items-center justify-between overflow-x-hidden">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={scrolled ? "/logovisioad.svg" : "/logo.svg"} alt="VisioAd Logo" width={140} height={40} priority/>
        </Link>



        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link href="#home" className="hover:text-sky-500">Home</Link>
          <Link href="#about" className="hover:text-sky-500">About</Link>
          <Link href="#services" className="hover:text-sky-500">Services</Link>
          <Link href="#contact" className="hover:text-sky-500">Contact</Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full font-semibold transition duration-300">Get Quote →</a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white text-zinc-900 border-t">
          <nav className="flex flex-col gap-4 p-6 font-semibold">
            <Link href="#home" onClick={() => setOpen(false)}>Home</Link>
            <Link href="#about" onClick={() => setOpen(false)}>About</Link>
            <Link href="#services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="#contact" onClick={() => setOpen(false)}>Contact</Link>

            <button className="mt-4 bg-sky-500 text-white py-2 rounded-full">
              Get Quote
            </button>
          </nav>
        </div>
      )}
    </header>
    
  );
}
