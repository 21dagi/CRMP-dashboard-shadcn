"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Send,
  History,
  Clock,
  FileText,
  Filter,
} from "lucide-react";

// Mock Data
const proposals = [
  {
    id: "PRP-042",
    title: "Quantum Computing Simulation Framework",
    abstract: "Developing a robust framework for simulating 128-qubit environments...",
    status: "Under Review",
    lastModified: "2 days ago",
    date: "Oct 24, 2026",
    color: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200/50",
  },
  {
    id: "PRP-043",
    title: "AI Health Diagnostics",
    abstract: "A machine learning pipeline for early stage oncology detection...",
    status: "Approved",
    lastModified: "1 week ago",
    date: "Oct 18, 2026",
    color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200/50",
  },
  {
    id: "PRP-044",
    title: "Neural Interface Robotics Control",
    abstract: "Brain-computer interface protocols for advanced robotic prosthetics.",
    status: "Revisions Required",
    lastModified: "4 hours ago",
    date: "Oct 26, 2026",
    color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200/50",
  },
  {
    id: "PRP-045",
    title: "Climate Change Predictive Modeling",
    abstract: "Utilizing distributed sensor networks to predict local weather anomalies.",
    status: "Draft",
    lastModified: "Just now",
    date: "Oct 26, 2026",
    color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200/50",
  },
  {
    id: "PRP-046",
    title: "Advanced Bio-Polymers Synthesis",
    abstract: "Biodegradable polymer synthesis using modified cyanobacteria.",
    status: "Rejected",
    lastModified: "3 weeks ago",
    date: "Oct 02, 2026",
    color: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200/50",
  },
  {
    id: "PRP-047",
    title: "Next-Gen Photovoltaic Cells",
    abstract: "Improving solar efficiency using perovskite tandem cells.",
    status: "Submitted",
    lastModified: "1 day ago",
    date: "Oct 25, 2026",
    color: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200/50",
  },
];

export default function ProposalsPage() {
  const [activeTab, setActiveTab] = React.useState("all");

  const filteredProposals = proposals.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "drafts") return p.status === "Draft";
    if (activeTab === "submitted") return p.status === "Submitted";
    if (activeTab === "under-review") return p.status === "Under Review";
    if (activeTab === "revisions") return p.status === "Revisions Required";
    if (activeTab === "approved") return p.status === "Approved";
    if (activeTab === "rejected") return p.status === "Rejected";
    return true;
  });

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Proposals Management
          </h1>
          <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">
            Create, track, and manage the lifecycle of your research proposals.
          </p>
        </div>
        
        <Link href="/dashboard/proposals/new" className="w-full sm:w-auto">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow hover:shadow-md transition-all w-full rounded-full px-6 font-medium border-0">
            <Plus className="mr-2 h-4 w-4" /> New Proposal
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="overflow-x-auto pb-1 w-full md:w-auto -mb-1 scrollbar-hide">
              <TabsList className="bg-slate-100/50 dark:bg-slate-900/50 p-1 border border-slate-200/50 dark:border-slate-800/50 rounded-lg">
                <TabsTrigger value="all" className="rounded-md px-4 data-[state=active]:shadow-sm">All</TabsTrigger>
                <TabsTrigger value="drafts" className="rounded-md px-4 data-[state=active]:shadow-sm">Drafts</TabsTrigger>
                <TabsTrigger value="submitted" className="rounded-md px-4 data-[state=active]:shadow-sm">Submitted</TabsTrigger>
                <TabsTrigger value="under-review" className="rounded-md px-4 data-[state=active]:shadow-sm">Under Review</TabsTrigger>
                <TabsTrigger value="revisions" className="rounded-md px-4 data-[state=active]:shadow-sm">Revisions</TabsTrigger>
                <TabsTrigger value="approved" className="rounded-md px-4 data-[state=active]:shadow-sm">Approved</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex w-full md:w-auto items-center gap-2">
              <div className="relative w-full md:w-[240px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search proposals..."
                  className="w-full pl-9 rounded-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-sm"
                />
              </div>
              <Button variant="outline" size="icon" className="shrink-0 rounded-full bg-white dark:bg-slate-950 shadow-sm border-slate-200 dark:border-slate-800">
                <Filter className="h-4 w-4 text-slate-600" />
              </Button>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <Card className="shadow-none border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950/50 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <Table>
                <TableHeader className="bg-slate-50/50 dark:bg-slate-900/20">
                  <TableRow className="border-slate-100 dark:border-slate-800 hover:bg-transparent">
                    <TableHead className="text-slate-500 font-medium h-11 px-6 w-[100px]">ID</TableHead>
                    <TableHead className="text-slate-500 font-medium h-11 px-6">Proposal Details</TableHead>
                    <TableHead className="text-slate-500 font-medium h-11 px-6">Status</TableHead>
                    <TableHead className="text-slate-500 font-medium h-11 px-6 hidden md:table-cell">Last Updated</TableHead>
                    <TableHead className="text-slate-500 font-medium h-11 px-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProposals.length > 0 ? (
                    filteredProposals.map((proposal) => (
                      <TableRow
                        key={proposal.id}
                        className="border-slate-100 dark:border-slate-800/50 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20"
                      >
                        <TableCell className="font-medium text-slate-600 dark:text-slate-400 py-4 px-6 text-xs">
                          {proposal.id}
                        </TableCell>
                        <TableCell className="py-4 px-6 max-w-[300px] lg:max-w-[400px]">
                          <div className="flex flex-col gap-1.5">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                              {proposal.title}
                            </span>
                            <span className="text-xs text-slate-500 line-clamp-1">
                              {proposal.abstract}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          <Badge
                            variant="outline"
                            className={`${proposal.color} shadow-none inline-flex items-center rounded px-2.5 py-0.5 whitespace-nowrap`}
                          >
                            {proposal.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 px-6 hidden md:table-cell">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                              {proposal.date}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {proposal.lastModified}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4 text-slate-500" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg">
                              <DropdownMenuLabel className="font-normal text-xs text-slate-500">
                                Proposal Actions
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <Link href={`/dashboard/proposals/${proposal.id}`}>
                                <DropdownMenuItem className="cursor-pointer">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                              </Link>
                              
                              {proposal.status === "Draft" || proposal.status === "Revisions Required" ? (
                                <DropdownMenuItem className="cursor-pointer text-blue-600 dark:text-blue-400">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Continue Editing
                                </DropdownMenuItem>
                              ) : null}
                              
                              {proposal.status === "Draft" && (
                                <DropdownMenuItem className="cursor-pointer text-emerald-600 dark:text-emerald-400">
                                  <Send className="mr-2 h-4 w-4" />
                                  Submit Proposal
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="cursor-pointer">
                                <History className="mr-2 h-4 w-4" />
                                View History
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-slate-500">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <FileText className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                          <p>No proposals found in this category.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
