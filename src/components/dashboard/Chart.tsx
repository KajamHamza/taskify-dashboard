import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "@/services/stats";

const Chart = () => {
  // Fetch dashboard stats
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  // Transform the request data into the format expected by the chart
  const chartData = stats?.requestData?.map((item) => ({
    date: item.date,
    value: item.count,
  })) || [];

  // Debugging logs
  console.log('Fetched Stats:', stats);
  console.log('Chart Data:', chartData);

  if (isLoading) {
    return <div>Loading chart data...</div>;
  }

  if (isError) {
    return <div>Failed to load chart data.</div>;
  }

  if (chartData.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#1E40AF"
          fill="#1E40AF"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;