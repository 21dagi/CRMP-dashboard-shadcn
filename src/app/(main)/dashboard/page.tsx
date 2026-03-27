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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle2,
  Clock,
  FileText,
  FolderOpen,
  Plus,
  Users,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  // Mock data for projects
  const projects = [
    {
      name: "AI Health Diagnostics",
      status: "Active",
      progress: 75,
      team: 6,
      badgeColor:
        "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium border-blue-200/50 dark:border-blue-800/50",
    },
    {
      name: "Quantum Computing Simulation",
      status: "In Review",
      progress: 40,
      team: 4,
      badgeColor:
        "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-medium border-amber-200/50 dark:border-amber-800/50",
    },
    {
      name: "Neural Interface Robotics",
      status: "Delayed",
      progress: 20,
      team: 5,
      badgeColor:
        "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 font-medium border-red-200/50 dark:border-red-800/50",
    },
    {
      name: "Climate Change Modeling",
      status: "Active",
      progress: 90,
      team: 8,
      badgeColor:
        "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium border-blue-200/50 dark:border-blue-800/50",
    },
  ];

  // Mock data for recent activity
  const activities = [
    {
      title: "Evaluation submitted",
      desc: "Dr. Smith submitted eval for AI Health Diagnostics.",
      time: "2h ago",
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50 dark:text-emerald-400",
    },
    {
      title: "Proposal updated",
      desc: "Quantum Computing Phase 2 draft uploaded.",
      time: "5h ago",
      icon: FileText,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-400",
    },
    {
      title: "Deadline approaching",
      desc: "Neural Interface milestone due in 3 days.",
      time: "1d ago",
      icon: Clock,
      color: "text-amber-600 bg-amber-100 dark:bg-amber-900/50 dark:text-amber-400",
    },
    {
      title: "New team member",
      desc: "Alice joined Climate Change Modeling.",
      time: "2d ago",
      icon: Users,
      color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-400",
    },
  ];

  // Mock data for direct messages/notifications
  const directMessages = [
    {
      sender: "Dr. Elena Rostova",
      avatar: "ER",
      role: "Co-Investigator",
      message: "Please review the updated Phase 1 budget allocations when you have a moment.",
      time: "10m ago",
      unread: true,
      avatarColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
    },
    {
      sender: "Prof. Michael Chen",
      avatar: "MC",
      role: "Lead Researcher",
      message: "I've uploaded the new methodology drafts. Let me know what you think.",
      time: "1h ago",
      unread: false,
      avatarColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
    },
    {
      sender: "Sarah Jenkins",
      avatar: "SJ",
      role: "Project Manager",
      message: "The evaluation committee just fully approved our timeline extension!",
      time: "2h ago",
      unread: false,
      avatarColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
    }
  ];

  return (
    <div className="flex flex-1 flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Principal Investigator Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 dark:text-slate-400 font-medium">
            Welcome back. Here&apos;s an overview of your research projects and team.
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow hover:shadow-md transition-all sm:w-auto w-full rounded-full px-6 font-medium border-0">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {/* Summary Cards - Horizontal Scrolling on Mobile */}
      <div className="flex w-full overflow-x-auto gap-6 pb-2 snap-x snap-mandatory">
        <Card className="min-w-[280px] flex-1 snap-center shadow-none border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-950/50 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Active Projects
            </CardTitle>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <FolderOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">12</div>
            <p className="text-xs text-slate-500 font-medium mt-1.5">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card className="min-w-[280px] flex-1 snap-center shadow-none border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-950/50 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Pending Proposals
            </CardTitle>
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">4</div>
            <p className="text-xs text-slate-500 font-medium mt-1.5">2 awaiting faculty review</p>
          </CardContent>
        </Card>
        
        <Card className="min-w-[280px] flex-1 snap-center shadow-none border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-950/50 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Team Members
            </CardTitle>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">24</div>
            <p className="text-xs text-slate-500 font-medium mt-1.5">Across all active projects</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-1">
        {/* Project List / Insights */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="shadow-none border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-950/50 rounded-xl h-full flex flex-col overflow-hidden">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/10 pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg text-slate-800 dark:text-slate-200 font-semibold tracking-tight">
                    Active Projects Oversight
                  </CardTitle>
                  <CardDescription className="text-sm mt-1 font-medium text-slate-500">
                    Track the progress and status of your ongoing research grants.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-100 dark:border-slate-800 hover:bg-transparent">
                    <TableHead className="text-slate-500 font-medium tracking-tight h-11 px-6">Project Name</TableHead>
                    <TableHead className="text-slate-500 font-medium tracking-tight h-11 px-6">Status</TableHead>
                    <TableHead className="text-slate-500 font-medium hidden sm:table-cell tracking-tight h-11 px-6">Progress</TableHead>
                    <TableHead className="text-slate-500 font-medium text-right tracking-tight h-11 px-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow
                      key={project.name}
                      className="border-slate-100 dark:border-slate-800/50 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/20 group"
                    >
                      <TableCell className="font-medium text-slate-800 dark:text-slate-200 py-4 px-6">
                        {project.name}
                        <div className="text-xs text-slate-500 mt-0.5 sm:hidden">{project.team} members</div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <Badge
                          variant="outline"
                          className={`${project.badgeColor} shadow-none inline-flex items-center rounded px-2.5 py-0.5`}
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell w-[30%] py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Progress
                            value={project.progress}
                            className="h-1.5 bg-slate-100 dark:bg-slate-800 w-full"
                          />
                          <span className="text-xs text-slate-500 font-medium min-w-[3.5ch]">
                            {project.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4 px-6">
                        <Button variant="ghost" size="sm" className="font-medium text-blue-600 dark:text-blue-400 group-hover:bg-blue-50 group-hover:dark:bg-blue-900/20 rounded-full h-8 px-3">
                          View <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Notifications and Activity Feed */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Notifications / Direct Messages */}
          <Card className="shadow-none border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-950/50 rounded-xl">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/10 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg text-slate-800 dark:text-slate-200 font-semibold tracking-tight">
                  Recent Messages
                </CardTitle>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 shadow-none border-0 font-semibold px-2 hover:bg-blue-100">
                  3 New
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 px-4 sm:px-6">
              <div className="flex flex-col gap-5">
                {directMessages.map((msg, i) => (
                  <div key={i} className="flex gap-4 items-start group cursor-pointer">
                    <div className="relative mt-1">
                      <Avatar className="h-10 w-10 border border-slate-100 dark:border-slate-800 group-hover:ring-2 ring-blue-500/30 transition-all">
                        <AvatarFallback className={`${msg.avatarColor} font-semibold text-sm`}>
                          {msg.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {msg.unread && (
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-white dark:ring-slate-950" />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 overflow-hidden">
                      <div className="flex justify-between items-baseline gap-2">
                        <p className={`text-sm truncate ${msg.unread ? 'font-semibold text-slate-900 dark:text-slate-100' : 'font-medium text-slate-800 dark:text-slate-200'}`}>
                          {msg.sender}
                        </p>
                        <p className="text-[10px] text-slate-400 font-medium shrink-0 whitespace-nowrap">
                          {msg.time}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 leading-none">{msg.role}</p>
                      <p className={`text-[13px] line-clamp-2 leading-relaxed ${msg.unread ? 'text-slate-700 dark:text-slate-300 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="shadow-none border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-950/50 rounded-xl flex-1">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/10 pb-4">
              <CardTitle className="text-lg text-slate-800 dark:text-slate-200 font-semibold tracking-tight">
                Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 px-6">
              <div className="space-y-6">
                {activities.map((act, i) => (
                  <div key={i} className="flex gap-4 items-start relative group">
                    {/* Timeline Line */}
                    {i !== activities.length - 1 && (
                      <div className="absolute left-[15px] top-10 bottom-[-24px] w-px bg-slate-100 dark:bg-slate-800 transition-colors" />
                    )}
                    
                    <div className="relative z-10 flex items-center justify-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-950 ${act.color}`}
                      >
                        <act.icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1 pb-1">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-none">
                        {act.title}
                      </p>
                      <p className="text-[13px] text-slate-500 leading-relaxed mt-1">
                        {act.desc}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1.5 uppercase tracking-wider">
                        {act.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
