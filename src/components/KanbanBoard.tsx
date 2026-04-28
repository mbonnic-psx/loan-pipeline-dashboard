"use client";

import { useState, useMemo } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Lead, Stage, STAGES, LoanType } from "@/types";
import KanbanColumn from "./KanbanColumn";
import LoanCard from "./LoanCard";
import LeadDetailPanel from "./LeadDetailPanel";
import SearchFilterBar from "./SearchFilterBar";
import AnalyticsSummary from "./AnalyticsSummary";

interface Props {
  initialLeads: Lead[];
}

export default function KanbanBoard({ initialLeads }: Props) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType | "All">("All");
  const [selectedOfficer, setSelectedOfficer] = useState<string>("All");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const officers = useMemo(
    () => Array.from(new Set(leads.map((l) => l.assignedOfficer))).sort(),
    [leads]
  );

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        searchQuery === "" ||
        lead.leadName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        selectedLoanType === "All" || lead.loanType === selectedLoanType;
      const matchesOfficer =
        selectedOfficer === "All" || lead.assignedOfficer === selectedOfficer;
      return matchesSearch && matchesType && matchesOfficer;
    });
  }, [leads, searchQuery, selectedLoanType, selectedOfficer]);

  const activeCard = leads.find((l) => l.id === activeId) ?? null;

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as string);
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    if (!over) return;

    const activeLeadId = active.id as string;
    const overId = over.id as string;

    const activeLead = leads.find((l) => l.id === activeLeadId);
    if (!activeLead) return;

    // Determine if over a column (stage id) or a card
    const isOverColumn = STAGES.some((s) => s.id === overId);
    const overLead = leads.find((l) => l.id === overId);
    const targetStage: Stage = isOverColumn
      ? (overId as Stage)
      : (overLead?.stage ?? activeLead.stage);

    if (activeLead.stage === targetStage) return;

    setLeads((prev) =>
      prev.map((l) =>
        l.id === activeLeadId
          ? { ...l, stage: targetStage, lastUpdated: new Date().toISOString().slice(0, 10) }
          : l
      )
    );
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null);
    if (!over) return;

    const activeLeadId = active.id as string;
    const overId = over.id as string;

    const activeLead = leads.find((l) => l.id === activeLeadId);
    const overLead = leads.find((l) => l.id === overId);

    if (!activeLead || !overLead || activeLead.id === overLead.id) return;
    if (activeLead.stage !== overLead.stage) return;

    setLeads((prev) => {
      const stageLeads = prev.filter((l) => l.stage === activeLead.stage);
      const rest = prev.filter((l) => l.stage !== activeLead.stage);
      const oldIdx = stageLeads.findIndex((l) => l.id === activeLeadId);
      const newIdx = stageLeads.findIndex((l) => l.id === overId);
      return [...rest, ...arrayMove(stageLeads, oldIdx, newIdx)];
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Analytics */}
      <AnalyticsSummary leads={leads} />

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-slate-200 px-5 py-3.5 shadow-card">
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedLoanType={selectedLoanType}
          onLoanTypeChange={setSelectedLoanType}
          selectedOfficer={selectedOfficer}
          onOfficerChange={setSelectedOfficer}
          officers={officers}
          totalVisible={filteredLeads.length}
          totalAll={leads.length}
        />
      </div>

      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stage.id);
            return (
              <KanbanColumn
                key={stage.id}
                stage={stage}
                leads={stageLeads}
                onCardClick={setSelectedLead}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeCard && (
            <LoanCard
              lead={activeCard}
              onClick={() => {}}
              isDragOverlay
            />
          )}
        </DragOverlay>
      </DndContext>

      {/* Detail panel */}
      <LeadDetailPanel
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </div>
  );
}
