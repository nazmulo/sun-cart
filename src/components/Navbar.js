"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Menu, X, LogIn, User, LogOut } from 'lucide-react';
import { useSession, signOut } from "@/lib/auth-client";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    ...(session ? [{ name: 'My Profile', href: '/profile' }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-2 text-primary">
              <Sun className="h-8 w-8 animate-pulse" />
              <span className="text-2xl font-black tracking-tighter uppercase italic">SunCart</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary border-b-2 border-primary" : "text-gray-500"
                )}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center space-x-4 ml-4">
              {isPending ? (
                <div className="h-8 w-8 bg-gray-100 rounded-full animate-pulse" />
              ) : session ? (
                <div className="flex items-center space-x-4">
                  <Link href="/profile" className="flex items-center space-x-2 group">
                    {session.user.image ? (
                      <img 
                        src={session.user.image} 
                        alt={session.user.name} 
                        className="h-8 w-8 rounded-full border-2 border-primary transition-transform group-hover:scale-110"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center border-2 border-primary transition-transform group-hover:scale-110">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary-hover transition-all shadow-md hover:shadow-lg active:scale-95"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-orange-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-orange-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === link.href 
                    ? "text-primary bg-orange-50" 
                    : "text-gray-500 hover:text-primary hover:bg-orange-50"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="pt-4 pb-3 border-t border-gray-100">
              {session ? (
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    {session.user.image ? (
                      <img src={session.user.image} className="h-10 w-10 rounded-full" alt="" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{session.user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{session.user.email}</div>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="ml-auto p-2 text-gray-400 hover:text-red-500"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              ) : (
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-primary hover:bg-orange-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-primary bg-orange-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
