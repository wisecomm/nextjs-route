"use client";
import {
  LucideIcon,
  LayoutDashboard,
  BadgeDollarSign,
  CircleUserRound,
  Settings,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import SidebarItem from "./sidebar-item";

interface ISidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const items: ISidebarItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "페이지 테스트",
    path: "/pagetest",
    icon: BadgeDollarSign,
    items: [
      {
        name: "데이터 테이블 테스트",
        path: "/datatabletest",
      },
      {
        name: "데이터 테이블 테스트(1)",
        path: "/datatabletest1",
      },
      {
        name: "지불 리스트 테스트",
        path: "/payments",
      },
    ],
  },
  {
    name: "Payment",
    path: "/payments",
    icon: WalletCards,
  },
  {
    name: "Accounts",
    path: "/accounts",
    icon: CircleUserRound,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
    items: [
      {
        name: "General",
        path: "/settings",
      },
      {
        name: "Security",
        path: "/settings/security",
      },
      {
        name: "Notifications",
        path: "/settings/notifications",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10 p-4">
      <Image width={50} height={50} src="/image/logo.png" alt="Logo" />
      <div className="flex flex-col space-y-2">
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
