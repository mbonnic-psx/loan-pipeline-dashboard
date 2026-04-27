"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { LoanType } from "@/types";

const LOAN_TYPES: LoanType[] = ["Conventional", "FHA", "VA", "USDA", "Jumbo"];

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedLoanType: LoanType | "All";
  onLoanTypeChange: (t: LoanType | "All") => void;
  selectedOfficer: string;
  onOfficerChange: (o: string) => void;
  officers: string[];
  totalVisible: number;
  totalAll: number;
}

export default function SearchFilterBar({
  searchQuery,
  onSearchChange,
  selectedLoanType,
  onLoanTypeChange,
  selectedOfficer,
  onOfficerChange,
  officers,
  totalVisible,
  totalAll,
}: Props) {
  const hasActiveFilter =
    searchQuery !== "" ||
    selectedLoanType !== "All" ||
    selectedOfficer !== "All";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 w-full sm:max-w-xs">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search leads…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={14} className="text-slate-400 shrink-0" />

        {/* Loan Type filter */}
        <select
          value={selectedLoanType}
          onChange={(e) => onLoanTypeChange(e.target.value as LoanType | "All")}
          className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] cursor-pointer transition-colors"
        >
          <option value="All">All Loan Types</option>
          {LOAN_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        {/* Officer filter */}
        <select
          value={selectedOfficer}
          onChange={(e) => onOfficerChange(e.target.value)}
          className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] cursor-pointer transition-colors"
        >
          <option value="All">All Officers</option>
          {officers.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        {hasActiveFilter && (
          <button
            onClick={() => {
              onSearchChange("");
              onLoanTypeChange("All");
              onOfficerChange("All");
            }}
            className="text-xs text-[#7C3AED] font-medium hover:text-[#6B21A8] flex items-center gap-1 whitespace-nowrap"
          >
            <X size={12} />
            Clear
          </button>
        )}
      </div>

      {/* Result count */}
      <div className="text-xs text-slate-400 whitespace-nowrap ml-auto">
        {hasActiveFilter ? (
          <span>
            <span className="font-semibold text-slate-600">{totalVisible}</span>
            {" "}of {totalAll} leads
          </span>
        ) : (
          <span>
            <span className="font-semibold text-slate-600">{totalAll}</span> total leads
          </span>
        )}
      </div>
    </div>
  );
}
