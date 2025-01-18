import { Users, ShoppingBag, FileText, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "./StatsCard";
import Chart from "./Chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchDashboardStats } from "@/services/stats";

const Overview = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers.toString() || "0"}
          icon={Users}
          description="+20.1% from last month"
        />
        <StatsCard
          title="Total Services"
          value={stats?.totalServices.toString() || "0"}
          icon={ShoppingBag}
          description="+15% from last month"
        />
        <StatsCard
          title="Active Requests"
          value={stats?.totalRequests.toString() || "0"}
          icon={FileText}
          description="12 pending approval"
        />
        <StatsCard
          title="Revenue"
          value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
          icon={DollarSign}
          description="+25% from last month"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart />
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;