import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">

        {/* Logo / About */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">VisioAd</h3>
          <p className="text-sm leading-relaxed">
            We help businesses grow with modern digital marketing strategies.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#about" className="hover:text-white">Terms of use</a></li>
            <li><a href="#services" className="hover:text-white">Cookie settings</a></li>   
          </ul>
        </div>

        {/* Contact */}
        <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-sky-500" />
                    <span>Ibrahim Center Building,Habib Bourguiba Avenue,Sousse 4000</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-sky-500" />
                    <span> +216 31 439 350</span>
                </div>
                <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-sky-500" />
                    <span>Info@visioad.com</span>
                </div>
            </div>
        </div>

    </div>

      {/* Bottom */}
      <div className="border-t border-white/10 text-center py-4 text-sm">
        © {new Date().getFullYear()} VisioAd. All rights reserved.
      </div>


      
    </footer>
  );
}
