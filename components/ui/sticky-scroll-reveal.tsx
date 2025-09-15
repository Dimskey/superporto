"use client";
import React, { useRef, useState, useEffect } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isHoveringText, setIsHoveringText] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, i) => i / cardLength);
    const closest = breakpoints.reduce((acc, bp, i) => {
      return Math.abs(latest - bp) < Math.abs(latest - breakpoints[acc])
        ? i
        : acc;
    }, 0);
    setActiveCard(closest);
  });

  // Kontrol scroll berdasarkan hover
  useEffect(() => {
    if (ref.current) {
      if (isHoveringText) {
        ref.current.style.overflowY = "auto";
        ref.current.style.scrollbarWidth = "none"; // Firefox
        // IE/Edge
      } else {
        ref.current.style.overflowY = "hidden";
      }
    }
  }, [isHoveringText]);

  const maxLength = 120;

  return (
    <motion.div
      className="relative flex h-[30rem] justify-center space-x-10 rounded-md p-10 bg-transparent"
      ref={ref}
      style={{ overflowY: "hidden" }} // Default hidden
    >
      {/* Kiri: teks */}
      <div
        className="relative flex items-start px-4"
        onMouseEnter={() => setIsHoveringText(true)}
        onMouseLeave={() => setIsHoveringText(false)}
      >
        <div className="max-w-2xl">
          {content.map((item, idx) => {
            const isActive = activeCard === idx;
            const isExpanded = expandedIndex === idx;
            const desc =
              isExpanded || item.description.length <= maxLength
                ? item.description
                : item.description.slice(0, maxLength) + "...";

            return (
              <div key={item.title + idx} className="my-20">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0.3 }}
                  className="text-2xl font-bold text-slate-100"
                >
                  {item.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0.3 }}
                  className="mt-6 max-w-sm text-base text-slate-300 text-justify leading-relaxed"
                >
                  {desc}
                </motion.p>

                {item.description.length > maxLength && (
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="mt-2 text-xs text-blue-400 hover:underline"
                  >
                    {isExpanded ? "Tutup" : "Baca selengkapnya"}
                  </button>
                )}
              </div>
            );
          })}
          <div className="h-40" />
        </div>
      </div>

      {/* Kanan: konten/gambar */}
      <div
        className={cn(
          "sticky top-10 flex h-40 w-40 max-w-[10rem] items-center justify-center overflow-hidden rounded-md bg-transparent sm:h-48 sm:w-48 md:h-60 md:w-60",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
