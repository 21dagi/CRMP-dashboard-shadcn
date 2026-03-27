"use client";

import Link from "next/link";
import { Command } from "lucide-react";
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
import { getAuthorizedAdminNavItems } from "@/navigation/sidebar/admin-nav-config";

// We reuse the existing generic Nav components from your main dash
import { NavMain } from "@/app/(main)/dashboard/_components/sidebar/nav-main";
import { NavUser } from "@/app/(main)/dashboard/_components/sidebar/nav-user";

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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

  // Dynamically compute the sidebar items based on the logged in role
  // Default to empty array if no user or role is undefined
  const dynamicNavItems = getAuthorizedAdminNavItems(user?.role || null);

  return (
    <Sidebar {...props} variant={variant} collapsible={collapsible}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link prefetch={false} href="/admin">
                <Command />
                <span className="font-semibold text-base">{APP_CONFIG.name} - Admin Space</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Pass the fully computed and permitted items to the nav list */}
        <NavMain items={dynamicNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <div className="px-2 pb-2 text-xs text-muted-foreground w-full text-center">
            Logged in as: <span className="font-bold">{user?.role || "Unknown"}</span>
          </div>
        </SidebarMenu>
        {/* We can re-use the generic user menu component for Admin sidebar */}
        <NavUser user={rootUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
