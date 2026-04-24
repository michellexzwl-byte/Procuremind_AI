"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monitoringData } from "@/mock/data";

export function MetricsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>近一周平台指标趋势</CardTitle>
      </CardHeader>
      <CardContent className="h-[290px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monitoringData}>
            <defs>
              <linearGradient id="hitRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis domain={[80, 96]} />
            <Tooltip />
            <Area type="monotone" dataKey="hitRate" stroke="#3b82f6" fill="url(#hitRate)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
