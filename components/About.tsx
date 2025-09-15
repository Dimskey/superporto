"use client";

import { stickyScrollContent } from "@/data";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Grid = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center py-20"
    >
      {/* ===== Layer Background Grid ===== */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full dark:bg-black bg-white
          dark:bg-grid-white/[0.03] bg-grid-black/[0.2] absolute top-0 left-0"
        >
          <div
            className="absolute pointer-events-none inset-0 flex items-center justify-center
            dark:bg-black bg-white
            [mask-image:linear-gradient(to_bottom,black_0%,transparent_20%,transparent_80%,black_100%)]
            [-webkit-mask-image:linear-gradient(to_bottom,black_0%,transparent_20%,transparent_80%,black_100%)]"
          />
        </div>
      </div>

      {/* ===== Heading ===== */}
      <h1 className="relative z-10 heading mb-12">
        All About <span className="text-purple">Me</span>
      </h1>

      {/* ===== StickyScroll Content ===== */}
      <div className="relative z-10 w-full">
        <StickyScroll
          content={stickyScrollContent.map((item) => ({
            ...item,
            content: (
              <div className="relative h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 flex items-center justify-center">
                {item.image ? (
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="object-contain h-full w-full cursor-pointer hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
                    onClick={() => handleImageClick(item.image!)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ) : (
                  <span className="text-white text-xl">{item.title}</span>
                )}
              </div>
            ),
          }))}
        />
      </div>

      {/* ===== Image Modal ===== */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full size"
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />

              {/* Close button */}
              <motion.button
                className="absolute top-2 right-2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-xl font-bold"
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Grid;
