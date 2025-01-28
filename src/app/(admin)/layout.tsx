import { AppSidebar } from "@/components/custom/appsidebar/app-sidebar";
import Sidebar from "@/components/custom/sidebar";
import { ThemeProvider } from "@/components/custom/ThemeProvider";
import TopHeaderBar from "@/components/custom/topheaderbar/TopHeaderBar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
        </SidebarInset>
        </SidebarProvider>
    </ThemeProvider>
  );
}
