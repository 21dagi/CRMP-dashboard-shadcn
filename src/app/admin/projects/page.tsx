import { FolderOpen, MoreHorizontal, FileText } from "lucide-react";
import { RoleGuard } from "@/components/auth/role-guard";
import { Button } from "@/components/ui/button";

export default function AdminProjectsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects Workspace</h1>
          <p className="mt-2 text-muted-foreground">
            Manage, inspect, and approve active projects. (Demonstrating Component-Level Role Guards)
          </p>
        </div>
        
        {/* Only Super Admins and Finance can create/approve entirely new bulk budgets */}
        <RoleGuard allowedRoles={["RAD", "Finance", "ADRPM", "AC"]}>
          <Button variant="default">
            Approve Master Budget
          </Button>
        </RoleGuard>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Sample Project Cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div className="flex items-center gap-2 font-semibold">
              <FolderOpen className="h-5 w-5 text-primary" />
              Project Name #{i}
            </div>
            <p className="text-sm text-muted-foreground">
              Status: Under Review
            </p>
            
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="secondary" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                View Details
              </Button>
              
              {/* Only RAD and Contextual Coordinators can explicitly close out projects */}
              <RoleGuard allowedRoles={["RAD", "Coordinator"]}>
                <Button variant="outline" className="w-full text-destructive border-destructive/20 hover:bg-destructive/10 justify-start">
                  Force Terminate
                </Button>
              </RoleGuard>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
