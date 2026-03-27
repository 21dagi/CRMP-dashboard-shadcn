"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Edit,
  FileText,
  History,
  MessageSquare,
  MoreVertical,
  Paperclip,
  Send,
  User,
} from "lucide-react";

export default function ProposalDetailsPage() {
  const params = useParams();
  const id = params?.id || "PRP-044";

  // Mock data for the specific proposal
  const proposal = {
    id: id,
    title: "Neural Interface Robotics Control",
    status: "Revisions Required",
    date: "Oct 26, 2026",
    abstract:
      "This proposal outlines a framework for developing real-time brain-computer interfaces (BCI) designed to control advanced robotic prosthetics with sub-millisecond latency. By leveraging deep learning models, we aim to translate neural oscillations directly into motor commands, circumventing traditional nerve pathways damaged by spinal injuries.",
    objectives: [
      "Develop a low-latency neural decoding algorithm.",
      "Integrate the BCI with a standard robotic arm prototype.",
      "Conduct clinical trials with 10 participants over 6 months.",
    ],
    budget: "$450,000",
    investigator: "Dr. Sarah Jenkins",
    department: "Bioengineering",
    version: "v1.2",
    color: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200/50",
  };

  const feedback = [
    {
      id: 1,
      author: "Eval Committee",
      role: "Review Board",
      avatar: "EC",
      date: "Oct 25, 2026",
      text: "The theoretical models are sound, but the hardware integration section lacks specificity. Please outline the specific sensor modules you plan to use for the robotic arm prototype.",
      type: "revision",
    },
    {
      id: 2,
      author: "Dr. Alan Grant",
      role: "Co-Investigator",
      avatar: "AG",
      date: "Oct 24, 2026",
      text: "I've added the budget breakdown for the clinical trials to the appendix.",
      type: "comment",
    },
  ];

  const history = [
    { version: "v1.2", date: "Oct 26, 2026", action: "Status changed to Revisions Required", author: "System" },
    { version: "v1.1", date: "Oct 24, 2026", action: "Submitted for Review", author: "Dr. Sarah Jenkins" },
    { version: "v1.0", date: "Oct 18, 2026", action: "Proposal Created", author: "Dr. Sarah Jenkins" },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* Top Navigation */}
      <div className="flex items-center gap-2 mb-2">
        <Link href="/dashboard/proposals">
          <Button variant="ghost" size="sm" className="h-8 shadow-none text-slate-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Proposals
          </Button>
        </Link>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs font-semibold px-2 py-0.5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700">
              {proposal.id}
            </Badge>
            <Badge variant="outline" className={`${proposal.color} shadow-none inline-flex items-center rounded px-2.5 py-0.5 font-medium`}>
              {proposal.status}
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {proposal.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {proposal.investigator}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> Last Updated: {proposal.date}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-auto rounded-full font-medium">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <Button className="flex-1 md:flex-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium border-0 shadow-sm">
            <Edit className="mr-2 h-4 w-4" /> Edit Proposal
          </Button>
        </div>
      </div>

      {/* Tabs Layout */}
      <Tabs defaultValue="overview" className="w-full mt-2">
        <TabsList className="bg-transparent p-0 border-b border-slate-200 dark:border-slate-800 w-full justify-start rounded-none h-12 flex-nowrap overflow-x-auto scrollbar-hide">
          <TabsTrigger 
            value="overview" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400 py-3 px-6 font-medium text-slate-500"
          >
            <FileText className="mr-2 h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger 
            value="feedback" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400 py-3 px-6 font-medium text-slate-500"
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Feedback & Comments
            <Badge className="ml-2 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0 hover:bg-amber-100 rounded-full px-1.5 py-0 h-4">1</Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-400 py-3 px-6 font-medium text-slate-500"
          >
            <History className="mr-2 h-4 w-4" /> Version History
          </TabsTrigger>
        </TabsList>

        <div className="py-6">
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0 focus-visible:outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <Card className="shadow-none border-slate-200/50 dark:border-slate-800/50 rounded-xl overflow-hidden">
                  <CardHeader className="bg-slate-50/50 dark:bg-slate-900/10 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <CardTitle className="text-lg text-slate-800 dark:text-slate-200">Abstract</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {proposal.abstract}
                  </CardContent>
                </Card>

                <Card className="shadow-none border-slate-200/50 dark:border-slate-800/50 rounded-xl overflow-hidden">
                  <CardHeader className="bg-slate-50/50 dark:bg-slate-900/10 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <CardTitle className="text-lg text-slate-800 dark:text-slate-200">Key Objectives</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {proposal.objectives.map((obj, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/20 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                          <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                          <span className="leading-tight mt-0.5">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Details */}
              <div className="flex flex-col gap-6">
                <Card className="shadow-none border-slate-200/50 dark:border-slate-800/50 rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base text-slate-800 dark:text-slate-200">Proposal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 font-medium">Department</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{proposal.department}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 font-medium">Est. Budget</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{proposal.budget}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500 font-medium">Current Version</span>
                      <Badge variant="secondary" className="font-semibold rounded">{proposal.version}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-none border-slate-200/50 dark:border-slate-800/50 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-blue-800 dark:text-blue-300">Required Action</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-blue-700/80 dark:text-blue-400">
                    <p className="mb-4">This proposal requires revisions based on evaluator feedback before it can move forward.</p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium shadow-sm transition-all border-0">
                      Review Feedback
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="mt-0 focus-visible:outline-none">
            <Card className="shadow-none border-slate-200/50 dark:border-slate-800/50 rounded-xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
              
              {/* Feedback List */}
              <div className="w-full md:w-1/2 lg:w-3/5 border-r border-slate-100 dark:border-slate-800 flex flex-col bg-slate-50/30 dark:bg-slate-900/10">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 font-semibold text-slate-800 dark:text-slate-200">
                  Reviewer Comments
                </div>
                <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
                  {feedback.map((fb) => (
                    <div key={fb.id} className="flex gap-4 items-start">
                      <Avatar className={`h-10 w-10 border ${fb.type === 'revision' ? 'border-amber-200' : 'border-slate-200'}`}>
                        <AvatarFallback className={`font-semibold text-sm ${fb.type === 'revision' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-slate-100 text-slate-700'}`}>
                          {fb.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1.5 flex-1">
                        <div className="flex items-baseline gap-2 justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">{fb.author}</span>
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">{fb.role}</span>
                          </div>
                          <span className="text-[11px] font-medium text-slate-400">{fb.date}</span>
                        </div>
                        <div className={`p-4 rounded-xl text-sm leading-relaxed border ${
                          fb.type === 'revision' 
                            ? 'bg-amber-50/50 border-amber-100 text-amber-900 dark:bg-amber-900/10 dark:border-amber-800/50 dark:text-amber-200' 
                            : 'bg-white border-slate-200 text-slate-700 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300'
                        }`}>
                          {fb.text}
                          {fb.type === 'revision' && (
                            <Badge className="mt-3 block w-fit bg-amber-500 hover:bg-amber-600 border-0 rounded-sm px-2 py-0">Required Revision</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Area */}
              <div className="w-full md:w-1/2 lg:w-2/5 p-6 flex flex-col bg-white dark:bg-slate-950">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">Post a Response or Note</h3>
                <Textarea 
                  placeholder="Type your response or internal note here..." 
                  className="flex-1 min-h-[200px] resize-none border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 bg-slate-50 dark:bg-slate-900/50 rounded-xl"
                />
                <div className="flex justify-between items-center mt-4">
                  <Button variant="ghost" size="icon" className="text-slate-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium shadow-sm transition-all border-0 px-6">
                    <Send className="mr-2 h-4 w-4" /> Send Update
                  </Button>
                </div>
              </div>

            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-0 focus-visible:outline-none">
            <Card className="shadow-none border-slate-200/50 dark:border-slate-800/50 rounded-xl w-full max-w-3xl">
              <CardHeader className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 pb-4">
                <CardTitle className="text-lg text-slate-800 dark:text-slate-200">Revision History</CardTitle>
                <CardDescription>Track all versions and status changes for this proposal.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {history.map((item, i) => (
                    <div key={i} className="flex gap-6 relative">
                      {i !== history.length - 1 && (
                        <div className="absolute left-[5.5rem] top-8 bottom-[-2rem] w-px bg-slate-200 dark:bg-slate-800" />
                      )}
                      <div className="w-16 shrink-0 text-right pt-1">
                        <Badge variant="outline" className="font-semibold bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300 rounded border-slate-200 border">{item.version}</Badge>
                      </div>
                      <div className="relative z-10 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-950 mt-1.5 shrink-0" />
                      <div className="flex flex-col gap-1 pb-2 flex-1">
                        <p className="font-medium text-slate-800 dark:text-slate-100">{item.action}</p>
                        <p className="text-sm text-slate-500">By {item.author}</p>
                        <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">{item.date}</p>
                      </div>
                      <Button variant="outline" size="sm" className="hidden sm:flex rounded-full text-xs h-8">View Version</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
}
