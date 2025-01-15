import Sidebar from "../components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar />
      <main className="flex flex-col w-full h-full ml-64 p-4 bg-gray-400">
        {children}
      </main>
    </div>
  );
}
