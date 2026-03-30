"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  AlertCircle,
  Bell,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronRight,
  Coins,
  FileCheck2,
  FileSearch,
  FileText,
  Files,
  LayoutDashboard,
  Search,
  ShieldAlert,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";

// Mock User Context (for Role-Based UI demo)
const currentUser = {
  name: "Dr. Admin",
  role: "Finance", // e.g. VPRTT, RAD, Finance
};

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col flex-1 w-full min-h-screen bg-slate-50/50 dark:bg-slate-950/20 p-4 md:p-6 lg:p-8 xl:p-10 z-0">

      {/* ----------------- TOP HEADER ----------------- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-blue-600 dark:text-blue-500" />
            Research Control Center
          </h1>
          <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400">
            Welcome back, {currentUser.name}. Here's an overview of the university research ecosystem today.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search projects, researchers..."
              className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-full h-10 shadow-sm"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-full shadow-sm border-slate-200 dark:border-slate-800 h-10 w-10 shrink-0 bg-white dark:bg-slate-900 relative">
            <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 border-2 border-white dark:border-slate-900"></span>
          </Button>
          <Avatar className="h-10 w-10 border-2 border-white dark:border-slate-800 shadow-sm shrink-0">
            <AvatarFallback className="bg-blue-600 text-white font-bold text-sm">AD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* ----------------- STAT SUMMARY CARDS ----------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 mb-8 w-full">
        {/* Total Projects */}
        <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm bg-white dark:bg-slate-950 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Briefcase className="h-6 w-6" />
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0 pointer-events-none">+12% from last month</Badge>
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Active Projects</p>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">142</h2>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm bg-white dark:bg-slate-950 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <Badge className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border-0 pointer-events-none">Requires Attention</Badge>
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Pending Approvals</p>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">28</h2>
          </CardContent>
        </Card>

        {/* Budget Requests */}
        <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm bg-white dark:bg-slate-950 hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 bg-gradient-to-bl from-blue-500 to-transparent w-full h-full pointer-events-none" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Coins className="h-6 w-6" />
              </div>
              <Badge className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-0 pointer-events-none">6 Awaiting Release</Badge>
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Budget Processing</p>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              <span className="text-2xl font-semibold mr-1 text-slate-400">$</span>2.4M
            </h2>
          </CardContent>
        </Card>

        {/* Completed Projects */}
        <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm bg-white dark:bg-slate-950 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Completed (YTD)</p>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">56</h2>
          </CardContent>
        </Card>
      </div>

      {/* ----------------- TWO-COLUMN MAIN LAYOUT ----------------- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 w-full">

        {/* ========== LEFT AREA (Larger) ========== */}
        <div className="xl:col-span-2 flex flex-col gap-6 xl:gap-8">

          {/* Charts Row (Mock CSS Bars) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm bg-white dark:bg-slate-950">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">Project Status Distribution</CardTitle>
                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Lifecycle Stages</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 mt-2 mb-2">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-sm font-medium"><span className="text-slate-600 dark:text-slate-400">Review & Evaluation</span><span className="font-bold">45</span></div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden"><div className="bg-sky-500 h-full rounded-full w-[45%]"></div></div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-sm font-medium"><span className="text-slate-600 dark:text-slate-400">Active Execution</span><span className="font-bold">78</span></div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden"><div className="bg-blue-600 h-full rounded-full w-[78%]"></div></div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-sm font-medium"><span className="text-slate-600 dark:text-slate-400">Completed & Closed</span><span className="font-bold">19</span></div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden"><div className="bg-emerald-500 h-full rounded-full w-[19%]"></div></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm bg-white dark:bg-slate-950">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">Budget Trend Overview</CardTitle>
                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">Funding Requested vs Approved</CardDescription>
              </CardHeader>
              <CardContent className="mt-4 flex items-end gap-2 h-[120px] pl-4">
                {/* Visual Chart Bars Mockup */}
                {[40, 60, 45, 80, 50, 95].map((val, i) => (
                  <div key={i} className="flex flex-col justify-end items-center flex-1 group h-full">
                    <div className="w-full mx-1 bg-gradient-to-t from-indigo-500 to-blue-400 rounded-t-md opacity-80 group-hover:opacity-100 transition-opacity" style={{ height: `${val}%` }} />
                    <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase">M{i + 1}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Core Admin Actions Panel */}
          <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm bg-white dark:bg-slate-950">
            <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">Administrative Action Hub</CardTitle>
              <CardDescription className="text-xs font-medium text-slate-500">Fast access to operational workflows based on your clearance.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
              {/* Action 1 */}
              <div className="p-6 flex flex-col items-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 group transition-colors">
                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                  <FileSearch className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Evaluations</h4>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Assign Reviewers</p>
              </div>
              {/* Action 2 */}
              <div className="p-6 flex flex-col items-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 group transition-colors">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 p-3 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                  <Coins className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Budget Release</h4>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Approve Tranches</p>
              </div>
              {/* Action 3 */}
              <div className="p-6 flex flex-col items-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 group transition-colors relative">
                <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 p-3 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Terminations</h4>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Handle Extensions</p>
              </div>
              {/* Action 4 */}
              <div className="p-6 flex flex-col items-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 group transition-colors">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 p-3 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                  <UserCog className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">User Roles</h4>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">Manage Personnel</p>
              </div>
            </CardContent>
          </Card>

          {/* Pending Reviews Table */}
          <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm bg-white dark:bg-slate-950 overflow-hidden">
            <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800">
              <div>
                <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">Recent Proposal Submissions</CardTitle>
                <CardDescription className="text-xs font-medium text-slate-500 mt-1">Ready for high-level administrative review.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 h-8 font-semibold">View All Register <ChevronRight className="w-4 h-4 ml-1" /></Button>
            </CardHeader>
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-slate-900/30">
                <TableRow className="border-slate-100 dark:border-slate-800">
                  <TableHead className="font-semibold text-xs text-slate-600 dark:text-slate-400 h-10 w-[45%]">Project Title</TableHead>
                  <TableHead className="font-semibold text-xs text-slate-600 dark:text-slate-400 h-10">Lead PI</TableHead>
                  <TableHead className="font-semibold text-xs text-slate-600 dark:text-slate-400 h-10 w-[120px]">Status</TableHead>
                  <TableHead className="font-semibold text-xs text-slate-600 dark:text-slate-400 h-10 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { title: "Advanced Deep Learning For Medical Imagery", pi: "Dr. L. Vance", status: "Under Review", badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
                  { title: "Sustainable Renewable Energy Systems", pi: "Prof. E. Stark", status: "Pending Release", badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
                  { title: "Quantum Computing Algorithms", pi: "Dr. A. Turing", status: "Completed", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
                ].map((row, idx) => (
                  <TableRow key={idx} className="border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 group">
                    <TableCell className="font-semibold text-[13px] text-slate-900 dark:text-slate-100 truncate max-w-0">{row.title}</TableCell>
                    <TableCell className="text-[12px] font-medium text-slate-500 truncate max-w-[100px]">{row.pi}</TableCell>
                    <TableCell>
                      <Badge className={`${row.badge} shadow-none border-0 text-[10px] uppercase font-bold px-2 py-0.5 pointer-events-none`}>{row.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="h-7 text-xs font-semibold rounded group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">Inspect</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

        </div>

        {/* ========== RIGHT AREA (Smaller) ========== */}
        <div className="flex flex-col gap-6 xl:gap-8">

          {/* Urgent Priority Tasks */}
          <Card className="border-red-200/50 dark:border-red-900/30 shadow-sm bg-gradient-to-b from-white to-red-50/30 dark:from-slate-950 dark:to-red-950/10">
            <CardHeader className="pb-3 border-b border-red-100 dark:border-red-900/20">
              <CardTitle className="text-md font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" /> Action Required
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-3">
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-red-100 dark:border-red-900/30 shadow-sm cursor-pointer hover:border-red-300 dark:hover:border-red-800 transition-colors">
                <div className="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 p-2 rounded-md shrink-0">
                  <Files className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900 dark:text-slate-200">Extension Request: PRJ-901</h4>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">Dr. Carter requested a 3-month timeline extension. Review needed.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-amber-100 dark:border-amber-900/30 shadow-sm cursor-pointer hover:border-amber-300 dark:hover:border-amber-800 transition-colors">
                <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 p-2 rounded-md shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-900 dark:text-slate-200">Team Replacement Conflict</h4>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">Pending approval to replace Co-PI in Active Project P-204.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Timeline / Activity */}
          <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-sm bg-white dark:bg-slate-950 flex-col flex-1 h-full min-h-[#300px]">
            <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-md font-bold text-slate-800 dark:text-slate-100">Live System Activity</CardTitle>
            </CardHeader>
            <CardContent className="pr-2 pl-6 pt-6 pb-6 border-l-2 border-slate-100 dark:border-slate-800 ml-6 flex flex-col gap-8 relative flex-1">
              {/* Activity 1 */}
              <div className="relative">
                <span className="absolute -left-[35px] bg-emerald-100 dark:bg-emerald-900/40 border-2 border-white dark:border-slate-950 text-emerald-600 dark:text-emerald-400 h-6 w-6 rounded-full flex items-center justify-center top-0 shadow-sm">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">10 mins ago</p>
                <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 leading-tight mb-0.5">Project P-908 Budget Finalized</p>
                <p className="text-xs text-slate-500 font-medium">Finance Dept released Phase II funding.</p>
              </div>
              {/* Activity 2 */}
              <div className="relative">
                <span className="absolute -left-[35px] bg-blue-100 dark:bg-blue-900/40 border-2 border-white dark:border-slate-950 text-blue-600 dark:text-blue-400 h-6 w-6 rounded-full flex items-center justify-center top-0 shadow-sm">
                  <FileText className="w-3.5 h-3.5" />
                </span>
                <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">1 hr ago</p>
                <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 leading-tight mb-0.5">New Proposal Uploaded</p>
                <p className="text-xs text-slate-500 font-medium">Submitted by Dr. Emily Wong (Chemistry).</p>
              </div>
              {/* Activity 3 */}
              <div className="relative">
                <span className="absolute -left-[35px] bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-950 text-slate-600 dark:text-slate-400 h-6 w-6 rounded-full flex items-center justify-center top-0 shadow-sm">
                  <UserPlus className="w-3.5 h-3.5" />
                </span>
                <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Yesterday</p>
                <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 leading-tight mb-0.5">Reviewer Access Granted</p>
                <p className="text-xs text-slate-500 font-medium">Assigned Prof X to Evaluate Sub-023.</p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
