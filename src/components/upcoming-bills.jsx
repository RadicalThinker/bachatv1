"use client"

import { CalendarIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
import { useState } from "react"

// Sample bills data
const initialBills = [
  {
    id: "b1",
    name: "Rent",
    amount: 1200.0,
    dueDate: "Jul 31, 2023",
    daysLeft: 5,
    merchant: {
      name: "Property Management",
      logo: "/placeholder.svg?height=32&width=32",
      initial: "P",
    },
  },
  {
    id: "b2",
    name: "Internet",
    amount: 79.99,
    dueDate: "Aug 5, 2023",
    daysLeft: 10,
    merchant: {
      name: "Comcast",
      logo: "/placeholder.svg?height=32&width=32",
      initial: "C",
    },
  },
  {
    id: "b3",
    name: "Phone Bill",
    amount: 65.0,
    dueDate: "Aug 8, 2023",
    daysLeft: 13,
    merchant: {
      name: "Verizon",
      logo: "/placeholder.svg?height=32&width=32",
      initial: "V",
    },
  },
  {
    id: "b4",
    name: "Car Insurance",
    amount: 150.0,
    dueDate: "Aug 15, 2023",
    daysLeft: 20,
    merchant: {
      name: "Geico",
      logo: "/placeholder.svg?height=32&width=32",
      initial: "G",
    },
  },
]

export function UpcomingBills() {
  const [bills, setBills] = useState(initialBills)
  const [newBill, setNewBill] = useState({
    name: "",
    amount: "",
    dueDate: "",
  })
  const [open, setOpen] = useState(false)

  const handleAddBill = (e) => {
    e.preventDefault()

    // Calculate days left
    const today = new Date()
    const dueDate = new Date(newBill.dueDate)
    const diffTime = Math.abs(dueDate - today)
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const bill = {
      id: `b${bills.length + 1}`,
      name: newBill.name,
      amount: Number.parseFloat(newBill.amount),
      dueDate: new Date(newBill.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      daysLeft,
      merchant: {
        name: newBill.name,
        logo: "/placeholder.svg?height=32&width=32",
        initial: newBill.name.charAt(0).toUpperCase(),
      },
    }

    setBills([...bills, bill])
    setNewBill({ name: "", amount: "", dueDate: "" })
    setOpen(false)
  }

  return (
    <div className="space-y-4">
      {bills.map((bill) => (
        <div key={bill.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={bill.merchant.logo} alt={bill.merchant.name} />
              <AvatarFallback>{bill.merchant.initial}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{bill.name}</div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <CalendarIcon className="h-3 w-3" />
                <span>{bill.dueDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={bill.daysLeft <= 7 ? "destructive" : "outline"} className="rounded-sm">
              {bill.daysLeft <= 7 ? "Due Soon" : `${bill.daysLeft} days`}
            </Badge>
            <div className="font-medium">${bill.amount.toFixed(2)}</div>
          </div>
        </div>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            Add New Bill
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Bill</DialogTitle>
            <DialogDescription>Add a new bill to track in your upcoming bills list.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddBill}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Bill Name</Label>
                <Input
                  id="name"
                  value={newBill.name}
                  onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={newBill.amount}
                  onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newBill.dueDate}
                  onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Bill</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

