'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import faqStyles from '../_styles/css/sections-home-faq.module.css';

const faqs = [
  {
    q: 'What exactly is 100XSystems?',
    a: '100XSystems builds products and a learning platform for engineers who want to understand systems at depth. Right now it\'s 3-4 products, a blog, and a growing community. The vision is to turn it into something much bigger — but today it\'s an MVP.',
  },
  {
    q: 'Is this a course platform?',
    a: 'No. We don\'t do certificates, quizzes, or hand-holding. The learning platform exists because systems thinking matters — but you learn by building, reading, and engaging. If you want a spoon-fed curriculum with a completion badge, this isn\'t it.',
  },
  {
    q: 'What products does 100XSystems have?',
    a: 'StartX System (ideation phase of your own systems), Peerly (collaborative learning), 100X Tools (privacy-first browser utilities), and the Engineering Blog.',
  },
  {
    q: 'Who is this for?',
    a: 'Engineers who care about how things work under the hood. Juniors who want to learn systems early. Seniors who want better tools and a community that challenges them.',
  },
  {
    q: 'Is this a company or a side project?',
    a: 'It started as a side project. It\'s being built like a company. Full commitment The goal is to become a full-fledged organization — but right now it\'s early, honest, and growing.',
  },
  {
    q: 'Is the learning platform free?',
    a: 'Core content and community access are free. Systems knowledge should be accessible to everyone. No paywalls for fundamental stuff.',
  },
  {
    q: 'What\'s coming next?',
    a: 'More products. The vision is to build an ecosystem under the 100XSystems name — tools, platforms, and eventually services. Building step by step.',
  },
];

export function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`${faqStyles.faqSection} glass-card section-padding`}>
      <div className={faqStyles.container}>
        <div className={faqStyles.header}>
          <span className={faqStyles.label}>FAQ</span>
          <h2 className={faqStyles.title}>Questions, answered.</h2>
          <p className={faqStyles.description}>
            The ones we actually hear. No corporate fluff.
          </p>
        </div>

        <div className={faqStyles.list}>
          {faqs.map((faq, index) => (
            <div key={index} className={faqStyles.item}>
              <button
                className={faqStyles.question}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className={faqStyles.questionText}>{faq.q}</span>
                <motion.span
                  className={faqStyles.icon}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} />
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className={faqStyles.answer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <p className={faqStyles.answerText}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
