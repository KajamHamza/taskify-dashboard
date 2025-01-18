import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Overview from "@/components/dashboard/Overview";

const Index = () => {
  return (
    <div className="min-h-screen dashboard-gradient">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-6">
          <Overview />
        </div>
      </main>
    </div>
  );
};

export default Index;