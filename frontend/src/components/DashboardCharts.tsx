"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { RecommendationResponse } from "@/lib/api";

interface Props {
  data: RecommendationResponse[];
}

export function DashboardCharts({ data }: Props) {
  // Transform data for the chart
  const chartData = data.map((item) => ({
    name: item.product_name.substring(0, 15) + (item.product_name.length > 15 ? "..." : ""),
    stock: item.current_stock,
    rop: item.reorder_point,
    isLow: item.current_stock < item.reorder_point
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-deep-coal border border-steel-border p-3 rounded-lg shadow-xl">
          <p className="text-snow font-medium mb-1">{label}</p>
          <p className="text-blue-cornflower text-sm">Stock: {payload[0].value}</p>
          <p className="text-ash text-sm">ROP: {payload[0].payload.rop}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#313131" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#8A8A8A" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#8A8A8A" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            dx={-10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#222' }} />
          <Bar dataKey="stock" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.isLow ? '#f87171' : '#6798ff'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
