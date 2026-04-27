"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Lead, LOAN_TYPE_COLORS } from "@/types";
import { GripVertical, User, Calendar, AlertCircle } from "lucide-react";
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

const PRIORITY_STYLES = {
  high: "bg-red-100 text-red-600",
  medium: "bg-amber-100 text-amber-600",
  low: "bg-slate-100 text-slate-500",
};

const OFFICER_INITIALS: Record<string, string> = {
  "Sarah Chen": "SC",
  "James Okafor": "JO",
  "Derek Walsh": "DW",
};

const OFFICER_COLORS: Record<string, string> = {
  "Sarah Chen": "bg-violet-100 text-violet-700",
  "James Okafor": "bg-sky-100 text-sky-700",
  "Derek Walsh": "bg-teal-100 text-teal-700",
};

interface Props {
  lead: Lead;
  onClick: (lead: Lead) => void;
  isDragOverlay?: boolean;
}

export default function LoanCard({ lead, onClick, isDragOverlay = false }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        "group bg-white rounded-xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-150 cursor-pointer select-none",
        isDragging && "opacity-40 scale-95",
        isDragOverlay && "drag-overlay-card shadow-panel rotate-1"
      )}
      onClick={() => !isDragging && onClick(lead)}
    >
      {/* Card header */}
      <div className="flex items-start justify-between px-4 pt-3.5 pb-0">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[#1B2A4A] truncate leading-tight">
            {lead.leadName}
          </h3>
          <p className="text-lg font-bold text-[#7C3AED] mt-0.5 leading-tight">
            {formatCurrency(lead.loanAmount)}
          </p>
        </div>

        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          className="flex-shrink-0 ml-2 mt-0.5 p-1 rounded text-slate-300 hover:text-slate-500 hover:bg-slate-100 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={14} />
        </div>
      </div>

      {/* Tags row */}
      <div className="flex items-center gap-1.5 px-4 pt-2.5 pb-0 flex-wrap">
        <span
          className={clsx(
            "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
            LOAN_TYPE_COLORS[lead.loanType]
          )}
        >
          {lead.loanType}
        </span>
        {lead.priority === "high" && (
          <span
            className={clsx(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
              PRIORITY_STYLES[lead.priority]
            )}
          >
            <AlertCircle size={10} />
            High
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 pt-2.5 pb-3.5 mt-0.5">
        {/* Officer */}
        <div className="flex items-center gap-1.5">
          <div
            className={clsx(
              "flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold shrink-0",
              OFFICER_COLORS[lead.assignedOfficer] ?? "bg-slate-100 text-slate-600"
            )}
          >
            {OFFICER_INITIALS[lead.assignedOfficer] ?? lead.assignedOfficer.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-xs text-slate-500 truncate max-w-[80px]">
            {lead.assignedOfficer.split(" ")[0]}
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Calendar size={11} />
          <span>
            {format(parseISO(lead.lastUpdated), "MMM d")}
          </span>
        </div>
      </div>
    </div>
  );
}
