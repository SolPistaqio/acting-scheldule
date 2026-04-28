"use client"
import { useState } from "react"
import { Calendar as UICalendar } from "./ui/calendar"
import DateDisplay from "./DateDisplay"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

  const handleRemoveDate = (date: Date) => {
    setDates(dates.filter((d) => d.toDateString() !== date.toDateString()))
  }
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Pick dates of rehearsals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 text-sm text-muted-foreground">
          <div className="flex place-self-start justify-self-center">
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
          </div>
          <DateDisplay dates={dates} handleRemoveDate={handleRemoveDate} />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => handleFinalize()}>
          Confirm rehersal dates
        </Button>
      </CardFooter>
    </Card>
  )
}
