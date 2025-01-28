import Sidebar from "@/components/custom/sidebar";
import { ThemeProvider } from "@/components/custom/ThemeProvider";
import TopHeaderBar from "@/components/custom/topheaderbar/TopHeaderBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
    <div className="flex h-screen w-full bg-white">
      <Sidebar />
      {/* ml-64 사이드바 너비 왼쪽 조절 */}
      {/* <div className="ml-64 w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col"> */}
      <div className="flex flex-col w-full h-full ml-64 bg-gray-400">
        <TopHeaderBar />
        {children}
      </div>
    </div>
    </ThemeProvider>
  );
}
