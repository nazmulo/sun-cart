"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Mail, Lock, Loader2, Globe } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
      } else {
        toast.success("Logged in successfully!");
        router.push(callbackUrl);
        router.refresh();
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
        callbackURL: callbackUrl,
      });
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
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
        <h2 className="text-3xl font-black text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-gray-500">Sign in to chase the sun</p>
      </div>
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
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
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Sign in"}
          </button>
        </div>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-400 font-medium">Or continue with</span>
        </div>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center space-x-3 py-4 px-4 bg-white border-2 border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all hover:border-gray-200 active:scale-95"
      >
        <Globe className="h-5 w-5 text-blue-500" />
        <span>Sign in with Google</span>
      </button>

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link href="/register" className="font-bold text-primary hover:text-primary-hover transition-colors">
          Register for free
        </Link>
      </p>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="flex items-center justify-center p-12 bg-white rounded-[2.5rem] shadow-xl border border-orange-50 w-full max-w-md">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}

