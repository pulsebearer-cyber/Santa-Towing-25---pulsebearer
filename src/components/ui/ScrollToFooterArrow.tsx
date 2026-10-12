import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollToFooterArrowProps {
  className?: string;
}

export default function ScrollToFooterArrow({ className }: ScrollToFooterArrowProps) {
  const scrollToFooter = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToFooter}
      aria-label="Scroll to footer"
      className={cn(
        "flex flex-col items-center justify-center group z-20 focus:outline-none",
        className
      )}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white transition-all shadow-lg hover:shadow-xl hover:scale-110"
      >
        <ArrowDown className="w-5 h-5 md:w-6 md:h-6 group-hover:text-white" />
      </motion.div>
    </button>
  );
}
