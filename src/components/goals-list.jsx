"use client"

import { useState } from "react"
import { Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GoalForm } from "@/components/goal-form"

// Sample goals data
const initialGoals = [
  {
    id: "g1",
    name: "Emergency Fund",
    targetAmount: 10000,
    currentAmount: 6500,
    targetDate: "2023-12-31",
    category: "Savings",
    priority: "High",
    status: "active",
  },
  {
    id: "g2",
    name: "Down Payment",
    targetAmount: 50000,
    currentAmount: 12500,
    targetDate: "2025-06-30",
    category: "Housing",
    priority: "Medium",
    status: "active",
  },
  {
    id: "g3",
    name: "New Car",
    targetAmount: 25000,
    currentAmount: 5000,
    targetDate: "2024-09-15",
    category: "Transportation",
    priority: "Low",
    status: "active",
  },
  {
    id: "g4",
    name: "Vacation Fund",
    targetAmount: 3000,
    currentAmount: 750,
    targetDate: "2023-08-31",
    category: "Travel",
    priority: "Medium",
    status: "active",
  },
  {
    id: "g5",
    name: "Laptop Replacement",
    targetAmount: 2000,
    currentAmount: 2000,
    targetDate: "2023-03-15",
    category: "Electronics",
    priority: "Medium",
    status: "completed",
  },
  {
    id: "g6",
    name: "Debt Payoff",
    targetAmount: 5000,
    currentAmount: 5000,
    targetDate: "2023-05-01",
    category: "Debt",
    priority: "High",
    status: "completed",
  },
]

export function GoalsList() {
  const [goals, setGoals] = useState(initialGoals)
  const [activeTab, setActiveTab] = useState("active")

  // Filter goals based on active tab
  const filteredGoals = goals.filter((goal) => goal.status === activeTab)

  // Delete a goal
  const handleDelete = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  // Calculate days remaining until target date
  const calculateDaysRemaining = (targetDate) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGoals.length > 0 ? (
              filteredGoals.map((goal) => {
                const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100
                const daysRemaining = calculateDaysRemaining(goal.targetDate)

                return (
                  <Card key={goal.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{goal.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(goal.priority)}`}>
                          {goal.priority}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{progressPercentage.toFixed(0)}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Current</p>
                          <p className="font-medium">${goal.currentAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Target</p>
                          <p className="font-medium">${goal.targetAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Category</p>
                          <p className="font-medium">{goal.category}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Target Date</p>
                          <p className="font-medium">{formatDate(goal.targetDate)}</p>
                        </div>
                      </div>

                      <div className="text-sm">
                        <p className="text-muted-foreground">Time Remaining</p>
                        <p className="font-medium">{daysRemaining} days</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <GoalForm goal={goal}>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </GoalForm>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(goal.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No active goals. Click "Add Goal" to create a new goal.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGoals.length > 0 ? (
              filteredGoals.map((goal) => (
                <Card key={goal.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{goal.name}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Completed
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium">${goal.targetAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Category</p>
                        <p className="font-medium">{goal.category}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Completion Date</p>
                        <p className="font-medium">{formatDate(goal.targetDate)}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => handleDelete(goal.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">No completed goals yet.</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function to get color based on priority
function getPriorityColor(priority) {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
    case "low":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  }
}

