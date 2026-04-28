"use client";

import { Lead, LOAN_TYPE_COLORS, STAGES } from "@/types";
import {
  X,
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  TrendingUp,
  FileText,
  ChevronRight,
  AlertCircle,
  Shield,
  DollarSign,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import clsx from "clsx";

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function creditScoreLabel(score: number): { label: string; color: string } {
  if (score >= 750) return { label: "Excellent", color: "text-emerald-600" };
  if (score >= 700) return { label: "Good", color: "text-blue-600" };
  if (score >= 650) return { label: "Fair", color: "text-amber-600" };
  return { label: "Poor", color: "text-red-600" };
}

const OFFICER_COLORS: Record<string, string> = {
  "Sarah Chen": "bg-violet-100 text-violet-700",
  "James Okafor": "bg-sky-100 text-sky-700",
  "Derek Walsh": "bg-teal-100 text-teal-700",
};

interface Props {
  lead: Lead | null;
  onClose: () => void;
}

export default function LeadDetailPanel({ lead, onClose }: Props) {
  if (!lead) return null;

  const stageConfig = STAGES.find((s) => s.id === lead.stage)!;
  const { label: creditLabel, color: creditColor } = creditScoreLabel(lead.creditScore);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-panel z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#1B2A4A] px-6 py-5 flex items-start justify-between shrink-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Lead Detail
            </p>
            <h2 className="text-xl font-bold text-white leading-tight">{lead.leadName}</h2>
            <p className="text-2xl font-bold text-[#7C3AED] mt-1 leading-tight">
              {formatCurrency(lead.loanAmount)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors mt-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Stage pipeline */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 shrink-0">
          <div className="flex items-center gap-1">
            {STAGES.map((s, i) => {
              const isActive = s.id === lead.stage;
              const isPast =
                STAGES.findIndex((x) => x.id === lead.stage) > i;
              return (
                <div key={s.id} className="flex items-center gap-1 flex-1">
                  <div
                    className={clsx(
                      "flex-1 py-1.5 px-2 rounded-lg text-center text-xs font-semibold transition-colors",
                      isActive
                        ? "bg-[#7C3AED] text-white"
                        : isPast
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-white border border-slate-200 text-slate-400"
                    )}
                  >
                    {s.label}
                  </div>
                  {i < STAGES.length - 1 && (
                    <ChevronRight size={12} className="text-slate-300 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Tags & Priority */}
          <div className="px-6 pt-5 pb-0 flex items-center gap-2 flex-wrap">
            <span
              className={clsx(
                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
                LOAN_TYPE_COLORS[lead.loanType]
              )}
            >
              {lead.loanType} Loan
            </span>
            <span
              className={clsx(
                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
                stageConfig.badgeColor
              )}
            >
              {stageConfig.label}
            </span>
            {lead.priority === "high" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                <AlertCircle size={11} />
                High Priority
              </span>
            )}
          </div>

          {/* Contact */}
          <section className="px-6 pt-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Contact
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-slate-400 shrink-0" />
                <a
                  href={`mailto:${lead.email}`}
                  className="text-sm text-[#7C3AED] hover:underline"
                >
                  {lead.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-slate-400 shrink-0" />
                <span className="text-sm text-slate-700">{lead.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 leading-snug">
                  {lead.propertyAddress}
                </span>
              </div>
            </div>
          </section>

          {/* Loan Details */}
          <section className="px-6 pt-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Loan Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F4F6F9] rounded-lg px-4 py-3">
                <p className="text-xs text-slate-400 mb-1">Loan Amount</p>
                <p className="text-base font-bold text-[#1B2A4A]">
                  {formatCurrency(lead.loanAmount)}
                </p>
              </div>
              <div className="bg-[#F4F6F9] rounded-lg px-4 py-3">
                <p className="text-xs text-slate-400 mb-1">Loan Type</p>
                <p className="text-base font-bold text-[#1B2A4A]">{lead.loanType}</p>
              </div>
              <div className="bg-[#F4F6F9] rounded-lg px-4 py-3">
                <p className="text-xs text-slate-400 mb-1">Credit Score</p>
                <p className="text-base font-bold text-[#1B2A4A]">
                  {lead.creditScore}
                  <span className={clsx("text-xs font-medium ml-1.5", creditColor)}>
                    {creditLabel}
                  </span>
                </p>
              </div>
              <div className="bg-[#F4F6F9] rounded-lg px-4 py-3">
                <p className="text-xs text-slate-400 mb-1">LTV Ratio</p>
                <p className="text-base font-bold text-[#1B2A4A]">
                  {lead.ltv}%
                </p>
              </div>
            </div>
          </section>

          {/* Assigned Officer */}
          <section className="px-6 pt-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Assigned Officer
            </h3>
            <div className="flex items-center gap-3 bg-[#F4F6F9] rounded-lg px-4 py-3">
              <div
                className={clsx(
                  "flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold shrink-0",
                  OFFICER_COLORS[lead.assignedOfficer] ?? "bg-slate-200 text-slate-700"
                )}
              >
                {lead.assignedOfficer
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1B2A4A]">
                  {lead.assignedOfficer}
                </p>
                <p className="text-xs text-slate-400">Loan Officer</p>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="px-6 pt-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Timeline
            </h3>
            <div className="flex gap-4">
              <div className="flex-1 bg-[#F4F6F9] rounded-lg px-4 py-3">
                <p className="text-xs text-slate-400 mb-1">Created</p>
                <p className="text-sm font-semibold text-[#1B2A4A]">
                  {format(parseISO(lead.dateCreated), "MMM d, yyyy")}
                </p>
              </div>
              <div className="flex-1 bg-[#F4F6F9] rounded-lg px-4 py-3">
                <p className="text-xs text-slate-400 mb-1">Last Updated</p>
                <p className="text-sm font-semibold text-[#1B2A4A]">
                  {format(parseISO(lead.lastUpdated), "MMM d, yyyy")}
                </p>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="px-6 pt-5 pb-8">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Notes
            </h3>
            <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
              <p className="text-sm text-slate-700 leading-relaxed">{lead.notes}</p>
            </div>
          </section>
        </div>

        {/* Footer actions */}
        <div className="border-t border-slate-100 px-6 py-4 bg-white flex gap-3 shrink-0">
          <button className="flex-1 py-2.5 rounded-lg bg-[#7C3AED] text-white text-sm font-semibold hover:bg-[#6B21A8] transition-colors">
            Move Stage
          </button>
          <button className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
            Edit Lead
          </button>
        </div>
      </div>
    </>
  );
}
