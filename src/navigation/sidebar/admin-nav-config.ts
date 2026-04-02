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

import { ADMIN_SIDEBAR_PERMISSION_RULES } from "@/access-control/sidebar-permission-config";
import { hasPermission } from "@/access-control/permission-gates";
import { SIDEBAR_UNCONFIGURED_ROUTES_VISIBILITY } from "@/access-control/sidebar-permission-config";

export interface NavMainItem {
  title: string;
  url: string;
  icon: LucideIcon;
  subItems?: { title: string; url: string }[];
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

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
      },
      {
        title: "Evaluations",
        url: "/admin/evaluations",
        icon: CheckSquare,
      },
      {
        title: "Progress",
        url: "/admin/progress",
        icon: Activity,
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
      },
      {
        title: "Requests",
        url: "/admin/requests",
        icon: MessageSquare,
      },
      {
        title: "Publications",
        url: "/admin/publications",
        icon: BookOpen,
      },
      {
        title: "Users & Roles",
        url: "/admin/users",
        icon: Users,
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
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
    ]
  }
];

export function getAuthorizedAdminNavItems(permissions: string[] | null | undefined): NavGroup[] {
  const safePermissions = permissions ?? [];

  // PI space permission is `PROJECT_CREATE`. Admin sidebar should be hidden for PI users.
  // (The `/admin` routes themselves are protected by `AdminPermissionGuard`.)
  if (hasPermission(safePermissions, "PROJECT_CREATE")) return [];

  return adminSidebarItems
    .map((group) => {
      const filteredItems = group.items.filter((item) => {
        const required = ADMIN_SIDEBAR_PERMISSION_RULES[item.url];
        // Unknown routes visibility is configurable.
        if (!required || required.length === 0) {
          return SIDEBAR_UNCONFIGURED_ROUTES_VISIBILITY === "visible";
        }

        // Sidebar visibility uses OR semantics: show if the user has any required permission.
        return required.some((p) => hasPermission(safePermissions, p));
      });

      return {
        ...group,
        items: filteredItems,
      };
    })
    .filter((group) => group.items.length > 0);
}
