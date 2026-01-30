import Image from "next/image";
import Link from "next/link";

export default function HeaderWithDivider() {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="VisioAd Logo" width={140} height={40} priority />
            <Image src="/logovivioad.svg" alt="VisioAd Logo" width={140} height={40} priority />
          </Link>
          {/* rest header elements*/}
        </div>
      </header>

      {/* Divider */}
      <div className="w-full h-1 my-4 overflow-hidden mt-24">
        <div className="h-full w-[200%] bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 animate-slide"></div>
      </div>
    </>
  );
}
