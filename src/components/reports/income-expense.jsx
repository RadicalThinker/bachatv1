"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import { Card, CardContent } from "@/components/ui/card"

// Sample data for the chart
const data = [
  {
    month: "Jan",
    income: 5000,
    expenses: 2100,
    savings: 2900,
  },
  {
    month: "Feb",
    income: 5200,
    expenses: 2300,
    savings: 2900,
  },
  {
    month: "Mar",
    income: 5500,
    expenses: 2400,
    savings: 3100,
  },
  {
    month: "Apr",
    income: 6000,
    expenses: 2600,
    savings: 3400,
  },
  {
    month: "May",
    income: 6500,
    expenses: 2750,
    savings: 3750,
  },
  {
    month: "Jun",
    income: 7400,
    expenses: 2168,
    savings: 5232,
  },
]

export function IncomeExpenseReport() {
  // Calculate totals
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0)
  const totalSavings = data.reduce((sum, item) => sum + item.savings, 0)
  const savingsRate = (totalSavings / totalIncome) * 100

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Total Income</div>
            <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Total Expenses</div>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Savings Rate</div>
            <div className="text-2xl font-bold">{savingsRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span>Income: ${payload[0].value.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500" />
                          <span>Expenses: ${payload[1].value.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                          <span>Savings: ${payload[2].value.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend />
            <Bar dataKey="income" name="Income" fill="#22c55e" />
            <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
            <Bar dataKey="savings" name="Savings" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

