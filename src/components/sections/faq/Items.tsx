import React, { useState } from 'react';
import styles from '../../styles/components/sections/faq/Items.module.css';

export function Items(): React.ReactElement {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What is 100xSystems?",
      answer: "100xSystems is a comprehensive platform for structured software engineering education, designed to transform developers into 100xEngineers through depth-first learning methodologies. We focus on building strong foundations and systems thinking rather than superficial knowledge of multiple technologies."
    },
    {
      question: "What makes the 100x approach different from other learning platforms?",
      answer: "Unlike platforms that teach breadth over depth, we emphasize mastering one technology completely before expanding. Our approach focuses on understanding trade-offs, system design principles, and the why behind engineering decisions. We believe true excellence comes from deep understanding, not from collecting programming languages."
    },
    {
      question: "How long does it take to become a 100xEngineer?",
      answer: "The journey varies based on your starting point and dedication. Typically, it takes 1-3 years of consistent learning and practice to achieve engineering excellence. However, the timeline depends on your prior experience, time commitment, and how quickly you grasp systems thinking concepts."
    },
    {
      question: "Do I need prior programming experience?",
      answer: "While some programming experience helps, we accept motivated learners at various levels. Our curriculum is designed to take you from your current level to engineering excellence. We provide different learning paths based on your starting point - from beginners to experienced developers."
    },
    {
      question: "What programming languages do you teach?",
      answer: "We focus on deep mastery of one language as a foundation (typically JavaScript/TypeScript or Python), then expand to system design, architecture patterns, and multiple technologies. The specific language matters less than understanding engineering principles that apply across all technologies."
    },
    {
      question: "Is the content free or paid?",
      answer: "We offer both free and premium content. Core learning materials and foundational concepts are freely accessible to everyone. Premium features include personalized mentorship, advanced system design workshops, code reviews, and career guidance. We believe in making quality engineering education accessible while providing value for those who want accelerated growth."
    },
    {
      question: "What is systems thinking and why is it important?",
      answer: "Systems thinking is the ability to see the complete picture - how components interact, how failures cascade, how performance scales, and understanding trade-offs. It's what separates senior engineers from coders. This skill allows you to build robust, scalable systems and make better architectural decisions."
    },
    {
      question: "How does the mentorship program work?",
      answer: "Our mentorship connects you with experienced engineers who provide personalized guidance, code reviews, and career advice. Mentors help you navigate challenges, avoid common pitfalls, and accelerate your learning. Premium members get regular one-on-one sessions and priority support."
    },
    {
      question: "What kind of projects will I build?",
      answer: "You'll work on progressively complex projects that build real engineering skills. From simple applications to distributed systems, from basic APIs to scalable microservices. Each project is designed to teach specific engineering concepts and system design principles."
    },
    {
      question: "How do you assess progress and determine if someone is a 100xEngineer?",
      answer: "Progress is assessed through practical projects, code reviews, system design challenges, and peer feedback. We evaluate your ability to think through trade-offs, design scalable systems, and write maintainable code. The 100xEngineer designation is earned by demonstrating consistent engineering excellence across multiple projects."
    },
    {
      question: "What career support do you provide?",
      answer: "We offer comprehensive career support including resume building, interview preparation, portfolio development, and job placement assistance. Our network of hiring partners actively seeks graduates who have completed our program. We also provide guidance on salary negotiation and career progression."
    },
    {
      question: "Can I learn while working a full-time job?",
      answer: "Yes! Our program is designed for working professionals. We recommend 8-10 hours per week for consistent progress. The curriculum is flexible, allowing you to learn at your own pace. Many of our successful graduates balanced learning with full-time jobs."
    },
    {
      question: "What if I get stuck or need help?",
      answer: "We provide multiple support channels: community forums, weekly Q&A sessions, peer study groups, and expert mentorship (for premium members). No one gets left behind - we have structured help systems to ensure you can overcome any learning obstacles."
    },
    {
      question: "Do you offer certificates or credentials?",
      answer: "Yes, we provide certificates of completion for each module and a final 100xEngineer certification. More importantly, you'll have a portfolio of impressive projects and demonstrated engineering skills that matter more than any certificate to employers."
    },
    {
      question: "How is this different from a computer science degree?",
      answer: "While CS degrees provide theoretical foundations, we focus on practical engineering excellence and systems thinking. We teach what's actually needed in industry - how to build scalable systems, work with teams, and make architectural decisions. Many CS graduates use our program to bridge the gap between academic knowledge and industry requirements."
    },
    {
      question: "What's your refund policy?",
      answer: "We offer a 30-day money-back guarantee for premium memberships. If you're not satisfied with the program within the first 30 days, we'll provide a full refund. We also offer pro-rated refunds if you need to pause your learning journey."
    },
    {
      question: "How do I get started?",
      answer: "Start with our foundation courses, take the placement assessment to determine your starting level, and choose your learning path. The best way is to begin with our free introductory content to understand our teaching style, then decide if you want to upgrade to premium for accelerated learning."
    }
  ];

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <button 
              className={styles.questionButton}
              onClick={() => toggleItem(index)}
              aria-expanded={openItems.includes(index)}
            >
              <span className={styles.questionText}>{faq.question}</span>
              <span className={`${styles.toggleIcon} ${openItems.includes(index) ? styles.open : ''}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </span>
            </button>
            <div className={`${styles.answer} ${openItems.includes(index) ? styles.open : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
