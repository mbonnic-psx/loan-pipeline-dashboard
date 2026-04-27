import Header from "@/components/Header";
import KanbanBoard from "@/components/KanbanBoard";
import { MOCK_LEADS } from "@/data/loans";
import { CalendarDays, RefreshCw } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col">
      <Header />

      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-6 py-6">
        {/* Page title row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1B2A4A] leading-tight">
              Pipeline Dashboard
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <CalendarDays size={13} className="text-slate-400" />
              <span className="text-sm text-slate-400">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-card">
              <RefreshCw size={13} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#7C3AED] hover:bg-[#6B21A8] transition-colors shadow-sm">
              + New Lead
            </button>
          </div>
        </div>

        <KanbanBoard initialLeads={MOCK_LEADS} />
      </main>

      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            LoanFlow Pipeline &copy; 2026 &mdash; Internal Tool
          </span>
          <span className="text-xs text-slate-400">
            Data refreshed: {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </footer>
    </div>
  );
}
