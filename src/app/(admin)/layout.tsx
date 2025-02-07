import { AppSidebar } from "@/components/custom/appsidebar/app-sidebar";
import TopHeaderBar from "@/components/custom/topheaderbar/TopHeaderBar";
import { Separator, SidebarInset, SidebarProvider } from "@/components/ui";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <TopHeaderBar />
          <Separator />
          {children}
        </SidebarInset>
      </SidebarProvider>
    // </ThemeProvider>
  );
}
