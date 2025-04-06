"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample categories and priorities
const categories = [
  "Savings",
  "Housing",
  "Transportation",
  "Travel",
  "Education",
  "Retirement",
  "Debt",
  "Electronics",
  "Other",
]
const priorities = ["High", "Medium", "Low"]

export function GoalForm({ children, goal }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: goal?.name || "",
    targetAmount: goal?.targetAmount ? goal.targetAmount.toString() : "",
    currentAmount: goal?.currentAmount ? goal.currentAmount.toString() : "0",
    targetDate: goal?.targetDate || getDefaultTargetDate(),
    category: goal?.category || "",
    priority: goal?.priority || "Medium",
    notes: goal?.notes || "",
  })

  // Get default target date (1 year from now)
  function getDefaultTargetDate() {
    const date = new Date()
    date.setFullYear(date.getFullYear() + 1)
    return date.toISOString().split("T")[0]
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Process form data
    const processedData = {
      ...formData,
      targetAmount: Number.parseFloat(formData.targetAmount),
      currentAmount: Number.parseFloat(formData.currentAmount),
    }

    console.log("Goal data:", processedData)

    // Here you would typically save the data to your state or backend

    // Close the dialog
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{goal ? "Edit Goal" : "Create New Goal"}</DialogTitle>
          <DialogDescription>
            {goal 
              ? "Update your financial goal details below." 
              : "Set a new financial goal to track your progress."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Goal Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Emergency Fund, Down Payment"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="targetAmount">Target Amount ($)</Label>
                <Input
                  id="targetAmount"
                  name="targetAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.targetAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="currentAmount">Current Amount ($)</Label>
                <Input
                  id="currentAmount"
                  name="currentAmount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.currentAmount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  name="category" 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange("category", value)}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select 
                  name="priority" 
                  value={formData.priority} 
                  onValueChange={(value) => handleSelectChange("priority", value)}
                  required
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="targetDate">Target Date</Label>
              <Input
                id="targetDate"
                name="targetDate"
                type="date"
                value={formData.targetDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional details about your goal"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{goal ? "Update Goal" : "Create Goal"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

