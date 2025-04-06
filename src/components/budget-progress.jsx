"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

// Sample budget categories data
const categories = [
  {
    name: "Housing",
    budget: 1200,
    spent: 1100,
    color: "#3b82f6",
  },
  {
    name: "Food",
    budget: 500,
    spent: 450,
    color: "#22c55e",
  },
  {
    name: "Transportation",
    budget: 300,
    spent: 250,
    color: "#eab308",
  },
  {
    name: "Entertainment",
    budget: 200,
    spent: 180,
    color: "#ef4444",
  },
  {
    name: "Utilities",
    budget: 150,
    spent: 120,
    color: "#8b5cf6",
  },
]

// Transform data for the pie chart
const data = categories.map((category) => ({
  name: category.name,
  value: category.spent,
  color: category.color,
}))

export function BudgetProgress() {
  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">Total spent: $2,100 of $2,350</div>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-3 w-3" />
          Edit Budgets
        </Button>
      </div>

      {/* Pie Chart */}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">{payload[0].name}</span>
                        <span className="font-bold">${payload[0].value.toLocaleString()}</span>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Budget Progress Bars */}
      <div className="grid gap-3">
        {categories.map((category) => (
          <div key={category.name} className="grid gap-1.5">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                <span>{category.name}</span>
              </div>
              <span>
                ${category.spent} / ${category.budget}
              </span>
            </div>
            <Progress
              value={(category.spent / category.budget) * 100}
              className="h-2"
              indicatorClassName={`bg-[${category.color}]`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

