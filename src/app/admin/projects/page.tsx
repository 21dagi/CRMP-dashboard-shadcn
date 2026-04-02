"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Filter,
  FolderOpen,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { Can } from "@/access-control/permission-gates";

// ─── TYPES ──────────────────────────────────────────────────────────
interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  color: string;
}

interface TimelineEvent {
  date: string;
  label: string;
  status: "done" | "active" | "upcoming";
}

interface Project {
  id: string;
  name: string;
  code: string;
  pi: string;
  piAvatar: string;
  piColor: string;
  dept: string;
  status: "Active" | "Under Review" | "Completed" | "Suspended" | "Pending";
  progress: number;
  budget: string;
  startDate: string;
  endDate: string;
  abstract: string;
  team: TeamMember[];
  timeline: TimelineEvent[];
}

// ─── MOCK DATA ───────────────────────────────────────────────────────
const MOCK_PROJECTS: Project[] = [
  {
    id: "PRJ-001",
    name: "Advanced Deep Learning for Medical Imagery Analysis",
    code: "PRJ-001",
    pi: "Dr. L. Vance",
    piAvatar: "LV",
    piColor: "bg-purple-100 text-purple-700",
    dept: "Computer Science",
    status: "Active",
    progress: 72,
    budget: "$128,000",
    startDate: "Jan 2024",
    endDate: "Dec 2025",
    abstract:
      "This project investigates the application of deep convolutional networks and transformer-based architectures for automated disease detection in radiological imagery. The primary goal is to achieve radiologist-level accuracy on publicly available benchmark datasets.",
    team: [
      { name: "Dr. S. Patel", role: "Co-Investigator", avatar: "SP", color: "bg-blue-100 text-blue-700" },
      { name: "M. Chen", role: "Research Assistant", avatar: "MC", color: "bg-emerald-100 text-emerald-700" },
      { name: "Prof. A. Ibrahim", role: "Advisor", avatar: "AI", color: "bg-amber-100 text-amber-700" },
    ],
    timeline: [
      { date: "Jan 2024", label: "Project Kickoff & Setup", status: "done" },
      { date: "Jun 2024", label: "Phase 1: Data Collection Complete", status: "done" },
      { date: "Dec 2024", label: "Phase 2: Model Training & Evaluation", status: "active" },
      { date: "Jun 2025", label: "Phase 3: Clinical Trials & Validation", status: "upcoming" },
      { date: "Dec 2025", label: "Final Report & Publication", status: "upcoming" },
    ],
  },
  {
    id: "PRJ-002",
    name: "Sustainable Renewable Energy Infrastructure",
    code: "PRJ-002",
    pi: "Prof. E. Stark",
    piAvatar: "ES",
    piColor: "bg-emerald-100 text-emerald-700",
    dept: "Engineering",
    status: "Under Review",
    progress: 40,
    budget: "$245,000",
    startDate: "Mar 2024",
    endDate: "Mar 2026",
    abstract:
      "A comprehensive study on deploying scalable micro-grid solutions powered by solar and wind in rural sub-Saharan Africa. Analyzes cost efficiency, maintenance models, and socio-economic impact on local communities.",
    team: [
      { name: "Dr. F. Nakamura", role: "Co-Investigator", avatar: "FN", color: "bg-blue-100 text-blue-700" },
      { name: "B. Alemu", role: "Field Engineer", avatar: "BA", color: "bg-slate-200 text-slate-700" },
    ],
    timeline: [
      { date: "Mar 2024", label: "Proposal Approved", status: "done" },
      { date: "Sep 2024", label: "Feasibility Study", status: "done" },
      { date: "Mar 2025", label: "Pilot Deployment", status: "active" },
      { date: "Mar 2026", label: "Scale & Final Assessment", status: "upcoming" },
    ],
  },
  {
    id: "PRJ-003",
    name: "Quantum Computing Algorithm Optimization",
    code: "PRJ-003",
    pi: "Dr. A. Turing",
    piAvatar: "AT",
    piColor: "bg-blue-100 text-blue-700",
    dept: "Physics",
    status: "Completed",
    progress: 100,
    budget: "$310,000",
    startDate: "Feb 2022",
    endDate: "Feb 2024",
    abstract:
      "Research into hybrid classical-quantum algorithms for solving NP-hard optimization problems in logistics and molecular simulation. Results published in Nature Quantum Information.",
    team: [
      { name: "Dr. G. Bell", role: "Co-Investigator", avatar: "GB", color: "bg-indigo-100 text-indigo-700" },
      { name: "R. Feynman Jr.", role: "Researcher", avatar: "RF", color: "bg-rose-100 text-rose-700" },
    ],
    timeline: [
      { date: "Feb 2022", label: "Project Initiated", status: "done" },
      { date: "Aug 2022", label: "Literature Review Done", status: "done" },
      { date: "Feb 2023", label: "Algorithm Prototype", status: "done" },
      { date: "Aug 2023", label: "Performance Benchmarking", status: "done" },
      { date: "Feb 2024", label: "Publication & Closure", status: "done" },
    ],
  },
  {
    id: "PRJ-004",
    name: "Bioinformatics Genomic Sequencing Pipeline",
    code: "PRJ-004",
    pi: "Dr. E. Wong",
    piAvatar: "EW",
    piColor: "bg-rose-100 text-rose-700",
    dept: "Bioinformatics",
    status: "Suspended",
    progress: 28,
    budget: "$95,000",
    startDate: "May 2024",
    endDate: "May 2026",
    abstract:
      "Development of a scalable, open-source genomic pipeline for processing next-generation sequencing data with a focus on rare disease identification in Ethiopian populations. Suspended pending ethics board re-review.",
    team: [
      { name: "M. Haile", role: "Data Analyst", avatar: "MH", color: "bg-amber-100 text-amber-700" },
    ],
    timeline: [
      { date: "May 2024", label: "IRB Ethics Approval", status: "done" },
      { date: "Aug 2024", label: "Pipeline Architecture Design", status: "done" },
      { date: "Nov 2024", label: "Data Collection (Suspended)", status: "active" },
      { date: "Feb 2025", label: "Analysis Phase", status: "upcoming" },
    ],
  },
  {
    id: "PRJ-005",
    name: "Urban Traffic Flow AI Optimization",
    code: "PRJ-005",
    pi: "Prof. R. Musa",
    piAvatar: "RM",
    piColor: "bg-amber-100 text-amber-700",
    dept: "Urban Planning",
    status: "Pending",
    progress: 5,
    budget: "$78,000",
    startDate: "Apr 2025",
    endDate: "Apr 2027",
    abstract:
      "Using real-time sensor data and reinforcement learning to improve urban traffic signal coordination in Addis Ababa. Aims to reduce average commute time by 20%.",
    team: [
      { name: "H. Tesfaye", role: "ML Engineer", avatar: "HT", color: "bg-blue-100 text-blue-700" },
      { name: "Dr. Y. Kebede", role: "Advisor", avatar: "YK", color: "bg-emerald-100 text-emerald-700" },
    ],
    timeline: [
      { date: "Apr 2025", label: "Proposal Submission", status: "active" },
      { date: "Jul 2025", label: "Budget Approval", status: "upcoming" },
      { date: "Oct 2025", label: "Sensor Deployment", status: "upcoming" },
      { date: "Apr 2027", label: "Final Report", status: "upcoming" },
    ],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  Active:        { label: "Active",        className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: <CheckCircle2 className="w-3 h-3" /> },
  "Under Review":{ label: "Under Review", className: "bg-blue-100    text-blue-700    dark:bg-blue-900/30    dark:text-blue-400",    icon: <Clock className="w-3 h-3" /> },
  Completed:     { label: "Completed",     className: "bg-slate-200   text-slate-600   dark:bg-slate-700     dark:text-slate-300",   icon: <BookOpen className="w-3 h-3" /> },
  Suspended:     { label: "Suspended",     className: "bg-red-100     text-red-700     dark:bg-red-900/30    dark:text-red-400",     icon: <XCircle className="w-3 h-3" /> },
  Pending:       { label: "Pending",       className: "bg-amber-100   text-amber-700   dark:bg-amber-900/30  dark:text-amber-400",   icon: <AlertTriangle className="w-3 h-3" /> },
};

const PROGRESS_COLOR = (p: number) =>
  p === 100 ? "bg-emerald-500" : p >= 60 ? "bg-blue-600" : p >= 30 ? "bg-amber-500" : "bg-red-500";

// ─── PAGE ────────────────────────────────────────────────────────────
export default function AdminProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "team" | "timeline">("overview");

  const filtered = MOCK_PROJECTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.pi.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openDrawer = (project: Project) => {
    setSelected(project);
    setActiveTab("overview");
  };

  return (
    <div className="flex flex-col flex-1 p-4 md:p-6 lg:p-8 gap-6">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            Projects Registry
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage and inspect all active university research projects.</p>
        </div>
        <Can permission="ADMIN_VIEW">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm h-9 font-semibold text-sm rounded-lg">
            <Download className="w-4 h-4 mr-2" /> Export Registry
          </Button>
        </Can>
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by project name, PI, or code..."
            className="pl-9 h-9 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-lg text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400 ml-1" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-[160px] text-sm bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-lg">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {["All", "Active", "Under Review", "Completed", "Suspended", "Pending"].map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
            <TableRow className="border-slate-200 dark:border-slate-800">
              <TableHead className="h-10 font-semibold text-xs text-slate-500 uppercase tracking-wider pl-5 w-[35%]">Project</TableHead>
              <TableHead className="h-10 font-semibold text-xs text-slate-500 uppercase tracking-wider">Principal Investigator</TableHead>
              <TableHead className="h-10 font-semibold text-xs text-slate-500 uppercase tracking-wider">Status</TableHead>
              <TableHead className="h-10 font-semibold text-xs text-slate-500 uppercase tracking-wider w-[180px]">Progress</TableHead>
              <TableHead className="h-10 font-semibold text-xs text-slate-500 uppercase tracking-wider">Budget</TableHead>
              <TableHead className="h-10 w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-16 text-sm text-slate-400 italic">
                  No projects match your search.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((project) => {
                const cfg = STATUS_CONFIG[project.status];
                return (
                  <TableRow
                    key={project.id}
                    className="border-slate-100 dark:border-slate-800 hover:bg-slate-50/70 dark:hover:bg-slate-900/40 cursor-pointer group transition-colors"
                    onClick={() => openDrawer(project)}
                  >
                    {/* Name + Code */}
                    <TableCell className="pl-5 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-[13px] text-slate-900 dark:text-slate-100 leading-tight line-clamp-1">{project.name}</span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{project.code} · {project.dept}</span>
                      </div>
                    </TableCell>

                    {/* PI */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7 shrink-0">
                          <AvatarFallback className={`text-[10px] font-bold ${project.piColor}`}>{project.piAvatar}</AvatarFallback>
                        </Avatar>
                        <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300 truncate">{project.pi}</span>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="py-4">
                      <Badge className={`${cfg.className} border-0 shadow-none px-2 py-0.5 text-[11px] font-bold flex items-center gap-1 w-fit pointer-events-none`}>
                        {cfg.icon}{cfg.label}
                      </Badge>
                    </TableCell>

                    {/* Progress */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${PROGRESS_COLOR(project.progress)}`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-[12px] font-bold text-slate-600 dark:text-slate-400 w-9 text-right shrink-0">{project.progress}%</span>
                      </div>
                    </TableCell>

                    {/* Budget */}
                    <TableCell className="py-4">
                      <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">{project.budget}</span>
                    </TableCell>

                    {/* View */}
                    <TableCell className="py-4 text-right pr-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 px-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => { e.stopPropagation(); openDrawer(project); }}
                      >
                        View <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Footer count */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">Showing {filtered.length} of {MOCK_PROJECTS.length} projects</p>
          {statusFilter !== "All" && (
            <button onClick={() => setStatusFilter("All")} className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Clear filter
            </button>
          )}
        </div>
      </div>

      {/* ── Project Details Drawer ── */}
      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-[560px] p-0 flex flex-col" side="right">
          {selected && (
            <>
              {/* Drawer Header */}
              <SheetHeader className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-0 text-[10px] font-bold uppercase">{selected.code}</Badge>
                      <Badge className={`${STATUS_CONFIG[selected.status].className} border-0 text-[10px] font-bold flex items-center gap-1 pointer-events-none`}>
                        {STATUS_CONFIG[selected.status].icon}{selected.status}
                      </Badge>
                    </div>
                    <SheetTitle className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {selected.name}
                    </SheetTitle>
                    <SheetDescription className="text-xs text-slate-500 font-medium">
                      {selected.dept} · {selected.startDate} → {selected.endDate}
                    </SheetDescription>
                  </div>
                </div>

                {/* Progress in header */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${PROGRESS_COLOR(selected.progress)}`}
                      style={{ width: `${selected.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 w-10 text-right shrink-0">{selected.progress}%</span>
                </div>

                {/* Tab Nav */}
                <div className="flex gap-1 mt-4">
                  {(["overview", "team", "timeline"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
                        activeTab === tab
                          ? "bg-blue-600 text-white"
                          : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </SheetHeader>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

                {/* ── TAB: OVERVIEW ── */}
                {activeTab === "overview" && (
                  <>
                    {/* Key Stats Row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">PI</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className={`text-[9px] font-bold ${selected.piColor}`}>{selected.piAvatar}</AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{selected.pi}</p>
                        </div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Budget</p>
                        <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">{selected.budget}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Start Date</p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{selected.startDate}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">End Date</p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{selected.endDate}</p>
                      </div>
                    </div>

                    {/* Abstract */}
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-3">
                        <FileText className="w-3.5 h-3.5" /> Abstract
                      </h4>
                      <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 rounded-lg p-4">
                        {selected.abstract}
                      </p>
                    </div>

                    {/* Admin Actions */}
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Admin Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        <Can permission="BUDGET_APPROVE">
                          <Button size="sm" variant="outline" className="text-xs h-8 font-semibold">
                            Approve Budget Release
                          </Button>
                        </Can>

                        <Can permission="PROJECT_REJECT">
                          <Button size="sm" variant="outline" className="text-xs h-8 font-semibold text-red-600 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20">
                            Suspend / Terminate
                          </Button>
                        </Can>
                        <Button size="sm" variant="outline" className="text-xs h-8 font-semibold">
                          View Report
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {/* ── TAB: TEAM ── */}
                {activeTab === "team" && (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                      <Users className="w-3.5 h-3.5" /> Research Team ({selected.team.length + 1} members)
                    </h4>

                    {/* PI Row */}
                    <div className="flex items-center gap-4 p-3.5 rounded-lg border border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10">
                      <Avatar className="h-10 w-10 border-2 border-blue-200 dark:border-blue-800">
                        <AvatarFallback className={`text-xs font-bold ${selected.piColor}`}>{selected.piAvatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{selected.pi}</span>
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Principal Investigator</span>
                      </div>
                      <Badge className="ml-auto bg-blue-600 text-white border-0 text-[10px] shrink-0">PI</Badge>
                    </div>

                    {/* Team Members */}
                    {selected.team.map((m, i) => (
                      <div key={i} className="flex items-center gap-4 p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/20 hover:bg-slate-100/60 dark:hover:bg-slate-900/40 transition-colors">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={`text-xs font-bold ${m.color}`}>{m.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{m.name}</span>
                          <span className="text-xs text-slate-500 font-medium">{m.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── TAB: TIMELINE ── */}
                {activeTab === "timeline" && (
                  <div className="flex flex-col gap-0">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-5">
                      <Clock className="w-3.5 h-3.5" /> Project Milestones
                    </h4>
                    <div className="relative ml-3 border-l-2 border-slate-200 dark:border-slate-700 flex flex-col gap-0">
                      {selected.timeline.map((event, i) => (
                        <div key={i} className="relative pl-6 pb-7 last:pb-0">
                          {/* Dot */}
                          <div className={`absolute -left-[9px] top-0.5 h-4 w-4 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center ${
                            event.status === "done"
                              ? "bg-emerald-500"
                              : event.status === "active"
                              ? "bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/30"
                              : "bg-slate-300 dark:bg-slate-700"
                          }`}>
                            {event.status === "done" && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{event.date}</p>
                          <p className={`text-sm font-semibold mt-0.5 ${
                            event.status === "done"
                              ? "text-slate-600 dark:text-slate-400"
                              : event.status === "active"
                              ? "text-blue-700 dark:text-blue-400"
                              : "text-slate-400 dark:text-slate-600"
                          }`}>
                            {event.label}
                          </p>
                          {event.status === "active" && (
                            <span className="inline-block mt-1 text-[10px] font-bold text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-full">IN PROGRESS</span>
                          )}
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
    </div>
  );
}
