import Sidebar from "@/components/custom/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar />
      {/* ml-64 사이드바 너비 왼쪽 조절 */}
      <main className="flex flex-col w-full h-full ml-64 p-4 bg-gray-400">
        {children}
      </main>
    </div>
  );
}
