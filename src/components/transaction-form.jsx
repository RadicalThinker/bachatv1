"use client"

import { useContext, useState, useEffect } from "react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BudgetContext, useBudget } from "@/contexts/BudgetProvider"

// Sample categories
const categories = [
  "Food",
  "Housing",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Health",
  "Shopping",
  "Income",
  "Other",
]

export function TransactionForm({ children, transaction  }) {
  const [open, setOpen] = useState(false)
  const { formData, setFormData } = useBudget()
  
  // Format date for input field (YYYY-MM-DD)
  function formatDateForInput(dateString) {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  // Get current date in YYYY-MM-DD format
  function getCurrentDate() {
    return new Date().toISOString().split("T")[0]
  }
  
  // Initialize form data when transaction is provided or when dialog opens
  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description || "",
        amount: transaction.amount ? Math.abs(transaction.amount).toString() : "",
        type: transaction.amount > 0 ? "income" : "expense",
        category: transaction.category || "",
        date: transaction.date ? formatDateForInput(transaction.date) : getCurrentDate(),
        merchant: transaction.merchant?.name || "",
      })
    }
  }, [transaction, setFormData])

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
      amount:
        formData.type === "expense"
          ? -Math.abs(Number.parseFloat(formData.amount))
          : Math.abs(Number.parseFloat(formData.amount)),
    }

    console.log("Transaction data:", processedData)

    // Here you would typically save the data to your state or backend

    // Close the dialog
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{transaction ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
          <DialogDescription>
            {transaction
              ? "Edit the details of your transaction below."
              : "Enter the details of your transaction below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Transaction Type</Label>
              <RadioGroup
                name="type"
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
                className="flex"
              >
                <div className="flex items-center space-x-2 mr-4">
                  <RadioGroupItem value="expense" id="expense" />
                  <Label htmlFor="expense">Expense</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="income" id="income" />
                  <Label htmlFor="income">Income</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
                required
              >
                <SelectTrigger>
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
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="merchant">Merchant/Payee</Label>
              <Input id="merchant" name="merchant" value={formData.merchant} onChange={handleChange} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{transaction ? "Save Changes" : "Add Transaction"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

