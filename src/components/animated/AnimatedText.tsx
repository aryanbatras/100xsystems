import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  animationType?: 'chars' | 'words' | 'lines' | 'chars-words' | 'words-lines' | 'all';
  animationConfig?: {
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
    rotationY?: number;
    opacity?: number;
    stagger?: number | { each: number; from?: 'start' | 'end' | 'center' | 'random' };
    duration?: number;
    delay?: number;
    ease?: string;
  };
  autoSplit?: boolean;
  onAnimationComplete?: () => void;
  scrollTrigger?: {
    start?: string;
    end?: string;
    scrub?: boolean;
    markers?: boolean;
    toggleActions?: string;
  };
}

const AnimatedText = ({ 
  children, 
  className = '',
  animationType = 'chars',
  animationConfig = {},
  autoSplit = true,
  onAnimationComplete,
  scrollTrigger = {}
}: AnimatedTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitTextRef = useRef<any>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const defaultConfig = {
        y: 50,
        opacity: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out"
      };

      const finalConfig = { ...defaultConfig, ...animationConfig };

      const splitType = animationType === 'all' ? 'lines, words, chars' :
                       animationType === 'chars-words' ? 'words, chars' :
                       animationType === 'words-lines' ? 'lines, words' :
                       animationType;

      splitTextRef.current = SplitText.create(element, {
        type: splitType,
        linesClass: "line++",
        wordsClass: "word++",
        charsClass: "char++",
        autoSplit
      });

      const defaultScrollTrigger = {
        start: "top 80%",
        end: "bottom 20%",
        scrub: false,
        markers: false,
        toggleActions: "play none none reverse"
      };

      const finalScrollTrigger = { ...defaultScrollTrigger, ...scrollTrigger };

      const targets = [];
      if (splitTextRef.current.chars && (animationType === 'chars' || animationType === 'chars-words' || animationType === 'all')) {
        targets.push(
          gsap.from(splitTextRef.current.chars, {
            ...finalConfig,
            scrollTrigger: {
              trigger: element,
              ...finalScrollTrigger
            }
          })
        );
      }
      if (splitTextRef.current.words && (animationType === 'words' || animationType === 'words-lines' || animationType === 'all')) {
        targets.push(
          gsap.from(splitTextRef.current.words, {
            ...finalConfig,
            scrollTrigger: {
              trigger: element,
              ...finalScrollTrigger
            }
          })
        );
      }
      if (splitTextRef.current.lines && (animationType === 'lines' || animationType === 'words-lines' || animationType === 'all')) {
        targets.push(
          gsap.from(splitTextRef.current.lines, {
            ...finalConfig,
            scrollTrigger: {
              trigger: element,
              ...finalScrollTrigger
            }
          })
        );
      }

      if (onAnimationComplete && targets.length > 0) {
        Promise.all(targets.map(t => new Promise(resolve => t.eventCallback('onComplete', resolve)))).then(onAnimationComplete);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
      ctx.revert();
    };
  }, [animationType, animationConfig, autoSplit, onAnimationComplete, scrollTrigger]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default AnimatedText;
