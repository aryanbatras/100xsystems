import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} min-h-screen bg-white text-black`}>
      <main className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center max-w-3xl">
          <Image
            src="/100xsystems.png"
            alt="100xSystems"
            width={200}
            height={200}
            priority
            className="mx-auto mb-12"
          />
          
          <h1 className="text-6xl font-light mb-4">
            100xSystems
          </h1>
          
          <p className="text-xl text-gray-600 mb-16">
            Structured Paths for Serious Engineers
          </p>

          <div className="mb-16">
            <p className="text-lg text-gray-500 mb-8">
              A comprehensive learning system designed around structured career paths, 
              systematic progression, and deep technical understanding.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-16">
            <div className="text-left">
              <h3 className="text-base font-medium mb-2">Structured Learning</h3>
              <p className="text-sm text-gray-600">
                Career-oriented tracks with beginner to expert progression
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-base font-medium mb-2">Systems Thinking</h3>
              <p className="text-sm text-gray-600">
                Deep understanding over surface-level tutorials
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-base font-medium mb-2">Long-term Vision</h3>
              <p className="text-sm text-gray-600">
                Built for sustainable engineering careers
              </p>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-8 mb-16">
            <p className="text-lg text-gray-700 mb-6">
              Something exceptional is being built. Join a community that values depth, structure, and real engineering thinking.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.100xsystems.dev" className="text-black">
                100xsystems.dev
              </a>
              <span className="text-gray-400">|</span>
              <a href="mailto:admin@100xsystems" className="text-black">
                admin@100xsystems
              </a>
              <span className="text-gray-400">|</span>
              <a href="https://www.linkedin.com/company/100xsystems/" className="text-black">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Engineering Depth. Structured.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Building the future of software engineering education
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
