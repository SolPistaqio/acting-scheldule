"use client"
import { useState } from "react"
import { Calendar as UICalendar } from "./ui/calendar"
import DateDisplay from "./DateDisplay"
import { Button } from "./ui/button"

export default function Calendar({
  onFinalize,
}: {
  onFinalize: (dates: Date[]) => void
}) {
  const todaysDate = new Date()
  const [dates, setDates] = useState<Date[]>([])
  const [currentDate, setCurrentDate] = useState<Date>(todaysDate)
  const onAccept = (date: Date | null) => {
    if (!date) return
    if (dates.some((d) => d.toDateString() === date.toDateString())) return
    const newDates = [...dates, date]
    setDates(newDates)
  }

  const handleFinalize = () => {
    const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime())
    onFinalize(sortedDates)
  }
  return (
    <div>
      <div className="section">
        <div className="picker">
          <UICalendar
            mode="single"
            selected={currentDate}
            onSelect={(newValue) => {
              if (newValue) {
                onAccept(newValue)
                setCurrentDate(newValue)
              }
            }}
            className="rounded-lg border"
            captionLayout="dropdown"
          />
          <Button variant="outline" onClick={() => onAccept(currentDate)}>
            Add date to list
          </Button>
        </div>
        <DateDisplay dates={dates} />
      </div>
      <Button onClick={() => handleFinalize()}>Confirm rehersal dates</Button>
    </div>
  )
}
