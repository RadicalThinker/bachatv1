"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for the chart
const cashFlowData = [
  {
    month: "Jan",
    income: 5000,
    expenses: 2100,
    netCashFlow: 2900,
  },
  {
    month: "Feb",
    income: 5200,
    expenses: 2300,
    netCashFlow: 2900,
  },
  {
    month: "Mar",
    income: 5500,
    expenses: 2400,
    netCashFlow: 3100,
  },
  {
    month: "Apr",
    income: 6000,
    expenses: 2600,
    netCashFlow: 3400,
  },
  {
    month: "May",
    income: 6500,
    expenses: 2750,
    netCashFlow: 3750,
  },
  {
    month: "Jun",
    income: 7400,
    expenses: 2168,
    netCashFlow: 5232,
  },
]

export function CashFlowReport() {
  // Calculate totals
  const totalIncome = cashFlowData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = cashFlowData.reduce((sum, item) => sum + item.expenses, 0)
  const totalNetCashFlow = cashFlowData.reduce((sum, item) => sum + item.netCashFlow, 0)

  return (
    <div className="space-y-6">
      {/* Bar Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashFlowData}>
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
                          <span>Net Cash Flow: ${payload[2].value.toLocaleString()}</span>
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
            <Bar dataKey="netCashFlow" name="Net Cash Flow" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Income</TableHead>
            <TableHead>Expenses</TableHead>
            <TableHead>Net Cash Flow</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cashFlowData.map((item) => (
            <TableRow key={item.month}>
              <TableCell>{item.month}</TableCell>
              <TableCell>${item.income.toLocaleString()}</TableCell>
              <TableCell>${item.expenses.toLocaleString()}</TableCell>
              <TableCell className={item.netCashFlow >= 0 ? "text-green-600" : "text-red-600"}>
                ${item.netCashFlow.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="font-bold">
            <TableCell>Total</TableCell>
            <TableCell>${totalIncome.toLocaleString()}</TableCell>
            <TableCell>${totalExpenses.toLocaleString()}</TableCell>
            <TableCell className={totalNetCashFlow >= 0 ? "text-green-600" : "text-red-600"}>
              ${totalNetCashFlow.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

