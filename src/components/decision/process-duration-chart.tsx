"use client";

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ProcessDurationRecord } from "@/types";

export function ProcessDurationChart({ data }: { data: ProcessDurationRecord[] }) {
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis type="number" />
          <YAxis type="category" dataKey="node" width={80} />
          <Tooltip />
          <Bar dataKey="avgDays" fill="#06b6d4" radius={[0, 4, 4, 0]}>
            <LabelList dataKey="avgDays" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
