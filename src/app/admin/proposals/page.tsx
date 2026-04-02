"use client";

import type React from "react";
import { useState } from "react";
import { Can } from "@/access-control/permission-gates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  FileText,
  MessageSquare,
  RotateCcw,
  Search,
  UserCheck,
  Users,
} from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────────────────
type ProposalStatus = "Draft" | "Submitted" | "Under Review" | "Revision";

interface Proposal {
  id: string;
  title: string;
  pi: string;
  piAvatar: string;
  piColor: string;
  dept: string;
  submittedDate: string;
  status: ProposalStatus;
  budget: string;
  abstract: string;
  evaluator: string | null;
  lastAction: string;
  teamCount: number;
}

interface Evaluator {
  id: string;
  name: string;
  avatar: string;
  color: string;
  specialty: string;
  assigned: number;
}

// ─── MOCK DATA ────────────────────────────────────────────────────────
const EVALUATORS: Evaluator[] = [
  { id: "e1", name: "Prof. A. Haile",    avatar: "AH", color: "bg-blue-100 text-blue-700",    specialty: "Machine Learning",       assigned: 3 },
  { id: "e2", name: "Dr. S. Bekele",     avatar: "SB", color: "bg-purple-100 text-purple-700", specialty: "Biomedical Engineering",  assigned: 1 },
  { id: "e3", name: "Prof. M. Tesfaye",  avatar: "MT", color: "bg-emerald-100 text-emerald-700",specialty: "Renewable Energy",       assigned: 2 },
  { id: "e4", name: "Dr. L. Girma",      avatar: "LG", color: "bg-amber-100 text-amber-700",   specialty: "Computer Networks",      assigned: 4 },
  { id: "e5", name: "Prof. F. Tadesse",  avatar: "FT", color: "bg-rose-100 text-rose-700",     specialty: "Chemistry & Materials",  assigned: 0 },
];

const PROPOSALS: Proposal[] = [
  {
    id: "PRP-2024-001",
    title: "Deep Learning for Early Malaria Detection in Sub-Saharan Africa",
    pi: "Dr. L. Vance", piAvatar: "LV", piColor: "bg-purple-100 text-purple-700",
    dept: "Computer Science", submittedDate: "Mar 12, 2025", status: "Under Review",
    budget: "$92,000", evaluator: "Prof. A. Haile",
    abstract: "This proposal presents a novel convolutional neural network architecture trained on microscopy slide images for the automated detection of Plasmodium falciparum, targeting deployment in low-resource clinical settings.",
    lastAction: "Assigned to evaluator on Mar 14", teamCount: 4,
  },
  {
    id: "PRP-2024-002",
    title: "Hybrid Solar-Wind Micro-Grid Systems for Rural Electrification",
    pi: "Prof. E. Stark", piAvatar: "ES", piColor: "bg-emerald-100 text-emerald-700",
    dept: "Engineering", submittedDate: "Mar 18, 2025", status: "Submitted",
    budget: "$185,000", evaluator: null,
    abstract: "A feasibility and implementation study for integrating solar PV and wind turbines into micro-grids, optimized for rural communities in the Amhara and Oromia regions.",
    lastAction: "Submitted by PI on Mar 18", teamCount: 3,
  },
  {
    id: "PRP-2024-003",
    title: "Genomic Biomarkers in Ethiopian Type-2 Diabetes Populations",
    pi: "Dr. E. Wong", piAvatar: "EW", piColor: "bg-rose-100 text-rose-700",
    dept: "Bioinformatics", submittedDate: "Mar 5, 2025", status: "Revision",
    budget: "$67,000", evaluator: "Dr. S. Bekele",
    abstract: "Identifying novel SNP markers associated with Type-2 Diabetes in a population-specific Ethiopian cohort using GWAS and bioinformatics pipeline analysis.",
    lastAction: "Returned for revision: budget justification missing", teamCount: 2,
  },
  {
    id: "PRP-2024-004",
    title: "Quantum-Assisted Optimization for Supply Chain Logistics",
    pi: "Dr. A. Turing", piAvatar: "AT", piColor: "bg-blue-100 text-blue-700",
    dept: "Physics", submittedDate: "Feb 28, 2025", status: "Under Review",
    budget: "$220,000", evaluator: "Prof. M. Tesfaye",
    abstract: "Application of variational quantum eigensolver (VQE) and QAOA algorithms to NP-hard logistics optimization problems, benchmarked against classical solvers.",
    lastAction: "Evaluation in progress", teamCount: 5,
  },
  {
    id: "PRP-2024-005",
    title: "Nanotechnology-Enhanced Drug Delivery for Cervical Cancer",
    pi: "Prof. R. Musa", piAvatar: "RM", piColor: "bg-amber-100 text-amber-700",
    dept: "Biomedical Sciences", submittedDate: "Mar 21, 2025", status: "Submitted",
    budget: "$310,000", evaluator: null,
    abstract: "Synthesis and in-vitro characterization of lipid nanoparticle carriers for targeted delivery of cisplatin to HeLa cell lines, with focus on reduced systemic toxicity.",
    lastAction: "Submitted by PI on Mar 21", teamCount: 6,
  },
  {
    id: "PRP-2024-006",
    title: "AI-Powered Urban Traffic Signal Coordination Framework",
    pi: "Dr. H. Tesfaye", piAvatar: "HT", piColor: "bg-indigo-100 text-indigo-700",
    dept: "Urban Planning", submittedDate: "Mar 10, 2025", status: "Draft",
    budget: "$44,000", evaluator: null,
    abstract: "A reinforcement learning-based adaptive traffic signal controller trained on real-world sensor data from Addis Ababa's inner ring road intersections.",
    lastAction: "Draft saved by PI on Mar 10", teamCount: 2,
  },
];

