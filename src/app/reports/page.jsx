import Link from "next/link"
import { ArrowLeft, Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportFilters } from "@/components/report-filters"
import { ExpensesByCategoryReport } from "@/components/reports/expenses-by-category"
import { IncomeExpenseReport } from "@/components/reports/income-expense"
import { SpendingTrendsReport } from "@/components/reports/spending-trends"
import { CashFlowReport } from "@/components/reports/cash-flow"

export const metadata = {
  title: "Reports",
  description: "Generate and view financial reports",
}

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Save Report
          </Button>
        </div>
      </div>

      <ReportFilters />

      <Tabs defaultValue="expenses-by-category" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="expenses-by-category">Expenses by Category</TabsTrigger>
          <TabsTrigger value="income-expense">Income vs. Expense</TabsTrigger>
          <TabsTrigger value="spending-trends">Spending Trends</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses-by-category">
          <Card>
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
              <CardDescription>Breakdown of your expenses by category for the selected period.</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpensesByCategoryReport />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-expense">
          <Card>
            <CardHeader>
              <CardTitle>Income vs. Expense</CardTitle>
              <CardDescription>Comparison of your income and expenses over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <IncomeExpenseReport />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spending-trends">
          <Card>
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
              <CardDescription>Analysis of your spending patterns over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <SpendingTrendsReport />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash-flow">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow</CardTitle>
              <CardDescription>Overview of your cash inflows and outflows.</CardDescription>
            </CardHeader>
            <CardContent>
              <CashFlowReport />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

