import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "Jan", value: 100 },
  { date: "Feb", value: 200 },
  { date: "Mar", value: 150 },
  { date: "Apr", value: 300 },
  { date: "May", value: 250 },
  { date: "Jun", value: 400 },
];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
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