// ─── CONFIG ───────────────────────────────────────────────────────────
const STATUS_CFG: Record<ProposalStatus, { className: string; icon: React.ReactNode }> = {
  Draft:          { className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",              icon: <FileText className="h-3 w-3" /> },
  Submitted:      { className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",               icon: <CheckCircle className="h-3 w-3" /> },
  "Under Review": { className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",           icon: <Clock className="h-3 w-3" /> },
  Revision:       { className: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",               icon: <RotateCcw className="h-3 w-3" /> },
};

const TAB_COUNTS = (proposals: Proposal[]) => ({
  all:           proposals.length,
  Draft:         proposals.filter(p => p.status === "Draft").length,
  Submitted:     proposals.filter(p => p.status === "Submitted").length,
  "Under Review":proposals.filter(p => p.status === "Under Review").length,
  Revision:      proposals.filter(p => p.status === "Revision").length,
});

// ─── PAGE ─────────────────────────────────────────────────────────────
export default function AdminProposalsPage() {
  const [tab, setTab]                   = useState<string>("all");
  const [search, setSearch]             = useState("");
  const [selected, setSelected]         = useState<Proposal | null>(null);
  const [drawerTab, setDrawerTab]       = useState<"details" | "team" | "history">("details");

  // Assign Evaluator dialog
  const [showAssign, setShowAssign]     = useState(false);
  const [evalSearch, setEvalSearch]     = useState("");
  const [pickedEval, setPickedEval]     = useState<string | null>(null);

  // Return for Revision dialog
  const [showRevision, setShowRevision] = useState(false);
  const [revComment, setRevComment]     = useState("");

  const counts = TAB_COUNTS(PROPOSALS);

  const filtered = PROPOSALS.filter(p => {
    const matchTab    = tab === "all" || p.status === tab;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.pi.toLowerCase().includes(search.toLowerCase()) ||
                        p.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const openDrawer = (p: Proposal) => {
    setSelected(p);
    setDrawerTab("details");
    setPickedEval(null);
    setRevComment("");
  };

  const filteredEvals = EVALUATORS.filter(e =>
    (e.name + e.specialty).toLowerCase().includes(evalSearch.toLowerCase())
  );

  const handleAssignConfirm = () => {
    // Here you would call your API
    setShowAssign(false);
    setEvalSearch("");
  };

  const handleRevisionSubmit = () => {
    // Here you would call your API
    setShowRevision(false);
    setRevComment("");
  };

  return (
    <div className="flex flex-1 flex-col gap-5 p-4 md:p-6 lg:p-8">

      {/* ── Header ── */}
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="flex items-center gap-2 font-bold text-2xl text-slate-900 tracking-tight dark:text-slate-100">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            Proposal Management
          </h1>
          <p className="mt-0.5 text-slate-500 text-sm">
            Route, assign, and manage all submitted research proposals across the university.
          </p>
        </div>
      </div>

      {/* ── Summary Stats Row ── */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {([
          { label: "Total",        count: counts.all,            color: "text-slate-700 dark:text-slate-300",  bg: "bg-slate-50 dark:bg-slate-900/40",   border: "border-slate-200 dark:border-slate-800" },
          { label: "Submitted",    count: counts.Submitted,      color: "text-blue-700 dark:text-blue-400",    bg: "bg-blue-50 dark:bg-blue-900/20",      border: "border-blue-100 dark:border-blue-900/30" },
          { label: "Under Review", count: counts["Under Review"], color: "text-amber-700 dark:text-amber-400",  bg: "bg-amber-50 dark:bg-amber-900/20",    border: "border-amber-100 dark:border-amber-900/30" },
          { label: "Revision",     count: counts.Revision,       color: "text-rose-700 dark:text-rose-400",    bg: "bg-rose-50 dark:bg-rose-900/20",      border: "border-rose-100 dark:border-rose-900/30" },
        ] as const).map(s => (
          <div key={s.label} className={`rounded-xl border ${s.border} ${s.bg} flex items-center justify-between px-4 py-3 shadow-sm`}>
            <span className="font-bold text-slate-500 text-xs uppercase tracking-wider">{s.label}</span>
            <span className={`font-extrabold text-2xl ${s.color}`}>{s.count}</span>
          </div>
        ))}
      </div>

      {/* ── Tabs + Search ── */}
      <div className="flex flex-col gap-3">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <TabsList className="h-9 shrink-0 rounded-lg bg-slate-100 p-0.5 dark:bg-slate-900">
              {([
                { value: "all",           label: "All",          count: counts.all },
                { value: "Draft",         label: "Draft",        count: counts.Draft },
                { value: "Submitted",     label: "Submitted",    count: counts.Submitted },
                { value: "Under Review",  label: "Under Review", count: counts["Under Review"] },
                { value: "Revision",      label: "Revision",     count: counts.Revision },
              ]).map(t => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="h-8 rounded-md px-3 font-semibold text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-950"
                >
                  {t.label}
                  <span className={`ml-1.5 rounded-full px-1.5 py-0.5 font-bold text-[10px] ${
                    tab === t.value
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                  }`}>
                    {t.count}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="relative w-full sm:w-[280px]">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder="Search by title, PI or ID..."
                className="h-9 rounded-lg border-slate-200 bg-white pl-8 text-sm dark:border-slate-800 dark:bg-slate-950"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Single TabsContent since we filter manually */}
          <TabsContent value={tab} className="mt-4">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                  <TableRow className="border-slate-200 dark:border-slate-800">
                    <TableHead className="h-10 w-[38%] pl-5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Proposal</TableHead>
                    <TableHead className="h-10 font-semibold text-slate-500 text-xs uppercase tracking-wider">PI</TableHead>
                    <TableHead className="h-10 font-semibold text-slate-500 text-xs uppercase tracking-wider">Status</TableHead>
                    <TableHead className="h-10 font-semibold text-slate-500 text-xs uppercase tracking-wider">Evaluator</TableHead>
                    <TableHead className="h-10 font-semibold text-slate-500 text-xs uppercase tracking-wider">Budget</TableHead>
                    <TableHead className="h-10 w-[80px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-16 text-center text-slate-400 text-sm italic">
                        No proposals match your current filters.
                      </TableCell>
                    </TableRow>
                  ) : filtered.map((p) => {
                    const cfg = STATUS_CFG[p.status];
                    return (
                      <TableRow
                        key={p.id}
                        className="group cursor-pointer border-slate-100 transition-colors hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-slate-900/40"
                        onClick={() => openDrawer(p)}
                      >
                        <TableCell className="py-4 pl-5">
                          <div className="flex flex-col gap-0.5">
                            <span className="line-clamp-1 font-semibold text-[13px] text-slate-900 leading-tight dark:text-slate-100">{p.title}</span>
                            <span className="font-bold text-[11px] text-slate-400 uppercase tracking-wider">{p.id} · {p.dept}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2.5">
                            <Avatar className="h-7 w-7 shrink-0">
                              <AvatarFallback className={`font-bold text-[10px] ${p.piColor}`}>{p.piAvatar}</AvatarFallback>
                            </Avatar>
                            <span className="truncate font-medium text-[13px] text-slate-700 dark:text-slate-300">{p.pi}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge className={`${cfg.className} pointer-events-none flex w-fit items-center gap-1 border-0 px-2 py-0.5 font-bold text-[11px] shadow-none`}>
                            {cfg.icon}{p.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          {p.evaluator ? (
                            <div className="flex items-center gap-1.5 font-medium text-[12px] text-slate-600 dark:text-slate-400">
                              <UserCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                              <span className="max-w-[120px] truncate">{p.evaluator}</span>
                            </div>
                          ) : (
                            <span className="font-medium text-[12px] text-slate-400 italic">Unassigned</span>
                          )}
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="font-semibold text-[13px] text-slate-700 dark:text-slate-300">{p.budget}</span>
                        </TableCell>
                        <TableCell className="py-4 pr-4 text-right">
                          <Button
                            size="sm" variant="ghost"
                            className="h-8 rounded-lg px-3 font-semibold text-blue-600 text-xs opacity-0 transition-opacity hover:bg-blue-50 group-hover:opacity-100 dark:text-blue-400 dark:hover:bg-blue-900/20"
                            onClick={(e) => { e.stopPropagation(); openDrawer(p); }}
                          >
                            Open <ChevronRight className="ml-1 h-3.5 w-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between border-slate-100 border-t px-5 py-3 dark:border-slate-800">
                <p className="font-medium text-slate-400 text-xs">Showing {filtered.length} of {PROPOSALS.length} proposals</p>
                {tab !== "all" && (
                  <button type="button" onClick={() => setTab("all")} className="font-semibold text-blue-600 text-xs hover:underline dark:text-blue-400">
                    View all
                  </button>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ═══════════════════════════════════════════════
           PROPOSAL DETAILS DRAWER (right-side Sheet)
         ═══════════════════════════════════════════════ */}
      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="flex w-full flex-col p-0 sm:max-w-[580px]" side="right">
          {selected && (
            <>
              {/* Drawer Header */}
              <SheetHeader className="shrink-0 border-slate-100 border-b px-6 pt-6 pb-4 dark:border-slate-800">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="border-0 bg-slate-100 font-bold text-[10px] text-slate-600 uppercase dark:bg-slate-800 dark:text-slate-400">
                      {selected.id}
                    </Badge>
                    <Badge className={`${STATUS_CFG[selected.status].className} pointer-events-none flex items-center gap-1 border-0 font-bold text-[10px]`}>
                      {STATUS_CFG[selected.status].icon}{selected.status}
                    </Badge>
                    {selected.evaluator && (
                      <Badge className="flex items-center gap-1 border-0 bg-emerald-100 font-bold text-[10px] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <UserCheck className="h-3 w-3" /> {selected.evaluator}
                      </Badge>
                    )}
                  </div>
                  <SheetTitle className="font-bold text-[15px] text-slate-900 leading-snug dark:text-slate-100">
                    {selected.title}
                  </SheetTitle>
                  <SheetDescription className="font-medium text-slate-500 text-xs">
                    {selected.dept} · Submitted {selected.submittedDate} · Budget {selected.budget}
                  </SheetDescription>
                </div>

                {/* Drawer Tab Nav */}
                <div className="mt-3 flex gap-1">
                  {(["details", "team", "history"] as const).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setDrawerTab(t)}
                      className={`rounded-md px-4 py-1.5 font-semibold text-xs capitalize transition-colors ${
                        drawerTab === t
                          ? "bg-blue-600 text-white"
                          : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </SheetHeader>

              {/* Drawer Body */}
              <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">

                {/* ── TAB: DETAILS ── */}
                {drawerTab === "details" && (
                  <>
                    {selected.status === "Revision" && (
                      <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/30 dark:bg-rose-900/10">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
                        <div>
                          <p className="font-bold text-rose-800 text-sm dark:text-rose-300">Returned for Revision</p>
                          <p className="mt-0.5 text-rose-600 text-xs dark:text-rose-400">{selected.lastAction}</p>
                        </div>
                      </div>
                    )}

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                        <p className="mb-1.5 font-bold text-[10px] text-slate-400 uppercase tracking-wider">Principal Investigator</p>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className={`font-bold text-[10px] ${selected.piColor}`}>{selected.piAvatar}</AvatarFallback>
                          </Avatar>
                          <span className="truncate font-semibold text-[13px] text-slate-800 dark:text-slate-200">{selected.pi}</span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                        <p className="mb-1.5 font-bold text-[10px] text-slate-400 uppercase tracking-wider">Budget Requested</p>
                        <p className="font-extrabold text-blue-600 text-xl dark:text-blue-400">{selected.budget}</p>
                      </div>
                      <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                        <p className="mb-1.5 font-bold text-[10px] text-slate-400 uppercase tracking-wider">Date Submitted</p>
                        <p className="flex items-center gap-1.5 font-semibold text-[13px] text-slate-800 dark:text-slate-200">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />{selected.submittedDate}
                        </p>
                      </div>
                      <div className="rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                        <p className="mb-1.5 font-bold text-[10px] text-slate-400 uppercase tracking-wider">Team Size</p>
                        <p className="flex items-center gap-1.5 font-semibold text-[13px] text-slate-800 dark:text-slate-200">
                          <Users className="h-3.5 w-3.5 text-slate-400" />{selected.teamCount} members
                        </p>
                      </div>
                    </div>

                    {/* Abstract */}
                    <div>
                      <h4 className="mb-2.5 flex items-center gap-2 font-bold text-[11px] text-slate-500 uppercase tracking-wider">
                        <FileText className="h-3.5 w-3.5" /> Abstract
                      </h4>
                      <p className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-[13px] text-slate-600 leading-relaxed dark:border-slate-800 dark:bg-slate-900/30 dark:text-slate-400">
                        {selected.abstract}
                      </p>
                    </div>

                    {/* Admin Workflow Actions */}
                    <div>
                      <h4 className="mb-3 font-bold text-[11px] text-slate-500 uppercase tracking-wider">Workflow Actions</h4>
                      <div className="flex flex-col gap-2">

                        {/* Assign Evaluator — only if Submitted */}
                        <Can permission="EVALUATOR_ASSIGN">
                          {(selected.status === "Submitted" || selected.status === "Under Review") && (
                            <button
                              type="button"
                              onClick={() => setShowAssign(true)}
                              className="group flex w-full items-center gap-3 rounded-xl border border-blue-200 bg-blue-50/60 p-3.5 text-left text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-900/40 dark:bg-blue-900/10 dark:text-blue-400 dark:hover:bg-blue-900/20"
                            >
                              <div className="shrink-0 rounded-lg bg-blue-100 p-2 dark:bg-blue-900/40">
                                <UserCheck className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-bold text-[13px] leading-tight">
                                  {selected.evaluator ? "Reassign Evaluator" : "Assign Evaluator"}
                                </p>
                                <p className="mt-0.5 font-medium text-[11px] opacity-70">
                                  {selected.evaluator ? `Currently: ${selected.evaluator}` : "No evaluator assigned yet"}
                                </p>
                              </div>
                              <ChevronRight className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100" />
                            </button>
                          )}
                        </Can>

                        {/* Return for Revision — only if Under Review */}
                        <Can permission="PROJECT_REJECT">
                          {(selected.status === "Submitted" || selected.status === "Under Review") && (
                            <button
                              type="button"
                              onClick={() => setShowRevision(true)}
                              className="group flex w-full items-center gap-3 rounded-xl border border-rose-200 bg-rose-50/60 p-3.5 text-left text-rose-700 transition-colors hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-900/10 dark:text-rose-400 dark:hover:bg-rose-900/20"
                            >
                              <div className="shrink-0 rounded-lg bg-rose-100 p-2 dark:bg-rose-900/40">
                                <RotateCcw className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-bold text-[13px] leading-tight">Return for Revision</p>
                                <p className="mt-0.5 font-medium text-[11px] opacity-70">Send back to PI with feedback</p>
                              </div>
                              <ChevronRight className="ml-auto h-4 w-4 opacity-50 group-hover:opacity-100" />
                            </button>
                          )}
                        </Can>

                        {/* Info notice about approval */}
                        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-slate-500 dark:border-slate-700 dark:bg-slate-900/30">
                          <div className="mt-0.5 shrink-0 rounded-lg bg-slate-200 p-2 dark:bg-slate-700">
                            <MessageSquare className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-bold text-[12px] text-slate-600 leading-tight dark:text-slate-400">Approval is handled by VPRTT & AC</p>
                            <p className="mt-0.5 font-medium text-[11px]">Administrative roles route proposals — final approvals are reserved for senior authority.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* ── TAB: TEAM ── */}
                {drawerTab === "team" && (
                  <div className="flex flex-col gap-3">
                    <h4 className="flex items-center gap-2 font-bold text-[11px] text-slate-500 uppercase tracking-wider">
                      <Users className="h-3.5 w-3.5" /> Research Team
                    </h4>
                    <div className="flex items-center gap-4 rounded-lg border border-blue-100 bg-blue-50/50 p-3.5 dark:border-blue-900/30 dark:bg-blue-900/10">
                      <Avatar className="h-10 w-10 border-2 border-blue-200 dark:border-blue-800">
                        <AvatarFallback className={`font-bold text-xs ${selected.piColor}`}>{selected.piAvatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col">
                        <span className="font-bold text-slate-900 text-sm dark:text-slate-100">{selected.pi}</span>
                        <span className="font-semibold text-blue-600 text-xs dark:text-blue-400">Principal Investigator</span>
                      </div>
                      <Badge className="ml-auto shrink-0 border-0 bg-blue-600 text-[10px] text-white">PI</Badge>
                    </div>
                    <p className="rounded-lg border border-slate-200 border-dashed py-6 text-center text-slate-400 text-xs italic dark:border-slate-700">
                      Full team details will appear here once connected to the backend.
                    </p>
                  </div>
                )}

                {/* ── TAB: HISTORY ── */}
                {drawerTab === "history" && (
                  <div className="flex flex-col gap-0">
                    <h4 className="mb-5 flex items-center gap-2 font-bold text-[11px] text-slate-500 uppercase tracking-wider">
                      <Clock className="h-3.5 w-3.5" /> Workflow History
                    </h4>
                    <div className="relative ml-3 flex flex-col gap-0 border-slate-200 border-l-2 dark:border-slate-700">
                      {[
                        { date: selected.submittedDate, label: "Proposal submitted by PI", type: "submit" },
                        ...(selected.evaluator ? [{ date: "Mar 14, 2025", label: `Evaluator assigned: ${selected.evaluator}`, type: "assign" }] : []),
                        ...(selected.status === "Revision" ? [{ date: "Mar 20, 2025", label: "Returned for revision with comments", type: "revision" }] : []),
                        { date: "—", label: "Awaiting next workflow action", type: "pending" },
                      ].map((ev) => (
                        <div key={`${ev.type}-${ev.date}-${ev.label}`} className="relative pb-7 pl-6 last:pb-0">
                          <div className={`-left-[9px] absolute top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white dark:border-slate-950 ${
                            ev.type === "submit"   ? "bg-blue-500" :
                            ev.type === "assign"   ? "bg-emerald-500" :
                            ev.type === "revision" ? "bg-rose-500" :
                            "bg-slate-300 dark:bg-slate-700"
                          }`} />
                          <p className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">{ev.date}</p>
                          <p className="mt-0.5 font-semibold text-[13px] text-slate-800 dark:text-slate-200">{ev.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* ═══════════════════════════════════════════════
           ASSIGN EVALUATOR DIALOG
         ═══════════════════════════════════════════════ */}
      <Dialog open={showAssign} onOpenChange={setShowAssign}>
        <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[480px]">
          <DialogHeader className="border-slate-100 border-b px-6 pt-6 pb-4 dark:border-slate-800">
            <div className="mb-1 flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                <UserCheck className="h-5 w-5" />
              </div>
              <DialogTitle className="font-bold text-base">Assign Evaluator</DialogTitle>
            </div>
            <DialogDescription className="ml-11 text-slate-500 text-xs">
              Select an evaluator from the faculty pool to review this proposal.
            </DialogDescription>
            <div className="relative mt-3">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search evaluators by name or specialty..."
                className="h-9 border-slate-200 bg-slate-50 pl-9 text-sm dark:border-slate-800 dark:bg-slate-900"
                value={evalSearch}
                onChange={(e) => setEvalSearch(e.target.value)}
              />
            </div>
          </DialogHeader>

          <div className="flex max-h-[320px] flex-col gap-1.5 overflow-y-auto px-4 py-4">
            {filteredEvals.map((ev) => (
              <button
                type="button"
                key={ev.id}
                onClick={() => setPickedEval(ev.id)}
                className={`flex cursor-pointer items-center gap-3.5 rounded-xl border-2 p-3.5 transition-colors ${
                  pickedEval === ev.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-slate-100 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
                }`}
              >
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className={`font-bold text-[11px] ${ev.color}`}>{ev.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-semibold text-[13px] text-slate-900 dark:text-slate-100">{ev.name}</span>
                  <span className="truncate font-medium text-[11px] text-slate-500">{ev.specialty}</span>
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-bold text-[10px] text-slate-400">{ev.assigned} assigned</span>
                </div>
                {pickedEval === ev.id && (
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600">
                    <svg className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <title>Selected</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          <DialogFooter className="flex gap-2 border-slate-100 border-t px-6 py-4 dark:border-slate-800">
            <Button variant="outline" size="sm" className="h-9" onClick={() => setShowAssign(false)}>Cancel</Button>
            <Button
              size="sm"
              className="h-9 flex-1 bg-blue-600 font-semibold text-white hover:bg-blue-700"
              disabled={!pickedEval}
              onClick={handleAssignConfirm}
            >
              <UserCheck className="mr-1.5 h-4 w-4" />
              Confirm Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════
           RETURN FOR REVISION DIALOG
         ═══════════════════════════════════════════════ */}
      <Dialog open={showRevision} onOpenChange={setShowRevision}>
        <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[460px]">
          <DialogHeader className="border-slate-100 border-b px-6 pt-6 pb-4 dark:border-slate-800">
            <div className="mb-1 flex items-center gap-3">
              <div className="rounded-lg bg-rose-100 p-2 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
                <RotateCcw className="h-5 w-5" />
              </div>
              <DialogTitle className="font-bold text-base">Return for Revision</DialogTitle>
            </div>
            <DialogDescription className="ml-11 text-slate-500 text-xs">
              Provide detailed feedback so the PI can address the identified issues and resubmit.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 px-6 py-5">
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-900/50">
              <p className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">Proposal</p>
              <p className="mt-0.5 line-clamp-2 font-semibold text-[13px] text-slate-800 dark:text-slate-200">{selected?.title}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="revision-comment" className="font-semibold text-[12px] text-slate-700 dark:text-slate-300">
                Feedback / Revision Instructions <span className="text-rose-500">*</span>
              </Label>
              <Textarea
                id="revision-comment"
                placeholder="Explain clearly what needs to be revised. For example: 'The budget justification for equipment procurement lacks detail. Please provide vendor quotes and procurement timeline.'"
                className="min-h-[140px] resize-none rounded-lg bg-white text-sm focus-visible:ring-rose-400 dark:bg-slate-950"
                value={revComment}
                onChange={(e) => setRevComment(e.target.value)}
              />
              <p className="font-medium text-[10px] text-slate-400">{revComment.length} / 1000 characters</p>
            </div>
          </div>

          <DialogFooter className="flex gap-2 border-slate-100 border-t px-6 py-4 dark:border-slate-800">
            <Button variant="outline" size="sm" className="h-9" onClick={() => setShowRevision(false)}>Cancel</Button>
            <Button
              size="sm"
              className="h-9 flex-1 bg-rose-600 font-semibold text-white hover:bg-rose-700"
              disabled={revComment.trim().length < 10}
              onClick={handleRevisionSubmit}
            >
              <RotateCcw className="mr-1.5 h-4 w-4" />
              Send for Revision
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
