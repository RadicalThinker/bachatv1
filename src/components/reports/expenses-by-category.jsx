"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for the chart
const categories = [
  { name: "Housing", value: 1100, color: "#3b82f6", percentage: 51.4 },
  { name: "Food", value: 450, color: "#22c55e", percentage: 21.0 },
  { name: "Transportation", value: 250, color: "#eab308", percentage: 11.7 },
  { name: "Entertainment", value: 180, color: "#ef4444", percentage: 8.4 },
  { name: "Utilities", value: 120, color: "#8b5cf6", percentage: 5.6 },
  { name: "Other", value: 40, color: "#94a3b8", percentage: 1.9 },
]

export function ExpensesByCategoryReport() {
  // Calculate total expenses
  const totalExpenses = categories.reduce((sum, category) => sum + category.value, 0)

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Pie Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categories}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              labelLine={false}
            >
              {categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col">
                        <span className="font-bold">{payload[0].name}</span>
                        <span>${payload[0].value.toLocaleString()}</span>
                        <span>{((payload[0].value / totalExpenses) * 100).toFixed(1)}% of total</span>
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

      {/* Data Table */}
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.name}>
                <TableCell className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                  {category.name}
                </TableCell>
                <TableCell>${category.value.toLocaleString()}</TableCell>
                <TableCell>{category.percentage}%</TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell>Total</TableCell>
              <TableCell>${totalExpenses.toLocaleString()}</TableCell>
              <TableCell>100%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

