"use client";

import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
  } from "lucide-react";
  
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main";
import NavTop from "./nav-top";
import { Separator } from "@/components/ui/separator";

// Menu items.
const items = [
    {
        title: "조직관리",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "조직도",
            url: "/systemsetting",
          },
          {
            title: "인사정보",
            url: "/payments",
          },
        ],
      },
        {
        title: "통계 관리",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "서비스별 통계",
            url: "#",
          },
          {
            title: "조직별 통계",
            url: "#",
          },
          {
            title: "프로토콜 통계",
            url: "#",
          },
        ],
      },
      {
        title: "이력관리",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "작업 이력",
            url: "#",
          },
          {
            title: "접속 이력",
            url: "#",
          },
        ],
      },
      {
        title: "환경 설정",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "시스템 설정",
            url: "#",
          },
          {
            title: "프로토콜 설정",
            url: "#",
          },
        ],
      },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
  