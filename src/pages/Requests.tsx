import { FileText } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";

const Requests = () => {
  return (
    <div className="min-h-screen dashboard-gradient">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Requests"
              value="3,456"
              icon={FileText}
              description="All time"
            />
            <StatsCard
              title="Pending"
              value="123"
              icon={FileText}
              description="Awaiting action"
            />
            <StatsCard
              title="In Progress"
              value="456"
              icon={FileText}
              description="Currently active"
            />
            <StatsCard
              title="Completed"
              value="2,877"
              icon={FileText}
              description="Successfully finished"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Requests;