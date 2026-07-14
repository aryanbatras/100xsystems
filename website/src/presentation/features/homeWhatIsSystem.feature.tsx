'use client';

import { motion } from 'motion/react';
import { FaGitAlt, FaChrome, FaLinux, FaReact, FaDocker, FaSpotify } from 'react-icons/fa';
import { SiRedis, SiKubernetes, SiGoogle } from 'react-icons/si';

const systems = [
  { name: 'Git', desc: 'Version control that changed how the world writes code.', icon: FaGitAlt },
  { name: 'Chrome', desc: 'A browser that renders the entire web.', icon: FaChrome },
  { name: 'Linux', desc: 'An operating system powering most of the internet.', icon: FaLinux },
  { name: 'Redis', desc: 'In-memory data structure store. Fast. Elegant.', icon: SiRedis },
  { name: 'React', desc: 'A library that redefined frontend engineering.', icon: FaReact },
  { name: 'Docker', desc: 'Containerization that simplified deployment.', icon: FaDocker },
  { name: 'Kubernetes', desc: 'Orchestration at scale. Complexity made manageable.', icon: SiKubernetes },
  { name: 'Spotify', desc: 'Recommendation systems that understand you.', icon: FaSpotify },
  { name: 'Google Search', desc: 'Indexing the entire internet in milliseconds.', icon: SiGoogle },
];

export function HomeWhatIsSystem() {
  return (
    <section className="py-24 lg:py-32 bg-surface-secondary border-y border-border">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium mb-4">
            What is a System?
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-tight mb-6">
            Everything around you is a{' '}
            <span className="text-accent">system.</span>
          </h2>
          <p className="text-lg text-fg-secondary leading-relaxed max-w-2xl mx-auto">
            The tools you use daily are engineering marvels.
            Understanding how they work is the first step to building your own.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {systems.map((sys, i) => {
            const Icon = sys.icon;
            return (
              <motion.div
                key={sys.name}
                className="system-card group flex items-start gap-4 p-5 cursor-default transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Icon className="shrink-0 text-2xl text-accent mt-0.5 transition-colors duration-300" />
                <div>
                  <h3 className="text-base font-bold text-fg uppercase tracking-wide mb-1 transition-colors duration-300">{sys.name}</h3>
                  <p className="text-sm text-fg-secondary leading-relaxed transition-colors duration-300">{sys.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <style>{`
          .system-card:hover {
            background-color: #572EFF;
          }
          .system-card:hover * {
            color: #ffffff !important;
          }
        `}</style>
      </div>
    </section>
  );
}
