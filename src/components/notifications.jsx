"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Sample notifications data
const initialNotifications = [
  {
    id: "n1",
    title: "Rent Due Soon",
    message: "Your rent payment of $1,200 is due in 5 days.",
    time: "1 hour ago",
    read: false,
    type: "warning",
  },
  {
    id: "n2",
    title: "Budget Alert",
    message: "You've spent 90% of your Food budget this month.",
    time: "3 hours ago",
    read: false,
    type: "alert",
  },
  {
    id: "n3",
    title: "Goal Progress",
    message: "You're 75% of the way to your Vacation savings goal!",
    time: "Yesterday",
    read: true,
    type: "success",
  },
  {
    id: "n4",
    title: "New Feature",
    message: "Check out our new budget forecasting tool!",
    time: "2 days ago",
    read: true,
    type: "info",
  },
]

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  // Mark a single notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <DropdownMenu className="relative bg-amber-900">
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 backdrop-blur-xl">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto text-xs">
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">No notifications</div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="cursor-pointer p-0"
              onSelect={() => markAsRead(notification.id)}
            >
              <div className={`w-full p-3 ${notification.read ? "" : "dark:bg-black bg-gray-100"}`}>
                <div className="flex items-center justify-between">
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-xs text-muted-foreground">{notification.time}</div>
                </div>
                <div className="text-sm mt-1">{notification.message}</div>
              </div>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-center">View all notifications</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

