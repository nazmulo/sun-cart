"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Mail, Lock, User, Loader2, Image as ImageIcon, Globe } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  image: z.string().url("Invalid image URL").or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { error } = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: data.image || undefined,
        callbackURL: "/login",
      });

      if (error) {
        toast.error(error.message || "Registration failed");
      } else {
        toast.success("Account created successfully! Please log in.");
        router.push("/login");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl border border-orange-50"
      >
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-primary mb-6">
            <Sun className="h-10 w-10 animate-spin-slow" />
            <span className="text-3xl font-black italic">SunCart</span>
          </Link>
          <h2 className="text-3xl font-black text-gray-900">Join the SunClub</h2>
          <p className="mt-2 text-gray-500">Create an account to start shopping</p>
        </div>
        
        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 mb-1 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  {...register("name")}
                  className={`block w-full pl-12 pr-4 py-4 bg-orange-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all placeholder:text-gray-400 ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name.message}</p>}
            </div>

            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  {...register("email")}
                  className={`block w-full pl-12 pr-4 py-4 bg-orange-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all placeholder:text-gray-400 ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 mb-1 block">Photo URL (Optional)</label>
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
            
            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  {...register("password")}
                  className={`block w-full pl-12 pr-4 py-4 bg-orange-50 border-none rounded-2xl focus:ring-2 focus:ring-primary transition-all placeholder:text-gray-400 ${errors.password ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1 ml-1">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent font-bold rounded-2xl text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg hover:shadow-primary/25 disabled:opacity-70 active:scale-95"
            >
              {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Create Account"}
            </button>
          </div>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-400 font-medium">Or join with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-3 py-4 px-4 bg-white border-2 border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all hover:border-gray-200 active:scale-95"
        >
          <Globe className="h-5 w-5 text-blue-500" />
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-primary hover:text-primary-hover transition-colors">
            Sign in instead
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
