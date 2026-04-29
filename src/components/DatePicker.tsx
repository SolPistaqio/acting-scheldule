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
  people,
  assignments,
  setAssignments
}: {
  onFinalize: (assignments: { date: Date; assigned: string[] }[]) => void
  people: string[],
  assignments: { date: Date; assigned: string[] }[],
  setAssignments: (assignments: { date: Date; assigned: string[] }[]) => void
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
    const sortedAssignments = sortedDates.map((date) => {
      const assignment = assignments.find(
        (a) => a.date.toDateString() === date.toDateString()
      )
      return {
        date,
        assigned: assignment ? assignment.assigned : [],
      }
    })
    onFinalize(sortedAssignments)
  }

  const handleRemoveDate = (date: Date) => {
    setDates(dates.filter((d) => d.toDateString() !== date.toDateString()))
    setAssignments(assignments.filter((a) => a.date.toDateString() !== date.toDateString()))
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
          <DateDisplay
            people={people}
            dates={dates}
            handleRemoveDate={handleRemoveDate}
            setAssignments={setAssignments}
            assignments={assignments}
          />
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
