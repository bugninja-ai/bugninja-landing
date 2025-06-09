"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarProps {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  initialFocus?: boolean
}

export function Calendar({ 
  mode = "single",
  selected,
  onSelect,
  initialFocus
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(selected || new Date())
  const [selectedDate, setSelectedDate] = React.useState(selected)

  React.useEffect(() => {
    if (selected) {
      setSelectedDate(selected)
      setCurrentDate(selected)
    }
  }, [selected])

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
    return prevMonth.getDate() - firstDayOfMonth + i + 1
  })

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length)
  const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => i + 1)

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    onSelect?.(date)
  }

  const isSelected = (date: Date) => {
    if (!selectedDate) return false
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
  }

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="font-medium">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {prevMonthDays.map((day) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day)
          return (
            <button
              key={`prev-${day}`}
              className={`h-8 w-8 text-center text-sm rounded-lg ${
                isSelected(date)
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
              onClick={() => handleDateSelect(date)}
            >
              {day}
            </button>
          )
        })}
        {currentMonthDays.map((day) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
          return (
            <button
              key={`current-${day}`}
              className={`h-8 w-8 text-center text-sm rounded-lg ${
                isSelected(date)
                  ? "bg-primary text-white"
                  : "text-gray-900 hover:bg-gray-100"
              }`}
              onClick={() => handleDateSelect(date)}
            >
              {day}
            </button>
          )
        })}
        {nextMonthDays.map((day) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day)
          return (
            <button
              key={`next-${day}`}
              className={`h-8 w-8 text-center text-sm rounded-lg ${
                isSelected(date)
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
              onClick={() => handleDateSelect(date)}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
