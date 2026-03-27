"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
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
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  FileUp,
  FolderOpen,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";

/**----------------------
 * MOCK DATA
 *------------------------*/
const STEPS = [
  { title: "Draft", desc: "Basic details" },
  { title: "Team", desc: "Collaborators" },
  { title: "Budget", desc: "Funding specifics" },
  { title: "Review", desc: "Final submit" },
];

const AVAILABLE_TEAM = [
  { id: "t1", name: "Dr. Elena Rostova", role: "Co-Investigator", dept: "Physics", avatar: "ER", color: "bg-purple-100 text-purple-700" },
  { id: "t2", name: "Prof. Michael Chen", role: "AI Specialist", dept: "Computer Science", avatar: "MC", color: "bg-blue-100 text-blue-700" },
  { id: "t3", name: "Sarah Jenkins", role: "Data Analyst", dept: "Bioinformatics", avatar: "SJ", color: "bg-emerald-100 text-emerald-700" },
  { id: "t4", name: "Dr. Alan Grant", role: "Lead Researcher", dept: "Biology", avatar: "AG", color: "bg-amber-100 text-amber-700" },
  { id: "t5", name: "Dr. Emily Wong", role: "Biochemist", dept: "Chemistry", avatar: "EW", color: "bg-rose-100 text-rose-700" },
  { id: "t6", name: "James Carter", role: "Systems Engineer", dept: "Engineering", avatar: "JC", color: "bg-slate-200 text-slate-700" },
];

const AVAILABLE_ADVISORS = [
  { id: "a1", name: "Dr. Robert Ford", role: "Senior Faculty", dept: "Engineering", avatar: "RF", color: "bg-slate-200 text-slate-700" },
  { id: "a2", name: "Prof. Lisa Su", role: "Department Head", dept: "Computer Science", avatar: "LS", color: "bg-indigo-100 text-indigo-700" },
];

