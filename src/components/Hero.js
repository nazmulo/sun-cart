"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Sun } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg-summer py-20 lg:py-32">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-bold uppercase tracking-wider">Summer Sale 50% OFF</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
              Unleash Your <span className="text-primary italic">Summer</span> Vibes
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl">
              Hot Deals 🔥 are here! Explore our curated collection of sunglasses, beachwear, and skincare to make your summer unforgettable.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary-hover transition-all shadow-xl hover:shadow-primary/20 hover:-translate-y-1 active:scale-95"
              >
                Shop Now
              </Link>
              <Link
                href="#popular"
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-orange-50 transition-all border border-orange-100 hover:-translate-y-1 active:scale-95"
              >
                View Hot Deals
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop"
                alt="Premium Skincare"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm font-medium opacity-80">Collection 2024</p>
                <h3 className="text-2xl font-bold">The Ocean Series</h3>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center space-x-4 border border-orange-50"
            >
              <div className="bg-accent p-3 rounded-xl">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">UV Protection</p>
                <p className="text-lg font-black text-gray-900">Certified SPF 50+</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
