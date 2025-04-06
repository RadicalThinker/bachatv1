import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GoalsList } from "@/components/goals-list"
import { GoalForm } from "@/components/goal-form"

export const metadata = {
  title: "Financial Goals",
  description: "Set and track your financial goals",
}

export default function GoalsPage() {
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
          <h1 className="text-2xl font-bold tracking-tight">Financial Goals</h1>
        </div>
        <GoalForm>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </GoalForm>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Currently tracking 4 financial goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Goal Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$25,000.00</div>
            <p className="text-xs text-muted-foreground">Combined target for all goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$9,750.00</div>
            <p className="text-xs text-muted-foreground">39% of total goal amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Goals achieved this year</p>
          </CardContent>
        </Card>
      </div>

      <GoalsList />
    </div>
  )
}

