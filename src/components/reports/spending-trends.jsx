"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// Sample data for the chart
const monthlyData = [
  { month: "Jan", food: 400, housing: 1100, transportation: 200, entertainment: 150, utilities: 120 },
  { month: "Feb", food: 450, housing: 1100, transportation: 220, entertainment: 180, utilities: 125 },
  { month: "Mar", food: 420, housing: 1100, transportation: 240, entertainment: 160, utilities: 130 },
  { month: "Apr", food: 480, housing: 1100, transportation: 250, entertainment: 200, utilities: 120 },
  { month: "May", food: 460, housing: 1100, transportation: 260, entertainment: 190, utilities: 125 },
  { month: "Jun", food: 450, housing: 1100, transportation: 250, entertainment: 180, utilities: 120 },
]

export function SpendingTrendsReport() {
  const [chartType, setChartType] = useState("line")

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={chartType} onValueChange={setChartType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chart Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="line">Line Chart</SelectItem>
            <SelectItem value="area">Area Chart</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px]">
        {chartType === "line" ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="font-bold">{label}</div>
                        <div className="grid gap-1">
                          {payload.map((entry, index) => (
                            <div key={`item-${index}`} className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                              <span>
                                {entry.name}: ${entry.value.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="food" name="Food" stroke="#22c55e" />
              <Line type="monotone" dataKey="housing" name="Housing" stroke="#3b82f6" />
              <Line type="monotone" dataKey="transportation" name="Transportation" stroke="#eab308" />
              <Line type="monotone" dataKey="entertainment" name="Entertainment" stroke="#ef4444" />
              <Line type="monotone" dataKey="utilities" name="Utilities" stroke="#8b5cf6" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="font-bold">{label}</div>
                        <div className="grid gap-1">
                          {payload.map((entry, index) => (
                            <div key={`item-${index}`} className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                              <span>
                                {entry.name}: ${entry.value.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="food"
                name="Food"
                stackId="1"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="housing"
                name="Housing"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="transportation"
                name="Transportation"
                stackId="1"
                stroke="#eab308"
                fill="#eab308"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="entertainment"
                name="Entertainment"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="utilities"
                name="Utilities"
                stackId="1"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          This chart shows your spending trends across major categories over time. Use this to identify patterns and
          opportunities to reduce expenses.
        </p>
      </div>
    </div>
  )
}

