"use client"

import { Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const budgetCategories = [
  {
    id: "b1",
    name: "Housing",
    budget: 1200,
    spent: 1100,
    color: "#3b82f6",
  },
  {
    id: "b2",
    name: "Food",
    budget: 500,
    spent: 450,
    color: "#22c55e",
  },
  {
    id: "b3",
    name: "Transportation",
    budget: 300,
    spent: 250,
    color: "#eab308",
  },
  {
    id: "b4",
    name: "Entertainment",
    budget: 200,
    spent: 180,
    color: "#ef4444",
  },
  {
    id: "b5",
    name: "Utilities",
    budget: 150,
    spent: 120,
    color: "#8b5cf6",
  },
]

export function BudgetCategoryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {budgetCategories.map((category) => {
        const percentSpent = (category.spent / category.budget) * 100
        const isOverBudget = percentSpent > 100

        return (
          <Card key={category.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">{category.name}</CardTitle>
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Spent</span>
                <span className="font-medium">${category.spent.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Budget</span>
                <span className="font-medium">${category.budget.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Remaining</span>
                <span className={`font-medium ${isOverBudget ? "text-destructive" : ""}`}>
                  ${(category.budget - category.spent).toFixed(2)}
                </span>
              </div>
              <div className="space-y-1.5">
                <Progress
                  value={percentSpent}
                  className="h-2"
                  indicatorClassName={isOverBudget ? "bg-destructive" : `bg-[${category.color}]`}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{percentSpent.toFixed(1)}% spent</span>
                  <span>{(100 - percentSpent).toFixed(1)}% remaining</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

