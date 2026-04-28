# Loan Pipeline Dashboard (Mock CRM)
### Built with Claude Code · Next.js · Tailwind CSS · Azure Static Web Apps *(Deployment In Progress)*
 
> A Kanban-style loan pipeline CRM that simulates how a real loan operations team 
> tracks and manages leads — built end-to-end using AI-assisted development with 
> Claude Code and Claude.ai as a prompt architect and thought partner.
 
---
 
## 📌 Overview
 
The Loan Pipeline Dashboard is a full-stack portfolio project built with Next.js and 
Tailwind CSS. It simulates an internal CRM tool for a loan processing team, where 
leads move through four pipeline stages: New → In Review → Approved → Closed. The 
app includes drag-and-drop stage management, real-time search and filtering, and a 
pipeline analytics summary — all powered by a realistic mock data model with no 
backend required.
 
This project was scaffolded, built, and styled entirely through AI-assisted development 
using Claude Code and Claude.ai as a prompt architect and deployment thought partner.
 
**Key Capabilities:**
- Kanban board with four loan pipeline stages (New, In Review, Approved, Closed)
- Drag-and-drop lead cards between stages using dnd-kit
- Real-time search filtering by lead name
- Dropdown filter by loan type (Conventional, FHA, VA)
- Pipeline analytics summary — total leads per stage and total pipeline value
- Lead detail side panel with full record view on card click
- Professional fintech UI inspired by Rocket Mortgage — navy, purple, and clean whites
---
 
<details>
<summary><strong>📂 Project Details</strong></summary>
<br>
  
### 🔗 Important Links
 
| Resource | Link |
|---|---|
| Live App | 🔄 Deployment In Progress |
| GitHub Repo | https://github.com/mbonnic-psx/loan-pipeline-dashboard |
 
---
 
### 👥 Project Contacts
 
| Name | Role |
|---|---|
| mbonnic-psx | Developer / Project Owner |
 
---
 
### 💡 The WHY
 
**What Are We Building?**
A Kanban-style pipeline dashboard that simulates an internal loan CRM — built to 
demonstrate full-stack product thinking, clean data modeling, and professional UI 
design relevant to fintech and lending operations.
 
**The Problem**
Loan teams often manage leads across disconnected spreadsheets and tools with no 
centralized view of pipeline status, deal value, or stage distribution. Without a 
clear visual pipeline, leads fall through the cracks and reporting becomes manual.
 
**The Solution**
A clean, drag-and-drop Kanban board that gives loan officers and operations analysts 
an instant view of every lead in the pipeline — with real-time filtering, analytics, 
and full lead detail — all without a backend or login required. Designed to look and 
feel like a tool a real lending team would use daily.
 
---
 
### 🧭 User Flow
 
1. Loan officer opens the dashboard and sees all active leads organized by stage
2. Officer searches by lead name or filters by loan type to narrow the board
3. Officer drags a card to a new stage as the lead progresses
4. Officer clicks a card to view full lead details in a side panel
5. Analytics summary row updates to reflect current pipeline value and stage counts
</details>
---
 
## 🤖 How This Was Built with Claude
 
This project was built end-to-end using **Claude Code** for development and 
**Claude.ai** as a prompt architect and deployment thought partner. No boilerplate 
was written by hand — every scaffold, fix, and feature was driven by structured prompts.
 
### 🧠 Prompting Approach
 
**Kickoff Prompt**
The project started with a single structured kickoff prompt written in Claude.ai 
using a Prompt Builder framework. The prompt specified the build type, tech stack, 
features, UI style, and constraints in one clean briefing — which was handed directly 
to Claude Code to scaffold the entire project.
 
**Feature Prompts**
Each new feature or refinement was written as a focused, token-efficient prompt. 
Prompts followed a consistent pattern:
- State what to fix or build in plain language
- Reference the specific component or behavior
- Specify what NOT to change
- End with a deploy or commit instruction
**Example prompt used in this project:**
> *"Build the Kanban board layout with four stage columns — New, In Review, Approved, 
> and Closed. Use the mock data file to seed cards into each column. Do not add 
> drag-and-drop yet — just get the static layout and card components rendering 
> correctly first. Use Tailwind for all styling."*
 
**Deployment**
All deployment decisions — configuring Azure Static Web Apps, setting up the GitHub 
Actions workflow, and resolving Next.js static export settings — are being guided 
by Claude.ai with exact steps and prompts at each stage.
 
---
 
## 🗺️ Project Roadmap
 
| Phase | Status | Description | What's Covered | Notes |
|---|---|---|---|---|
| **MVP** | ✅ Complete | Core Kanban board with mock data, drag-and-drop, search, filter, and analytics summary. | • Mock data model (15 leads)<br>• 4-stage Kanban board<br>• dnd-kit drag-and-drop<br>• Lead detail side panel<br>• Search + loan type filter<br>• Analytics summary row | Built via Claude Code |
| **Styling** | ✅ Complete | Fintech UI polish — navy header, purple accents, card shadows, Inter typography. | • Color system applied<br>• Responsive card layout<br>• Rocket Mortgage-inspired aesthetic | Tailwind utility classes |
| **Deployment** | 🔄 In Progress | Connect GitHub repo to Azure Static Web Apps and configure CI/CD pipeline. | • GitHub repo setup<br>• Azure Static Web App creation<br>• GitHub Actions workflow<br>• Next.js static export config | Targeting Azure Static Web Apps |
| **Phase 3** | 🔜 Planned | Mobile responsiveness and additional filtering options. | • Mobile Kanban layout<br>• Filter by assigned officer<br>• Sort by loan amount or date | TBD |
| **Phase 4** | 🔜 Planned | README polish, screenshots, and portfolio presentation cleanup. | • App screenshot in README<br>• Live app link added<br>• Final copy review | TBD |
 
---
 
## 🎯 Current Priorities
 
1. Complete Azure Static Web Apps deployment and confirm live URL
2. Verify drag-and-drop and filtering work correctly in production build
3. Add app screenshot to README once deployed
---
 
> **Status Key:** ✅ Complete &nbsp;|&nbsp; 🔄 In Progress &nbsp;|&nbsp; 
> 🔜 Planned &nbsp;|&nbsp; ⏸️ On Hold
