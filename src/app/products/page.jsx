"use client";

import React, { useState } from 'react';
import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { motion } from "framer-motion";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Summer Essentials</h1>
          <p className="text-gray-500">Everything you need for the perfect sun-filled day.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                  category === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-gray-500 border border-gray-100 hover:border-primary/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-orange-50">
          <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or category filter.</p>
          <button
            onClick={() => { setSearchTerm(''); setCategory('All'); }}
            className="mt-6 text-primary font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
