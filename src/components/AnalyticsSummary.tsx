"use client";

import { Lead, Stage, STAGES } from "@/types";
import { TrendingUp, Users, DollarSign, CheckCircle2 } from "lucide-react";

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  return `$${(n / 1_000).toFixed(0)}K`;
}

interface Props {
  leads: Lead[];
}

export default function AnalyticsSummary({ leads }: Props) {
  const totalPipeline = leads.reduce((sum, l) => sum + l.loanAmount, 0);
  const approvedCount = leads.filter((l) => l.stage === "approved").length;
  const approvedValue = leads
    .filter((l) => l.stage === "approved")
    .reduce((sum, l) => sum + l.loanAmount, 0);

  const stageCounts: Record<Stage, { count: number; value: number }> = {
    new: { count: 0, value: 0 },
    in_review: { count: 0, value: 0 },
    approved: { count: 0, value: 0 },
    closed: { count: 0, value: 0 },
  };
  leads.forEach((l) => {
    stageCounts[l.stage].count++;
    stageCounts[l.stage].value += l.loanAmount;
  });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Pipeline */}
      <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Pipeline
          </span>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-50">
            <DollarSign size={15} className="text-[#7C3AED]" />
          </div>
        </div>
        <p className="text-2xl font-bold text-[#1B2A4A] tracking-tight">
          {formatCurrency(totalPipeline)}
        </p>
        <p className="text-xs text-slate-400 mt-1">{leads.length} active leads</p>
      </div>

      {/* Stage breakdown */}
      {STAGES.map((stage) => {
        const data = stageCounts[stage.id];
        const pct =
          leads.length > 0 ? Math.round((data.count / leads.length) * 100) : 0;

        const icons = {
          new: Users,
          in_review: TrendingUp,
          approved: CheckCircle2,
          closed: CheckCircle2,
        };
        const Icon = icons[stage.id];

        const iconColors: Record<Stage, string> = {
          new: "text-blue-500 bg-blue-50",
          in_review: "text-amber-500 bg-amber-50",
          approved: "text-emerald-500 bg-emerald-50",
          closed: "text-slate-500 bg-slate-100",
        };

        const valueColors: Record<Stage, string> = {
          new: "text-blue-600",
          in_review: "text-amber-600",
          approved: "text-emerald-600",
          closed: "text-slate-500",
        };

        return (
          <div
            key={stage.id}
            className="bg-white rounded-xl border border-slate-200 px-5 py-4 shadow-card"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stage.label}
              </span>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-lg ${iconColors[stage.id]}`}
              >
                <Icon size={15} />
              </div>
            </div>
            <p className={`text-2xl font-bold tracking-tight ${valueColors[stage.id]}`}>
              {data.count}
              <span className="text-sm font-normal text-slate-400 ml-1">leads</span>
            </p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs font-medium text-slate-500">
                {formatCurrency(data.value)}
              </p>
              <span className="text-xs text-slate-400">{pct}%</span>
            </div>
            {/* Mini progress bar */}
            <div className="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  stage.id === "new"
                    ? "bg-blue-400"
                    : stage.id === "in_review"
                    ? "bg-amber-400"
                    : stage.id === "approved"
                    ? "bg-emerald-400"
                    : "bg-slate-300"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
