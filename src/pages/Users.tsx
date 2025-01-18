import { Users as UsersIcon } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatsCard from "@/components/dashboard/StatsCard";

const Users = () => {
  return (
    <div className="min-h-screen dashboard-gradient">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Clients"
              value="2,543"
              icon={UsersIcon}
              description="+180 from last month"
            />
            <StatsCard
              title="Active Providers"
              value="1,234"
              icon={UsersIcon}
              description="+20% increase"
            />
            <StatsCard
              title="Pending Approvals"
              value="45"
              icon={UsersIcon}
              description="Service providers awaiting approval"
            />
            <StatsCard
              title="Blocked Users"
              value="23"
              icon={UsersIcon}
              description="Total blocked accounts"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users;