"use client";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React, { Suspense } from "react";

export default function LazySection({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true, // hanya sekali saat pertama kali terlihat
    threshold: 0.2, // aktif kalau 20% dari elemen terlihat
  });

  return (
    <div ref={ref}>
      {inView ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            {children}
          </Suspense>
        </motion.div>
      ) : (
        <div className="min-h-[300px] opacity-0" />
      )}
    </div>
  );
}