export default function NewProposalPage() {
  const router = useRouter();
  
  // Step state
  const [currentStep, setCurrentStep] = React.useState(0);

  // Form states
  const [title, setTitle] = React.useState("");
  const [abstract, setAbstract] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);

  const [teamSearch, setTeamSearch] = React.useState("");
  const [advisorSearch, setAdvisorSearch] = React.useState("");
  const [selectedTeam, setSelectedTeam] = React.useState<string[]>([]);
  const [selectedAdvisor, setSelectedAdvisor] = React.useState<string | null>(null);

  const [budgetRows, setBudgetRows] = React.useState([
    { id: "1", title: "Equipment", description: "Lab sensors and compute servers", amount: "5000" },
  ]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((c) => c + 1);
  };
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((c) => c - 1);
  };

  const handleToggleTeam = (id: string) => {
    setSelectedTeam((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddBudgetRow = () => {
    setBudgetRows([...budgetRows, { id: Date.now().toString(), title: "", description: "", amount: "" }]);
  };
  const handleRemoveBudgetRow = (id: string) => {
    setBudgetRows(budgetRows.filter((r) => r.id !== id));
  };
  const handleUpdateBudgetRow = (id: string, field: string, value: string) => {
    setBudgetRows(
      budgetRows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const calculateTotalBudget = () => {
    return budgetRows.reduce((acc, row) => acc + (parseFloat(row.amount) || 0), 0);
  };

  const filteredTeam = teamSearch.trim().length > 0 
    ? AVAILABLE_TEAM.filter((t) => (t.name + t.dept + t.role).toLowerCase().includes(teamSearch.toLowerCase()))
    : [];

  const filteredAdvisors = advisorSearch.trim().length > 0 
    ? AVAILABLE_ADVISORS.filter((a) => (a.name + a.dept + a.role).toLowerCase().includes(advisorSearch.toLowerCase()))
    : [];

  /**----------------------
   * RENDER STEPPER
   *------------------------*/
  const renderStepper = () => (
    <div className="relative flex justify-between w-full max-w-2xl mx-auto mb-6">
      <div className="absolute top-[16px] left-[5%] right-[5%] h-[2px] bg-slate-100 dark:bg-slate-800 -z-10" />
      <div 
        className="absolute top-[16px] left-[5%] h-[2px] bg-blue-600 transition-all duration-500 ease-in-out -z-10" 
        style={{ width: `calc(${(currentStep / (STEPS.length - 1)) * 90}%)` }}
      />
      {STEPS.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        return (
          <div key={index} className="flex flex-col items-center gap-1.5 relative z-10 w-1/4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all ease-out ${
                isActive
                  ? "bg-blue-600 text-white ring-2 ring-blue-100 dark:ring-blue-900/50"
                  : isCompleted
                  ? "bg-white text-blue-600 border-2 border-blue-600 dark:bg-slate-950 dark:border-blue-500"
                  : "bg-white text-slate-400 border border-slate-200 dark:bg-slate-950 dark:border-slate-800"
              }`}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <div className="text-center">
              <p className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? "text-blue-700 dark:text-blue-400" : isCompleted ? "text-slate-700 dark:text-slate-300" : "text-slate-400"}`}>
                {step.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 w-full max-w-6xl mx-auto gap-4">
      {/* Header */}
      <div className="flex flex-col mb-2">
        <Link href="/dashboard/proposals" className="mb-2 w-fit">
          <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-500 rounded px-2 hover:bg-slate-100 dark:hover:bg-slate-800 -ml-2 transition-all">
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Proposals
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            New Research Proposal
          </h1>
          <p className="text-[13px] text-slate-500 mt-0.5 dark:text-slate-400">
            Draft your research framework, complete your team, and organize the budget.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50 rounded-xl overflow-hidden w-full flex-1 flex flex-col pt-6 px-4 md:px-8 pb-8">
        {renderStepper()}

        <CardContent className="p-0 flex-1">
          {/* STEP 1: DRAFT */}
          {currentStep === 0 && (
            <div className="flex flex-col gap-5 max-w-3xl mx-auto mt-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid gap-1.5">
                <Label htmlFor="title" className="text-sm font-medium">Proposal Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Next-Gen Photovoltaic Micro-Cells..."
                  className="h-10 text-sm bg-white dark:bg-slate-950 rounded-md"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="abstract" className="text-sm font-medium">Abstract & Core Objectives</Label>
                <Textarea
                  id="abstract"
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  placeholder="Provide a comprehensive summary of the research scope, expected outcomes, and scientific merit..."
                  className="min-h-[140px] text-sm bg-white dark:bg-slate-950 rounded-md resize-y"
                />
              </div>
              <div className="grid gap-1.5">
                <Label className="text-sm font-medium">Supporting Document</Label>
                <div className="border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                  <FileUp className="w-5 h-5 text-slate-400 mb-2" />
                  <p className="font-medium text-[13px] text-slate-700 dark:text-slate-300">
                    Upload full proposal layout (Optional)
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">PDF or DOCX (max 10MB)</p>
                  {file && <Badge className="mt-3 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-xs shadow-none">{file.name}</Badge>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: TEAM */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:divide-x divide-slate-100 dark:divide-slate-800 mt-4 animate-in fade-in slide-in-from-right-4 duration-500 border border-slate-100 dark:border-slate-800 rounded-lg bg-slate-50/30 dark:bg-slate-900/10 min-h-[400px]">
              {/* Co-Investigators (Left) */}
              <div className="flex flex-col gap-4 p-4 lg:p-6 lg:pr-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Co-Investigators</h3>
                  <p className="text-xs text-slate-500 mb-3">Search and add team members.</p>
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <Input
                      placeholder="Search teammates by name or department..."
                      className="pl-8 h-9 text-sm rounded-md bg-white dark:bg-slate-950"
                      value={teamSearch}
                      onChange={(e) => setTeamSearch(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 overflow-y-auto pr-1">
                  {teamSearch.trim().length === 0 ? (
                    <div className="text-center p-6 text-sm text-slate-400 border border-slate-200 border-dashed rounded-md bg-white dark:bg-slate-950/50">
                      Type above to search for available collaborators.
                    </div>
                  ) : filteredTeam.length === 0 ? (
                    <div className="text-center p-4 text-xs text-slate-500 italic">No exact matches found.</div>
                  ) : (
                    filteredTeam.map((member) => {
                      const isSelected = selectedTeam.includes(member.id);
                      return (
                        <div
                          key={member.id}
                          onClick={() => handleToggleTeam(member.id)}
                          className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                            isSelected 
                            ? "border-blue-400 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm" 
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900"
                          }`}
                        >
                          <Avatar className="h-8 w-8"><AvatarFallback className={`${member.color} text-[10px] font-bold`}>{member.avatar}</AvatarFallback></Avatar>
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="font-semibold text-slate-900 dark:text-slate-100 text-[13px] truncate leading-tight">{member.name}</span>
                            <span className="text-[11px] text-slate-500 truncate leading-tight">{member.role} • {member.dept}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-500 shrink-0" />}
                        </div>
                      )
                    })
                  )}

                  {/* Selected count display inside team column */}
                  {selectedTeam.length > 0 && teamSearch.trim() === "" && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Currently Selected ({selectedTeam.length})</p>
                      <div className="flex flex-col gap-2">
                        {selectedTeam.map(id => {
                          const m = AVAILABLE_TEAM.find(t=>t.id === id);
                          return m ? (
                            <div key={id} className="flex items-center justify-between p-2 rounded-md bg-slate-100 dark:bg-slate-800/50">
                              <span className="text-xs font-medium">{m.name}</span>
                              <Button variant="ghost" size="sm" className="h-5 px-2 text-[10px] text-slate-500 hover:text-red-500" onClick={() => handleToggleTeam(id)}>Remove</Button>
                            </div>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Advisor (Right) */}
              <div className="flex flex-col gap-4 p-4 lg:p-6 lg:pl-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Primary Advisor</h3>
                  <p className="text-xs text-slate-500 mb-3">Select exactly one faculty advisor.</p>
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <Input
                      placeholder="Search advisors..."
                      className="pl-8 h-9 text-sm rounded-md bg-white dark:bg-slate-950"
                      value={advisorSearch}
                      onChange={(e) => setAdvisorSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 overflow-y-auto pr-1">
                  {advisorSearch.trim().length === 0 ? (
                    <div className="text-center p-6 text-sm text-slate-400 border border-slate-200 border-dashed rounded-md bg-white dark:bg-slate-950/50">
                      Type above to search for an advisor.
                    </div>
                  ) : filteredAdvisors.length === 0 ? (
                    <div className="text-center p-4 text-xs text-slate-500 italic">No exact matches found.</div>
                  ) : (
                    filteredAdvisors.map((adv) => {
                      const isSelected = selectedAdvisor === adv.id;
                      return (
                        <div
                          key={adv.id}
                          onClick={() => setSelectedAdvisor(adv.id)}
                          className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                            isSelected 
                            ? "border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20 shadow-sm" 
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900"
                          }`}
                        >
                          <Avatar className="h-8 w-8"><AvatarFallback className={`${adv.color} text-[10px] font-bold`}>{adv.avatar}</AvatarFallback></Avatar>
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="font-semibold text-slate-900 dark:text-slate-100 text-[13px] truncate leading-tight">{adv.name}</span>
                            <span className="text-[11px] text-slate-500 truncate leading-tight">{adv.role} • {adv.dept}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-500 shrink-0" />}
                        </div>
                      )
                    })
                  )}

                  {/* Selected count display inside advisor column */}
                  {selectedAdvisor && advisorSearch.trim() === "" && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Currently Selected</p>
                      {(() => {
                        const a = AVAILABLE_ADVISORS.find(t=>t.id === selectedAdvisor);
                        return a ? (
                          <div className="flex items-center justify-between p-2 rounded-md bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800">
                            <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-300">{a.name}</span>
                            <Button variant="ghost" size="sm" className="h-5 px-2 text-[10px] text-slate-500 hover:text-red-500" onClick={() => setSelectedAdvisor(null)}>Remove</Button>
                          </div>
                        ) : null
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BUDGET */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-4 mt-4 animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl mx-auto">
              {/* Simple Header */}
              <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-2 mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">Financial Breakdown</h3>
                  <p className="text-xs text-slate-500">Provide detailed estimate of needed funds.</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Total Requested</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    ${calculateTotalBudget().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                    <TableRow>
                      <TableHead className="w-[25%] h-9 text-xs font-semibold">Category</TableHead>
                      <TableHead className="h-9 text-xs font-semibold">Justification</TableHead>
                      <TableHead className="w-[150px] h-9 text-xs font-semibold text-right">Amount ($)</TableHead>
                      <TableHead className="w-[50px] h-9"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgetRows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="p-2">
                          <Input 
                            placeholder="e.g. Travel"
                            value={row.title}
                            onChange={(e) => handleUpdateBudgetRow(row.id, "title", e.target.value)}
                            className="h-8 text-sm focus-visible:ring-1 border-slate-200 dark:border-slate-800" 
                          />
                        </TableCell>
                        <TableCell className="p-2">
                          <Input 
                            placeholder="Details..."
                            value={row.description}
                            onChange={(e) => handleUpdateBudgetRow(row.id, "description", e.target.value)}
                            className="h-8 text-sm focus-visible:ring-1 border-slate-200 dark:border-slate-800" 
                          />
                        </TableCell>
                        <TableCell className="p-2">
                          <Input 
                            type="number"
                            placeholder="0.00"
                            value={row.amount}
                            onChange={(e) => handleUpdateBudgetRow(row.id, "amount", e.target.value)}
                            className="h-8 text-sm text-right font-medium focus-visible:ring-1 border-slate-200 dark:border-slate-800" 
                          />
                        </TableCell>
                        <TableCell className="p-2 text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleRemoveBudgetRow(row.id)}
                            className="h-8 w-8 text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAddBudgetRow}
                className="w-fit text-xs h-8 border-dashed mt-2"
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Row
              </Button>
            </div>
          )}

          {/* STEP 4: REVIEW */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl mx-auto mt-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 mb-2 flex justify-between items-end">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Review & Submit</h2>
                  <p className="text-sm text-slate-500">Please verify the details below before official submission.</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100 shadow-none border-0 uppercase tracking-widest text-[10px] font-bold">
                  Ready
                </Badge>
              </div>

              {/* Data Table Review */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex flex-col bg-white dark:bg-slate-950/50">
                {/* 1. Basic Details */}
                <div className="flex flex-col md:flex-row border-b border-slate-200 dark:border-slate-700">
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 md:w-1/4 shrink-0 border-r border-slate-200 dark:border-slate-700">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">1. Basic Details</p>
                  </div>
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5 font-medium">Proposal Title</p>
                      <p className="text-sm text-slate-900 dark:text-slate-100 font-semibold">{title || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5 font-medium">Abstract Summary</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {abstract || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5 font-medium">Attachments</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                        {file ? file.name : "None"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Team */}
                <div className="flex flex-col md:flex-row border-b border-slate-200 dark:border-slate-700">
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 md:w-1/4 shrink-0 border-r border-slate-200 dark:border-slate-700">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">2. Project Team</p>
                  </div>
                  <div className="p-4 flex flex-col gap-4 flex-1">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                      <div className="col-span-full mb-1"><p className="text-xs font-medium text-slate-500">Co-Investigators ({selectedTeam.length})</p></div>
                      {selectedTeam.length > 0 ? selectedTeam.map(id => {
                        const m = AVAILABLE_TEAM.find(t=>t.id === id);
                        return m ? (
                          <div key={id} className="text-[13px] text-slate-800 dark:text-slate-200 font-medium bg-slate-100 dark:bg-slate-800/50 px-2 py-1 rounded truncate border border-slate-200 dark:border-slate-700">
                            {m.name}
                          </div>
                        ) : null;
                      }) : <p className="text-sm text-slate-400 italic">None</p>}
                    </div>
                    <div className="mt-1">
                      <p className="text-xs font-medium text-slate-500 mb-1">Primary Advisor</p>
                      {selectedAdvisor ? (() => {
                        const a = AVAILABLE_ADVISORS.find(t=>t.id === selectedAdvisor);
                        return a ? (
                          <p className="text-[13px] font-semibold text-indigo-700 dark:text-indigo-400">{a.name} <span className="font-normal text-slate-500 ml-1">({a.dept})</span></p>
                        ) : null;
                      })() : <p className="text-sm text-slate-400 italic">None</p>}
                    </div>
                  </div>
                </div>

                {/* 3. Budget */}
                <div className="flex flex-col md:flex-row">
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 md:w-1/4 shrink-0 border-r border-slate-200 dark:border-slate-700">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">3. Budget Est.</p>
                  </div>
                  <div className="p-4 flex flex-1 items-center">
                    <div>
                      <p className="text-xs text-slate-500 mb-1 font-medium">Total Funds Requested</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-slate-100">${calculateTotalBudget().toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                      <p className="text-xs text-slate-400 mt-1">Spanning {budgetRows.length} categorized items.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </CardContent>

        {/* Navigation Footer placed nicely inside the form Card but at the bottom */}
        <div className="flex justify-between items-center w-full mt-10 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleBack} 
            disabled={currentStep === 0}
            className={`font-medium h-9 px-4 transition-opacity ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
          >
            Previous
          </Button>
          <div className="flex gap-2">
            {currentStep === 3 ? (
              <Button 
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm h-9 px-6 font-semibold border-0"
                onClick={() => router.push('/dashboard/proposals')}
              >
                Submit Proposal <CheckCircle2 className="w-4 h-4 ml-1.5" />
              </Button>
            ) : (
              <Button 
                size="sm"
                onClick={handleNext} 
                className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 h-9 px-6 shadow-sm font-semibold border-0"
              >
                Next <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </div>

      </Card>
    </div>
  );
}
