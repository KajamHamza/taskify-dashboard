import { Users, ShoppingBag, FileText, DollarSign } from "lucide-react";
import StatsCard from "./StatsCard";
import Chart from "./Chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Overview = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value="1,234"
          icon={Users}
          description="+20.1% from last month"
        />
        <StatsCard
          title="Total Services"
          value="342"
          icon={ShoppingBag}
          description="+15% from last month"
        />
        <StatsCard
          title="Active Requests"
          value="56"
          icon={FileText}
          description="12 pending approval"
        />
        <StatsCard
          title="Revenue"
          value="$12,345"
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