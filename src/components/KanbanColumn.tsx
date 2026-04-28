"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Lead, StageConfig } from "@/types";
import LoanCard from "./LoanCard";
import clsx from "clsx";

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  return `$${(n / 1_000).toFixed(0)}K`;
}

interface Props {
  stage: StageConfig;
  leads: Lead[];
  onCardClick: (lead: Lead) => void;
}

export default function KanbanColumn({ stage, leads, onCardClick }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });
  const totalValue = leads.reduce((sum, l) => sum + l.loanAmount, 0);

  return (
    <div className="flex flex-col flex-1 min-w-[260px] max-w-xs">
      {/* Column header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              "inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
              stage.badgeColor
            )}
          >
            {leads.length}
          </span>
          <h2 className="text-sm font-semibold text-[#1B2A4A]">{stage.label}</h2>
        </div>
        <span className="text-xs font-medium text-slate-400">
          {formatCurrency(totalValue)}
        </span>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={clsx(
          "flex-1 rounded-xl border-2 transition-colors duration-150 p-2",
          isOver
            ? "border-[#7C3AED] bg-violet-50/60"
            : "border-transparent bg-[#F4F6F9]"
        )}
      >
        <SortableContext
          items={leads.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="kanban-column-scroll space-y-2.5 pr-0.5">
            {leads.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-24 rounded-lg border-2 border-dashed border-slate-200 text-slate-400">
                <p className="text-xs font-medium">Drop leads here</p>
              </div>
            ) : (
              leads.map((lead) => (
                <LoanCard key={lead.id} lead={lead} onClick={onCardClick} />
              ))
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
