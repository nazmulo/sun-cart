"use client";

import React from 'react';
import { useSession, signOut } from "@/lib/auth-client";
import { User, Mail, Calendar, Settings, LogOut, Edit3, Camera } from 'lucide-react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const { user } = session;

  const handleSignOut = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-orange-50"
      >
        {/* Profile Header */}
        <div className="summer-gradient h-48 relative">
          <div className="absolute -bottom-16 left-12">
            <div className="relative">
              {user.image ? (
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl bg-orange-100 flex items-center justify-center">
                  <User className="w-16 h-16 text-primary" />
                </div>
              )}
              <Link 
                href="/profile/update"
                className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-gray-100 text-primary hover:scale-110 transition-transform"
              >
                <Camera className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-20 px-12 pb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900">{user.name}</h1>
              <p className="text-gray-500 font-medium">{user.email}</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/profile/update"
                className="flex items-center px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-orange-50 transition-all shadow-sm"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-gray-100">
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Account Details</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Username</p>
                    <p className="font-bold text-gray-700">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                    <p className="font-bold text-gray-700">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Member Since</p>
                    <p className="font-bold text-gray-700">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-6 bg-orange-50 rounded-3xl flex flex-col items-center justify-center space-y-3 hover:bg-orange-100 transition-all group">
                  <Settings className="w-6 h-6 text-primary group-hover:rotate-90 transition-transform duration-500" />
                  <span className="text-xs font-black text-primary uppercase">Settings</span>
                </button>
                <div className="p-6 bg-blue-50 rounded-3xl flex flex-col items-center justify-center space-y-3">
                  <span className="text-2xl font-black text-secondary italic">50%</span>
                  <span className="text-[10px] font-black text-secondary uppercase text-center">Exclusive Discount Applied</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
