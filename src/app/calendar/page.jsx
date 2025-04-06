import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BudgetCalendar } from "@/components/budget-calendar"

export const metadata = {
  title: "Calendar",
  description: "View your upcoming bills and financial events",
}

export default function CalendarPage() {
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
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>July 2023</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous month</span>
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next month</span>
                </Button>
              </div>
            </div>
            <CardDescription>View and manage your financial events</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetCalendar />
          </CardContent>
        </Card>
        <Card className="md:w-[300px]">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your next financial events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">Rent Payment</div>
                <div className="text-sm text-destructive">Due in 5 days</div>
              </div>
              <div className="text-sm text-muted-foreground">Jul 31, 2023</div>
              <div className="font-medium">$1,200.00</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">Internet Bill</div>
                <div className="text-sm">Due in 10 days</div>
              </div>
              <div className="text-sm text-muted-foreground">Aug 5, 2023</div>
              <div className="font-medium">$79.99</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">Phone Bill</div>
                <div className="text-sm">Due in 13 days</div>
              </div>
              <div className="text-sm text-muted-foreground">Aug 8, 2023</div>
              <div className="font-medium">$65.00</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">Car Insurance</div>
                <div className="text-sm">Due in 20 days</div>
              </div>
              <div className="text-sm text-muted-foreground">Aug 15, 2023</div>
              <div className="font-medium">$150.00</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

