import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { login } from "@/features/auth/authSlice";
import { motion } from "framer-motion";
import { Mail, Lock, ShieldAlert, ArrowRight, Activity } from "lucide-react";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      login({
        username,
        password,
      })
    );

    if (login.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 -left-40 h-[600px] w-[600px] rounded-full bg-indigo-900/20 blur-3xl" />
      <div className="absolute bottom-0 -right-40 h-[600px] w-[600px] rounded-full bg-violet-900/20 blur-3xl" />

      {/* Floating abstract particles/shapes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Logo and Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-lg shadow-indigo-500/30"
          >
            <Activity className="h-7 w-7 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-r from-slate-100 via-indigo-100 to-slate-200 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent"
          >
            Complaint Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-2 text-sm text-slate-400"
          >
            Enterprise Complaint Resolution & CAPA Portal
          </motion.p>
        </div>

        {/* Card Body */}
        <div className="overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-2xl shadow-indigo-950/20">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    placeholder="name@enterprise.com"
                    className="block w-full rounded-2xl border border-slate-800 bg-slate-950/50 py-3.5 pl-11 pr-4 text-slate-200 placeholder-slate-500 outline-none ring-offset-slate-950 transition duration-200 focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-2"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Password
                  </label>
                  <a href="#forgot" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                    Forgot?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="block w-full rounded-2xl border border-slate-800 bg-slate-950/50 py-3.5 pl-11 pr-4 text-slate-200 placeholder-slate-500 outline-none ring-offset-slate-950 transition duration-200 focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-2"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-start gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-400"
                >
                  <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">{error}</p>
                </motion.div>
              )}

              {/* Sign In Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 px-4 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-600/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    <span>Sign In to Account</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
          <div className="border-t border-slate-800/80 bg-slate-950/40 py-4 px-8 text-center text-xs text-slate-500">
            Secure, encrypted connection authorized personnel only.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
