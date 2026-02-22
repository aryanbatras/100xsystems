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

          <div className="mt-20 pt-16 border-t border-gray-200">
            <div className="text-left max-w-4xl mx-auto">
              <h2 className="text-2xl font-light mb-8 text-center">The 100xEngineer Philosophy</h2>
              
              <div className="mb-12">
                <p className="text-lg text-gray-700 mb-4">
                  An 100xEngineer knows its goal, reached through a path. Under the guidance of those who have already crossed that path.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div>
                  <h3 className="text-lg font-medium mb-4">Our Goal</h3>
                  <p className="text-gray-600">
                    Our goal is to become a good software engineer. A learning mindset. We thrive for excellence and then the opportunity comes itself because we deserve it.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Understanding the Role</h3>
                  <p className="text-gray-600">
                    We understand the clear difference between a developer and an engineer. We understand why developers become engineers at senior software level. We understand the hierarchy of software roles and what is expected from us. We understand the clear usecases of AI and why engineers are still needed.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-light mb-8 text-center">The Learning Path</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Foundation in one language</h3>
                  <p className="text-gray-600">
                    A developer learns a language to build things fast. But an engineer goes into the depth of that language. Because strong foundation in one language is a golden key to adapt and use any language in the future.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Foundations of systems</h3>
                  <p className="text-gray-600">
                    You have to understand the lifecycle of a software. From frontend to backend to deployment. You have to understand how scalable systems are built and the challenges that are faced. You have to understand the basics of the core system design. Understanding basic networking, database & OS.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Development of systems</h3>
                  <p className="text-gray-600">
                    You learn to build a frontend, then its backend. You learn to build desktop & mobile apps. You learn to build libraries. You build systems.
                  </p>
                </div>

                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">-------- Beginner Level Completed ----------</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Design Patterns, Optimizations, Security</h3>
                  <p className="text-gray-600">
                    You learn the latest in ecosystem. You learn best software practices. You learn different security loopholes. You learn optimizations and practical usecases of DSA.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">SecDevops & Cloud Infrastructure</h3>
                  <p className="text-gray-600">
                    You learn Linux, Docker, Kubernetes, Terraform, Ansible, Nginx. You learn CI/CD pipelines and how to secure them using SonarQube. You learn different cloud services and why they exist. You learn AWS, Azure, Google Cloud.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">GenAI, Automation & Data Science</h3>
                  <p className="text-gray-600">
                    You learn to use latest AI tools like Claude, Cursor etc. You learn automation workflows like n8n, active pieces etc. You learn automation backend systems like Inngest etc. You learn basics of data science like cleaning & processing data. You learn finetuning and basics of an AI model and how it behaves.
                  </p>
                </div>

                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">--------- Advanced Level Completed ------------</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Building Scalable & Secure systems</h3>
                  <p className="text-gray-600">
                    Picking up a dream project and working on it day and night. Explaining your system to others how it is built and how it is useful. Explaining the challenges faced while building and the learnings gained. Understanding all the limitations and the loopholes of the system you built yourself. Thinking how you can overcome those in your next project and learning it as well.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Engineering Judgment & Leadership</h3>
                  <p className="text-gray-600">
                    You understand the ecosystem & systems well enough to guide others. You can confidently become Team Lead & reason your Tech Decisions. You can make a non-tech person understand your system in simple way. You can bring Judgment to new technologies & explain them to others.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Understanding Constraints & Product Thinking</h3>
                  <p className="text-gray-600">
                    You read books & large codebases to understand patterns. You understand constraints even though anything can be built. You read articles & documentation from senior developers to appreciate depth. You have excellent debugging skills and you can understand errors & reason production failures.
                  </p>
                </div>

                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">--------- Expert Level Completed ------------</p>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium mb-4">Self-Evaluation</h3>
                <p className="text-gray-600 mb-4">
                  There is only one question to know where we stand:
                </p>
                <p className="text-md text-gray-800 font-medium mb-4">
                  "Show me your best work you have built that you are extremely proud of?"
                </p>
                <p className="text-gray-600">
                  Can you explain about your work like a systems engineer? Why did you choose to build it? What were the challenges, constraints? What was the system behind it? Why that tech stack was chosen? How would you scale it? And what did you learned from building it that eventually made you a better software engineer?
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
