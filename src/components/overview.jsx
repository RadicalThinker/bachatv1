"use client"

import { useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for the chart
const monthlyData = [
  {
    month: "Jan",
    income: 5000,
    expenses: 2100,
    savings: 900,
  },
  {
    month: "Feb",
    income: 5200,
    expenses: 2300,
    savings: 950,
  },
  {
    month: "Mar",
    income: 5500,
    expenses: 2400,
    savings: 1000,
  },
  {
    month: "Apr",
    income: 6000,
    expenses: 2600,
    savings: 1100,
  },
  {
    month: "May",
    income: 6500,
    expenses: 2750,
    savings: 1150,
  },
  {
    month: "Jun",
    income: 7400,
    expenses: 2168,
    savings: 1200,
  },
]

export function Overview() {
  const [timeRange, setTimeRange] = useState("6months")

  // In a real app, this would fetch different data based on the selected time range
  const data = monthlyData

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                        <span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Income</span>
                        <span className="font-bold">${payload[0].value.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Expenses</span>
                        <span className="font-bold">${payload[1].value.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Savings</span>
                        <span className="font-bold">${payload[2].value.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} />
          <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

