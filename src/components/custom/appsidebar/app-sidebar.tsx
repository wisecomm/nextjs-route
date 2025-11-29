"use client";

import {
  BookOpen,
  PieChart,
  Settings2,
  SquareTerminal,
  LucideIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main";
import NavTop from "./nav-top";
import { Separator } from "@/components/ui/separator";

import { useMenu } from "@/contexts/MenuContext";
import { Menu } from "@/types";

// Icon mapping based on menu IDs or names
const iconMapping: Record<string, LucideIcon> = {
  "1": PieChart, // Dashboard
  "2": Settings2, // System Management
  "3": BookOpen, // User Management (example)
  // Add more mappings as needed
  "default": SquareTerminal,
};

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

function buildMenuTree(menus: Menu[]): NavItem[] {
  const rootMenus = menus.filter(menu => !menu.parentId);

  // Sort root menus by sortId
  rootMenus.sort((a, b) => {
    const sortA = parseInt(a.sortId || "0", 10);
    const sortB = parseInt(b.sortId || "0", 10);
    return sortA - sortB;
  });

  return rootMenus.map(menu => {
    const children = menus.filter(child => child.parentId === menu.id);

    // Sort children menus by sortId
    children.sort((a, b) => {
      const sortA = parseInt(a.sortId || "0", 10);
      const sortB = parseInt(b.sortId || "0", 10);
      return sortA - sortB;
    });

    const icon = iconMapping[menu.id] || iconMapping["default"];

    return {
      title: menu.name,
      url: menu.path || "#",
      icon: icon,
      isActive: false, // You might want to determine this based on current path
      items: children.length > 0 ? children.map(child => ({
        title: child.name,
        url: child.path || "#",
      })) : undefined,
    };
  });
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { menus } = useMenu();
  const items = buildMenuTree(menus);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavTop />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
