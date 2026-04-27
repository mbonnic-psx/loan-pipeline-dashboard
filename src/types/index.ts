export type LoanType = "Conventional" | "FHA" | "VA" | "USDA" | "Jumbo";

export type Stage = "new" | "in_review" | "approved" | "closed";

export interface Lead {
  id: string;
  leadName: string;
  email: string;
  phone: string;
  loanAmount: number;
  loanType: LoanType;
  assignedOfficer: string;
  stage: Stage;
  dateCreated: string;
  lastUpdated: string;
  propertyAddress: string;
  creditScore: number;
  ltv: number;
  notes: string;
  priority: "high" | "medium" | "low";
}

export interface StageConfig {
  id: Stage;
  label: string;
  color: string;
  badgeColor: string;
}

export const STAGES: StageConfig[] = [
  {
    id: "new",
    label: "New",
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "in_review",
    label: "In Review",
    color: "bg-amber-50 border-amber-200",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    id: "approved",
    label: "Approved",
    color: "bg-emerald-50 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "closed",
    label: "Closed",
    color: "bg-slate-50 border-slate-200",
    badgeColor: "bg-slate-100 text-slate-600",
  },
];

export const LOAN_TYPE_COLORS: Record<LoanType, string> = {
  Conventional: "bg-violet-100 text-violet-700",
  FHA: "bg-sky-100 text-sky-700",
  VA: "bg-green-100 text-green-700",
  USDA: "bg-lime-100 text-lime-700",
  Jumbo: "bg-orange-100 text-orange-700",
};
