"use client";

import { BarChart3, Bell, ChevronDown, LayoutDashboard } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#1B2A4A] text-white shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#7C3AED]">
              <BarChart3 size={16} className="text-white" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                LoanFlow
              </span>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                Pipeline
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-white/10 transition-colors"
            >
              <LayoutDashboard size={15} />
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Reports
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Team
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="relative flex items-center justify-center w-9 h-9 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#7C3AED]" />
            </button>

            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#7C3AED] text-white text-xs font-semibold">
                SC
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-medium text-white">Sarah Chen</span>
                <span className="text-xs text-slate-400">Loan Officer</span>
              </div>
              <ChevronDown size={14} className="text-slate-400 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
