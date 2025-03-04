import Sidebar from "./Sidebar";

export default function Layout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}