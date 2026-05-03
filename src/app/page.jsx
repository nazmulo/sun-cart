import React from 'react';
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import { Droplet, Wind, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const popularProducts = productsData.slice(0, 3);

  const careTips = [
    {
      title: "Hydration is Key",
      desc: "Drink at least 3 liters of water daily to keep your skin glowing.",
      icon: <Droplet className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      title: "Sun Protection",
      desc: "Apply SPF 30+ every 2 hours, even if it's cloudy outside.",
      icon: <ShieldCheck className="h-6 w-6 text-orange-500" />,
      color: "bg-orange-50"
    },
    {
      title: "After-Sun Care",
      desc: "Use aloe vera gel to soothe and hydrate skin after a beach day.",
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      color: "bg-yellow-50"
    }
  ];

  const brands = [
    { name: "SunShade", logo: "🕶️" },
    { name: "Breeze", logo: "👕" },
    { name: "GlowGuard", logo: "🧴" },
    { name: "ShoreSide", logo: "👜" }
  ];

  return (
    <div className="space-y-24 pb-24">
      <Hero />

      {/* Popular Products */}
      <section id="popular" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Hot This Summer 🔥</h2>
            <p className="text-gray-500">Our most wanted seasonal picks.</p>
          </div>
          <Link href="/products" className="group flex items-center text-primary font-bold transition-all">
            See all products
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Summer Care Tips */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Summer Care Tips</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Stay protected and healthy while enjoying the sunshine with our expert advice.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careTips.map((tip, index) => (
              <div key={index} className="p-8 rounded-3xl border border-gray-100 hover:border-primary/20 transition-all group">
                <div className={`${tip.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {tip.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{tip.title}</h3>
                <p className="text-gray-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-center text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

          <h2 className="text-3xl font-black mb-12 relative z-10">Trusted by Top Brands</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {brands.map((brand) => (
              <div key={brand.name} className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl flex flex-col items-center justify-center hover:bg-white/20 transition-all cursor-default group">
                <span className="text-4xl mb-4 group-hover:scale-125 transition-transform">{brand.logo}</span>
                <span className="font-bold tracking-wider">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
