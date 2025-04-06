"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

// Sample transactions data
const transactions = [
  {
    id: "t1",
    description: "Grocery Shopping",
    amount: -120.5,
    date: "Today, 2:30 PM",
    category: "Food",
    merchant: {
      name: "Whole Foods",
      logo: "/placeholder.svg?height=32&width=32",
      initial: "W",
    },
  },
  {
    id: "t2",
    description: "Salary Deposit",
    amount: 3700.0,
    date: "Yesterday, 9:00 AM",
    category: "Income",
    merchant: {
      name: "Acme Inc",
      logo: "/placeholder.svg?height=32&width=32",
      initial: "A",
    },
  },
  {
    id: "t3",
    description: "Electric Bill",
    amount: -85.4,
    date: "Jul 15, 2023",
    category: "Utilities",
    merchant: {
      name: "Power Co",
      logo: "/placeholder.svg?height=32&width=32",
      initial: "P",
    },
  },
  {
    id: "t4",
    description: "Netflix Subscription",
    amount: -14.99,
    date: "Jul 13, 2023",
    category: "Entertainment",
    merchant: {
      name: "Netflix",
      logo: "/placeholder.svg?height=32&width=32",
      initial: "N",
    },
  },
  {
    id: "t5",
    description: "Gas Station",
    amount: -45.25,
    date: "Jul 12, 2023",
    category: "Transportation",
    merchant: {
      name: "Shell",
      logo: "/placeholder.svg?height=32&width=32",
      initial: "S",
    },
  },
]

export function RecentTransactions() {
  const [displayTransactions, setDisplayTransactions] = useState(transactions)

  // Function to handle transaction deletion
  const handleDelete = (id) => {
    setDisplayTransactions(displayTransactions.filter((transaction) => transaction.id !== id))
  }

  return (
    <div className="space-y-4">
      {displayTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={transaction.merchant.logo} alt={transaction.merchant.name} />
              <AvatarFallback>{transaction.merchant.initial}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{transaction.description}</div>
              <div className="text-sm text-muted-foreground">{transaction.date}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={transaction.category === "Income" ? "outline" : "secondary"} className="rounded-sm">
              {transaction.category}
            </Badge>
            <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : ""}`}>
              {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(transaction.id)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}

      {displayTransactions.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">No transactions to display</div>
      )}
    </div>
  )
}

