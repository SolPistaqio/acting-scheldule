import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Button } from "./ui/button"
import type { Slot } from "@/types/d"

export default function SlotAssigner({
  people,
  dates,
  setAssignments,
  handleRemoveDate,
  assignments,
}: {
  people: string[]
  dates: Date[]
  setAssignments: (assignments: Slot[]) => void
  handleRemoveDate: (date: Date) => void
  assignments: Slot[]
}) {
 
  const handleAlternateAssignment = (date: Date, person: string) => {
    setAssignments(
      (() => {
        const dateIndex = assignments.findIndex(
          (d) => d.date.getTime() === date.getTime()
        )
        if (dateIndex === -1) {
          return [...assignments, { date: date, assigned: [person] }]
        }
        const updated = [...assignments]
        updated[dateIndex] = {
          ...updated[dateIndex],
          assigned: updated[dateIndex].assigned.includes(person)
            ? updated[dateIndex].assigned.filter((p) => p !== person)
            : [...updated[dateIndex].assigned, person],
        }
        return updated
      })()
    )
  }

  const handleRemoveAssignment = (date: Date) => {
    setAssignments(
      assignments.filter((d) => d.date.getTime() !== date.getTime())
    )
  }
  return (
    <div>
      <h2>Assign people to dates:</h2>
      {dates.map((date) => (
        <FieldSet className="mt-2 w-full max-w-sm" key={date.toDateString()}>
          <FieldLegend>
            <div className="grid grid-cols-[1fr_1fr] items-center space-x-2">
              <div>{date.toDateString()}</div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  handleRemoveAssignment(date)
                  handleRemoveDate(date)
                }}
              >
                X
              </Button>
            </div>
          </FieldLegend>
          <div className="grid grid-cols-3">
            {people.map((person) => (
              <FieldGroup
                key={person + date.toDateString()}
                className="m-2 mx-auto w-56"
              >
                <Field
                  orientation="horizontal"
                  key={`${date.toDateString()}-${person}`}
                >
                  <Checkbox
                    key={person + date.toDateString() + "checkbox"}
                    checked={
                      assignments
                        .find((d) => d.date.getTime() === date.getTime())
                        ?.assigned.includes(person) || false
                    }
                    onCheckedChange={() => {
                      handleAlternateAssignment(date, person)
                    }}
                  />
                  <FieldLabel
                    onClick={() => {
                      handleAlternateAssignment(date, person)
                    }}
                  >
                    {person}
                  </FieldLabel>
                </Field>
              </FieldGroup>
            ))}
          </div>
        </FieldSet>
      ))}
    </div>
  )
}
