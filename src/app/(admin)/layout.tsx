import { AppSidebar } from "@/components/custom/appsidebar/app-sidebar";
import TopHeaderBar from "@/components/custom/topheaderbar/TopHeaderBar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { MenuProvider } from "@/contexts/MenuContext";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin management area",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ThemeProvider>
    <SidebarProvider>
      <MenuProvider>
        <AppSidebar />
        <SidebarInset>
          <TopHeaderBar />
          <Separator />
          {children}
        </SidebarInset>
      </MenuProvider>
    </SidebarProvider>
    // </ThemeProvider>
  );
}
