import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  CheckSquare,
  Activity,
  DollarSign,
  MessageSquare,
  BookOpen,
  Users,
  Bell,
  BarChart,
  History,
  Settings,
  LucideIcon
} from "lucide-react";

import { UserRole } from "@/context/SessionContext";

export interface NavMainItem {
  title: string;
  url: string;
  icon: LucideIcon;
  allowedRoles?: UserRole[]; // If undefined, available to all
  subItems?: { title: string; url: string }[];
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

// Complete list of all roles based on the matrix
const ALL_ADMIN_ROLES: UserRole[] = [
  "RAD", "RA", "ADRPM", "AC", "VPRTT", "Finance", 
  "Coordinator", "Department", "College/School", "PGMO", "Examiner/Evaluator"
];

// Reusable arrays for permissions based on the role access matrix
const NO_FINANCE_PGMO: UserRole[] = ALL_ADMIN_ROLES.filter(r => r !== "Finance" && r !== "PGMO");
const PROGRESS_ROLES: UserRole[] = ["RAD", "RA", "ADRPM", "AC", "Finance", "VPRTT"];
const BUDGET_ROLES: UserRole[] = ["RAD", "RA", "ADRPM", "AC", "VPRTT", "Finance"];
const REQUEST_ROLES: UserRole[] = ["RAD", "RA", "ADRPM", "AC", "VPRTT", "Finance", "Coordinator", "Department"];
const PUBLICATION_ROLES: UserRole[] = ["RAD", "RA", "ADRPM", "AC", "VPRTT", "PGMO"];
const SUPER_ADMIN_ROLES: UserRole[] = ["RAD", "ADRPM", "AC"];
const AUDIT_ROLES: UserRole[] = ["RAD", "ADRPM", "AC", "Finance"];

export const adminSidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Projects",
        url: "/admin/projects",
        icon: FolderOpen,
      },
      {
        title: "Proposals",
        url: "/admin/proposals",
        icon: FileText,
        allowedRoles: NO_FINANCE_PGMO,
      },
      {
        title: "Evaluations",
        url: "/admin/evaluations",
        icon: CheckSquare,
        allowedRoles: NO_FINANCE_PGMO,
      },
      {
        title: "Progress",
        url: "/admin/progress",
        icon: Activity,
        allowedRoles: PROGRESS_ROLES,
      },
    ],
  },
  {
    id: 2,
    label: "Management & Finance",
    items: [
      {
        title: "Budget",
        url: "/admin/budget",
        icon: DollarSign,
        allowedRoles: BUDGET_ROLES,
      },
      {
        title: "Requests",
        url: "/admin/requests",
        icon: MessageSquare,
        allowedRoles: REQUEST_ROLES,
      },
      {
        title: "Publications",
        url: "/admin/publications",
        icon: BookOpen,
        allowedRoles: PUBLICATION_ROLES,
      },
      {
        title: "Users & Roles",
        url: "/admin/users",
        icon: Users,
        allowedRoles: SUPER_ADMIN_ROLES,
      },
    ],
  },
  {
    id: 3,
    label: "Insights & Settings",
    items: [
      {
        title: "Reports",
        url: "/admin/reports",
        icon: BarChart,
      },
      {
        title: "Notifications",
        url: "/admin/notifications",
        icon: Bell,
      },
      {
        title: "Audit Log",
        url: "/admin/audit",
        icon: History,
        allowedRoles: AUDIT_ROLES,
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ]
  }
];

export function getAuthorizedAdminNavItems(role: UserRole): NavGroup[] {
  if (!role || role === "PI") return []; // PI has no access to admin sidebar

  return adminSidebarItems.map(group => {
    // Filter items based on user role
    const filteredItems = group.items.filter(item => {
      // If no roles specified, it's public for all admins
      if (!item.allowedRoles) return true;
      // Otherwise, see if current role is in allowed list
      return item.allowedRoles.includes(role);
    });

    return {
      ...group,
      items: filteredItems
    };
  }).filter(group => group.items.length > 0); // Remove empty groups
}
