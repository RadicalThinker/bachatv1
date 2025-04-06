import Link from "next/link"
import { ArrowLeft, Filter, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TransactionsTable } from "@/components/transactions-table"
import { TransactionForm } from "@/components/transaction-form"

export const metadata = {
  title: "Transactions",
  description: "View and manage your financial transactions",
}

export default function TransactionsPage() {
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
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
        </div>
        <TransactionForm>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </TransactionForm>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 md:w-1/2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="h-9 md:w-[300px]" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            All Time
          </Button>
        </div>
      </div>

      <TransactionsTable />
    </div>
  )
}

