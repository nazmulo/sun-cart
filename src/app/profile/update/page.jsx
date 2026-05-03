"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Image as ImageIcon, Loader2, ArrowLeft, Save } from 'lucide-react';

const updateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().url("Invalid image URL").or(z.literal("")),
});

export default function UpdateProfilePage() {
  const { data: session, isPending: isSessionLoading } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateSchema),
  });

  useEffect(() => {
    if (session?.user) {
      reset({
        name: session.user.name || "",
        image: session.user.image || "",
      });
    }
  }, [session, reset]);

  if (isSessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { error } = await updateUser({
        name: data.name,
        image: data.image || undefined,
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/profile" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Profile
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[3rem] shadow-xl p-10 border border-orange-50"
      >
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Update Profile</h1>
          <p className="text-gray-500">Keep your information fresh for the summer.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 mb-1 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  {...register("name")}
                  className={`block w-full pl-12 pr-4 py-4 bg-orange-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all placeholder:text-gray-400 ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="Your Name"
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name.message}</p>}
            </div>

            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 mb-1 block">Profile Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="url"
                  {...register("image")}
                  className={`block w-full pl-12 pr-4 py-4 bg-orange-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all placeholder:text-gray-400 ${errors.image ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              {errors.image && <p className="text-xs text-red-500 mt-1 ml-1">{errors.image.message}</p>}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Link
              href="/profile"
              className="flex-1 py-4 px-4 bg-white border-2 border-gray-100 rounded-2xl font-bold text-gray-700 text-center hover:bg-gray-50 transition-all active:scale-95"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-[2] py-4 px-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center space-x-2 disabled:opacity-70 active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
