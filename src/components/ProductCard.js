"use client";

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-orange-50"
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
          {product.category}
        </div>
        <button className="absolute bottom-4 right-4 p-3 bg-primary text-white rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">{product.brand}</p>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{product.name}</h3>
          </div>
          <div className="flex items-center bg-orange-50 px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 text-accent fill-accent mr-1" />
            <span className="text-sm font-bold text-gray-700">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-gray-900">${product.price}</span>
          <Link
            href={`/products/${product.id}`}
            className="flex items-center text-sm font-bold text-primary hover:text-primary-hover transition-colors group/link"
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
