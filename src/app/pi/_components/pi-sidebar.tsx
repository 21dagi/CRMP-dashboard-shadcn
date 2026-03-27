"use client";

import Link from "next/link";
import { Command, Folder, PlusCircle, Activity, Settings, Bell } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { APP_CONFIG } from "@/config/app-config";
import { rootUser } from "@/data/users";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";
import { useSession } from "@/context/SessionContext";

import { NavMain } from "@/app/(main)/dashboard/_components/sidebar/nav-main";
import { NavUser } from "@/app/(main)/dashboard/_components/sidebar/nav-user";

// The PI has a static, specific workflow entirely separated from administrative noise.
const piNavItems = [
  {
    id: 1,
    label: "Main",
    items: [
      {
        title: "New Proposal",
        url: "/pi/proposals/new",
        icon: PlusCircle,
      },
      {
        title: "My Projects",
        url: "/pi/projects",
        icon: Folder,
      },
      {
        title: "Progress Reports",
        url: "/pi/progress",
        icon: Activity,
      },
      {
        title: "Notifications",
        url: "/pi/notifications",
        icon: Bell,
      },
      {
        title: "Settings",
        url: "/pi/settings",
        icon: Settings,
      },
    ],
  },
];

export function PiSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { sidebarVariant, sidebarCollapsible, isSynced } = usePreferencesStore(
    useShallow((s) => ({
      sidebarVariant: s.sidebarVariant,
      sidebarCollapsible: s.sidebarCollapsible,
      isSynced: s.isSynced,
    })),
  );

  const { user } = useSession();
  const variant = isSynced ? sidebarVariant : props.variant;
  const collapsible = isSynced ? sidebarCollapsible : props.collapsible;

  return (
    <Sidebar {...props} variant={variant} collapsible={collapsible}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link prefetch={false} href="/pi">
                <Command />
                <span className="font-semibold text-base">{APP_CONFIG.name} - PI Space</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={piNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <div className="px-2 pb-2 text-xs text-muted-foreground w-full text-center">
             PI Access Profile for <span className="font-bold">{user?.name || "Investigator"}</span>
          </div>
        </SidebarMenu>
        <NavUser user={rootUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
