"use client";

import React, { useState } from "react";
import { RoleGuard } from "@/components/auth/role-guard";
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
  Draft:          { className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",              icon: <FileText className="w-3 h-3" /> },
  Submitted:      { className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",               icon: <CheckCircle className="w-3 h-3" /> },
  "Under Review": { className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",           icon: <Clock className="w-3 h-3" /> },
  Revision:       { className: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",               icon: <RotateCcw className="w-3 h-3" /> },
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
    <div className="flex flex-col flex-1 p-4 md:p-6 lg:p-8 gap-5">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            Proposal Management
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Route, assign, and manage all submitted research proposals across the university.
          </p>
        </div>
      </div>

      {/* ── Summary Stats Row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {([
          { label: "Total",        count: counts.all,            color: "text-slate-700 dark:text-slate-300",  bg: "bg-slate-50 dark:bg-slate-900/40",   border: "border-slate-200 dark:border-slate-800" },
          { label: "Submitted",    count: counts.Submitted,      color: "text-blue-700 dark:text-blue-400",    bg: "bg-blue-50 dark:bg-blue-900/20",      border: "border-blue-100 dark:border-blue-900/30" },
          { label: "Under Review", count: counts["Under Review"], color: "text-amber-700 dark:text-amber-400",  bg: "bg-amber-50 dark:bg-amber-900/20",    border: "border-amber-100 dark:border-amber-900/30" },
          { label: "Revision",     count: counts.Revision,       color: "text-rose-700 dark:text-rose-400",    bg: "bg-rose-50 dark:bg-rose-900/20",      border: "border-rose-100 dark:border-rose-900/30" },
        ] as const).map(s => (
          <div key={s.label} className={`rounded-xl border ${s.border} ${s.bg} px-4 py-3 flex items-center justify-between shadow-sm`}>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{s.label}</span>
            <span className={`text-2xl font-extrabold ${s.color}`}>{s.count}</span>
          </div>
        ))}
      </div>

      {/* ── Tabs + Search ── */}
      <div className="flex flex-col gap-3">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <TabsList className="bg-slate-100 dark:bg-slate-900 h-9 p-0.5 rounded-lg shrink-0">
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
                  className="text-xs h-8 px-3 font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm rounded-md"
                >
                  {t.label}
                  <span className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    tab === t.value
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                  }`}>
                    {t.count}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder="Search by title, PI or ID..."
                className="pl-8 h-9 text-sm bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Single TabsContent since we filter manually */}
          <TabsContent value={tab} className="mt-4">
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                  <TableRow className="border-slate-200 dark:border-slate-800">
                    <TableHead className="h-10 text-xs font-semibold text-slate-500 uppercase tracking-wider pl-5 w-[38%]">Proposal</TableHead>
                    <TableHead className="h-10 text-xs font-semibold text-slate-500 uppercase tracking-wider">PI</TableHead>
                    <TableHead className="h-10 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</TableHead>
                    <TableHead className="h-10 text-xs font-semibold text-slate-500 uppercase tracking-wider">Evaluator</TableHead>
                    <TableHead className="h-10 text-xs font-semibold text-slate-500 uppercase tracking-wider">Budget</TableHead>
                    <TableHead className="h-10 w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-16 text-sm text-slate-400 italic">
                        No proposals match your current filters.
                      </TableCell>
                    </TableRow>
                  ) : filtered.map((p) => {
                    const cfg = STATUS_CFG[p.status];
                    return (
                      <TableRow
                        key={p.id}
                        className="border-slate-100 dark:border-slate-800 hover:bg-slate-50/70 dark:hover:bg-slate-900/40 cursor-pointer group transition-colors"
                        onClick={() => openDrawer(p)}
                      >
                        <TableCell className="pl-5 py-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-[13px] text-slate-900 dark:text-slate-100 leading-tight line-clamp-1">{p.title}</span>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{p.id} · {p.dept}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2.5">
                            <Avatar className="h-7 w-7 shrink-0">
                              <AvatarFallback className={`text-[10px] font-bold ${p.piColor}`}>{p.piAvatar}</AvatarFallback>
                            </Avatar>
                            <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300 truncate">{p.pi}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge className={`${cfg.className} border-0 shadow-none px-2 py-0.5 text-[11px] font-bold flex items-center gap-1 w-fit pointer-events-none`}>
                            {cfg.icon}{p.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4">
                          {p.evaluator ? (
                            <div className="flex items-center gap-1.5 text-[12px] font-medium text-slate-600 dark:text-slate-400">
                              <UserCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span className="truncate max-w-[120px]">{p.evaluator}</span>
                            </div>
                          ) : (
                            <span className="text-[12px] text-slate-400 font-medium italic">Unassigned</span>
                          )}
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">{p.budget}</span>
                        </TableCell>
                        <TableCell className="py-4 pr-4 text-right">
                          <Button
                            size="sm" variant="ghost"
                            className="h-8 px-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => { e.stopPropagation(); openDrawer(p); }}
                          >
                            Open <ChevronRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <p className="text-xs text-slate-400 font-medium">Showing {filtered.length} of {PROPOSALS.length} proposals</p>
                {tab !== "all" && (
                  <button onClick={() => setTab("all")} className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">
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
        <SheetContent className="w-full sm:max-w-[580px] p-0 flex flex-col" side="right">
          {selected && (
            <>
              {/* Drawer Header */}
              <SheetHeader className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-0 text-[10px] font-bold uppercase">
                      {selected.id}
                    </Badge>
                    <Badge className={`${STATUS_CFG[selected.status].className} border-0 text-[10px] font-bold flex items-center gap-1 pointer-events-none`}>
                      {STATUS_CFG[selected.status].icon}{selected.status}
                    </Badge>
                    {selected.evaluator && (
                      <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0 text-[10px] font-bold flex items-center gap-1">
                        <UserCheck className="w-3 h-3" /> {selected.evaluator}
                      </Badge>
                    )}
                  </div>
                  <SheetTitle className="text-[15px] font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {selected.title}
                  </SheetTitle>
                  <SheetDescription className="text-xs text-slate-500 font-medium">
                    {selected.dept} · Submitted {selected.submittedDate} · Budget {selected.budget}
                  </SheetDescription>
                </div>

                {/* Drawer Tab Nav */}
                <div className="flex gap-1 mt-3">
                  {(["details", "team", "history"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setDrawerTab(t)}
                      className={`px-4 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
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
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

                {/* ── TAB: DETAILS ── */}
                {drawerTab === "details" && (
                  <>
                    {selected.status === "Revision" && (
                      <div className="flex items-start gap-3 p-4 bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-900/30 rounded-xl">
                        <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-rose-800 dark:text-rose-300">Returned for Revision</p>
                          <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5">{selected.lastAction}</p>
                        </div>
                      </div>
                    )}

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Principal Investigator</p>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className={`text-[10px] font-bold ${selected.piColor}`}>{selected.piAvatar}</AvatarFallback>
                          </Avatar>
                          <span className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 truncate">{selected.pi}</span>
                        </div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Budget Requested</p>
                        <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400">{selected.budget}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Date Submitted</p>
                        <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />{selected.submittedDate}
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Team Size</p>
                        <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400" />{selected.teamCount} members
                        </p>
                      </div>
                    </div>

                    {/* Abstract */}
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-2.5">
                        <FileText className="w-3.5 h-3.5" /> Abstract
                      </h4>
                      <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 rounded-lg p-4">
                        {selected.abstract}
                      </p>
                    </div>

                    {/* Admin Workflow Actions */}
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Workflow Actions</h4>
                      <div className="flex flex-col gap-2">

                        {/* Assign Evaluator — only if Submitted */}
                        <RoleGuard allowedRoles={["RAD", "RA", "ADRPM", "AC", "VPRTT"]}>
                          {(selected.status === "Submitted" || selected.status === "Under Review") && (
                            <button
                              onClick={() => setShowAssign(true)}
                              className="flex items-center gap-3 p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-900/10 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors text-left w-full group"
                            >
                              <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg shrink-0">
                                <UserCheck className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-[13px] font-bold leading-tight">
                                  {selected.evaluator ? "Reassign Evaluator" : "Assign Evaluator"}
                                </p>
                                <p className="text-[11px] font-medium opacity-70 mt-0.5">
                                  {selected.evaluator ? `Currently: ${selected.evaluator}` : "No evaluator assigned yet"}
                                </p>
                              </div>
                              <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100" />
                            </button>
                          )}
                        </RoleGuard>

                        {/* Return for Revision — only if Under Review */}
                        <RoleGuard allowedRoles={["RAD", "RA", "ADRPM", "AC", "VPRTT", "Coordinator", "Department"]}>
                          {(selected.status === "Submitted" || selected.status === "Under Review") && (
                            <button
                              onClick={() => setShowRevision(true)}
                              className="flex items-center gap-3 p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-900/10 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/20 transition-colors text-left w-full group"
                            >
                              <div className="bg-rose-100 dark:bg-rose-900/40 p-2 rounded-lg shrink-0">
                                <RotateCcw className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-[13px] font-bold leading-tight">Return for Revision</p>
                                <p className="text-[11px] font-medium opacity-70 mt-0.5">Send back to PI with feedback</p>
                              </div>
                              <ChevronRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100" />
                            </button>
                          )}
                        </RoleGuard>

                        {/* Info notice about approval */}
                        <div className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 text-slate-500">
                          <div className="bg-slate-200 dark:bg-slate-700 p-2 rounded-lg shrink-0 mt-0.5">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[12px] font-bold leading-tight text-slate-600 dark:text-slate-400">Approval is handled by VPRTT & AC</p>
                            <p className="text-[11px] font-medium mt-0.5">Administrative roles route proposals — final approvals are reserved for senior authority.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* ── TAB: TEAM ── */}
                {drawerTab === "team" && (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-3.5 h-3.5" /> Research Team
                    </h4>
                    <div className="flex items-center gap-4 p-3.5 rounded-lg border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10">
                      <Avatar className="h-10 w-10 border-2 border-blue-200 dark:border-blue-800">
                        <AvatarFallback className={`text-xs font-bold ${selected.piColor}`}>{selected.piAvatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{selected.pi}</span>
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Principal Investigator</span>
                      </div>
                      <Badge className="ml-auto bg-blue-600 text-white border-0 text-[10px] shrink-0">PI</Badge>
                    </div>
                    <p className="text-xs text-slate-400 italic text-center py-6 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                      Full team details will appear here once connected to the backend.
                    </p>
                  </div>
                )}

                {/* ── TAB: HISTORY ── */}
                {drawerTab === "history" && (
                  <div className="flex flex-col gap-0">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-5">
                      <Clock className="w-3.5 h-3.5" /> Workflow History
                    </h4>
                    <div className="relative ml-3 border-l-2 border-slate-200 dark:border-slate-700 flex flex-col gap-0">
                      {[
                        { date: selected.submittedDate, label: "Proposal submitted by PI", type: "submit" },
                        ...(selected.evaluator ? [{ date: "Mar 14, 2025", label: `Evaluator assigned: ${selected.evaluator}`, type: "assign" }] : []),
                        ...(selected.status === "Revision" ? [{ date: "Mar 20, 2025", label: "Returned for revision with comments", type: "revision" }] : []),
                        { date: "—", label: "Awaiting next workflow action", type: "pending" },
                      ].map((ev, i) => (
                        <div key={i} className="relative pl-6 pb-7 last:pb-0">
                          <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center ${
                            ev.type === "submit"   ? "bg-blue-500" :
                            ev.type === "assign"   ? "bg-emerald-500" :
                            ev.type === "revision" ? "bg-rose-500" :
                            "bg-slate-300 dark:bg-slate-700"
                          }`} />
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{ev.date}</p>
                          <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{ev.label}</p>
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
        <DialogContent className="sm:max-w-[480px] gap-0 p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-1">
              <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <DialogTitle className="text-base font-bold">Assign Evaluator</DialogTitle>
            </div>
            <DialogDescription className="text-xs text-slate-500 ml-11">
              Select an evaluator from the faculty pool to review this proposal.
            </DialogDescription>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search evaluators by name or specialty..."
                className="pl-9 h-9 text-sm bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                value={evalSearch}
                onChange={(e) => setEvalSearch(e.target.value)}
              />
            </div>
          </DialogHeader>

          <div className="flex flex-col gap-1.5 px-4 py-4 max-h-[320px] overflow-y-auto">
            {filteredEvals.map((ev) => (
              <div
                key={ev.id}
                onClick={() => setPickedEval(ev.id)}
                className={`flex items-center gap-3.5 p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                  pickedEval === ev.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-950"
                }`}
              >
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className={`text-[11px] font-bold ${ev.color}`}>{ev.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[13px] font-semibold text-slate-900 dark:text-slate-100 truncate">{ev.name}</span>
                  <span className="text-[11px] text-slate-500 font-medium truncate">{ev.specialty}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold text-slate-400">{ev.assigned} assigned</span>
                </div>
                {pickedEval === ev.id && (
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <Button variant="outline" size="sm" className="h-9" onClick={() => setShowAssign(false)}>Cancel</Button>
            <Button
              size="sm"
              className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex-1"
              disabled={!pickedEval}
              onClick={handleAssignConfirm}
            >
              <UserCheck className="w-4 h-4 mr-1.5" />
              Confirm Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════════════════════════════════
           RETURN FOR REVISION DIALOG
         ═══════════════════════════════════════════════ */}
      <Dialog open={showRevision} onOpenChange={setShowRevision}>
        <DialogContent className="sm:max-w-[460px] gap-0 p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-1">
              <div className="bg-rose-100 dark:bg-rose-900/40 p-2 rounded-lg text-rose-600 dark:text-rose-400">
                <RotateCcw className="w-5 h-5" />
              </div>
              <DialogTitle className="text-base font-bold">Return for Revision</DialogTitle>
            </div>
            <DialogDescription className="text-xs text-slate-500 ml-11">
              Provide detailed feedback so the PI can address the identified issues and resubmit.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-5 flex flex-col gap-4">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Proposal</p>
              <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 mt-0.5 line-clamp-2">{selected?.title}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="revision-comment" className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">
                Feedback / Revision Instructions <span className="text-rose-500">*</span>
              </Label>
              <Textarea
                id="revision-comment"
                placeholder="Explain clearly what needs to be revised. For example: 'The budget justification for equipment procurement lacks detail. Please provide vendor quotes and procurement timeline.'"
                className="min-h-[140px] text-sm bg-white dark:bg-slate-950 rounded-lg resize-none focus-visible:ring-rose-400"
                value={revComment}
                onChange={(e) => setRevComment(e.target.value)}
              />
              <p className="text-[10px] text-slate-400 font-medium">{revComment.length} / 1000 characters</p>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <Button variant="outline" size="sm" className="h-9" onClick={() => setShowRevision(false)}>Cancel</Button>
            <Button
              size="sm"
              className="h-9 bg-rose-600 hover:bg-rose-700 text-white font-semibold flex-1"
              disabled={revComment.trim().length < 10}
              onClick={handleRevisionSubmit}
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Send for Revision
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
