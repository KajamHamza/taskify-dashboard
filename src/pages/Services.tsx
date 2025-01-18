import { Box } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";

const Services = () => {
  return (
    <div className="min-h-screen dashboard-gradient">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Services"
              value="1,234"
              icon={Box}
              description="Active services"
            />
            <StatsCard
              title="Categories"
              value="24"
              icon={Box}
              description="Service categories"
            />
            <StatsCard
              title="Average Rating"
              value="4.5"
              icon={Box}
              description="Across all services"
            />
            <StatsCard
              title="New Services"
              value="45"
              icon={Box}
              description="Added this month"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;