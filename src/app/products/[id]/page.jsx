"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import productsData from "@/data/products.json";
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const product = productsData.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-black mb-4">Product not found</h2>
        <Link href="/products" className="text-primary font-bold hover:underline flex items-center">
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/products" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-primary shadow-lg">
            {product.category}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-2">{product.brand}</p>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-accent fill-accent" : "text-gray-200"}`} 
                  />
                ))}
                <span className="ml-2 text-sm font-bold text-gray-700">{product.rating}</span>
              </div>
              <div className="h-1 w-1 bg-gray-300 rounded-full" />
              <span className={`text-sm font-bold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
              </span>
            </div>
          </div>

          <p className="text-3xl font-black text-gray-900">${product.price}</p>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="pt-6 space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              <ShoppingCart className="h-6 w-6" />
              <span>Add to Cart</span>
            </button>
            
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-2xl">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold text-gray-700">Free Worldwide Delivery</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-2xl">
                <RotateCcw className="h-5 w-5 text-secondary" />
                <span className="text-xs font-bold text-gray-700">30-Day Easy Returns</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 flex items-center text-sm text-gray-400">
            <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
            100% Secure & Authentic Summer Essentials
          </div>
        </motion.div>
      </div>
    </div>
  );
}
