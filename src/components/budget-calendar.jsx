"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const events = [
  { id: 1, name: "Rent Payment", date: 31, amount: 1200, type: "expense" },
  { id: 2, name: "Salary Deposit", date: 25, amount: 3700, type: "income" },
  { id: 3, name: "Electric Bill", date: 15, amount: 85.4, type: "expense" },
  { id: 4, name: "Netflix", date: 13, amount: 14.99, type: "expense" },
  { id: 5, name: "Phone Bill", date: 8, amount: 65, type: "expense" },
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// July 2023 starts on a Saturday (index 6) and has 31 days
const firstDayOfMonth = 6 // Saturday
const daysInMonth = 31

export function BudgetCalendar() {
  const [selectedDate, setSelectedDate] = useState(null)

  // Create calendar grid with the correct number of days and starting position
  const calendarDays = []

  // Add empty cells for days before the 1st of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-1 text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2 text-sm font-medium">
            {day}
          </div>
        ))}
        {calendarDays.map((day, index) => {
          const dayEvents = events.filter((event) => event.date === day)
          const hasEvents = dayEvents.length > 0
          const isSelected = day === selectedDate

          return (
            <div
              key={index}
              className={cn(
                "aspect-square p-1",
                day ? "cursor-pointer hover:bg-muted" : "",
                isSelected ? "bg-muted" : "",
              )}
              onClick={() => day && setSelectedDate(day)}
            >
              {day && (
                <div className="flex h-full flex-col">
                  <div
                    className={cn(
                      "mx-auto flex h-7 w-7 items-center justify-center rounded-full text-sm",
                      day === new Date().getDate() ? "bg-primary text-primary-foreground" : "",
                    )}
                  >
                    {day}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-0.5 pt-1">
                    {hasEvents && (
                      <div className="flex flex-col gap-0.5">
                        {dayEvents.map((event) => (
                          <Badge
                            key={event.id}
                            variant="outline"
                            className={cn(
                              "h-1.5 w-full truncate px-0 text-[0px]",
                              event.type === "income" ? "bg-green-500" : "bg-red-500",
                            )}
                          >
                            {event.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {selectedDate && (
        <div className="rounded-md border p-4">
          <h3 className="mb-2 font-medium">Events for July {selectedDate}</h3>
          <div className="space-y-2">
            {events
              .filter((event) => event.date === selectedDate)
              .map((event) => (
                <div key={event.id} className="flex items-center justify-between rounded-md border p-2">
                  <div>{event.name}</div>
                  <div className={cn("font-medium", event.type === "income" ? "text-green-600" : "")}>
                    {event.type === "income" ? "+" : "-"}${event.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            {events.filter((event) => event.date === selectedDate).length === 0 && (
              <div className="text-sm text-muted-foreground">No events for this day</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

