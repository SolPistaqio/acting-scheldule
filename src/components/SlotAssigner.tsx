import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Button } from "./ui/button"

export default function SlotAssigner({
  people,
  dates,
  onFinalize,
}: {
  people: string[]
  dates: Date[]
  onFinalize: (assignments: { date: Date; assigned: string[] }[]) => void
}) {
  const [datesWithAssignments, setDatesWithAssignments] = useState<
    { date: Date; assigned: string[] }[]
  >([])
  const handleAlternateAssignment = (date: Date, person: string) => {
    setDatesWithAssignments((prev) => {
      const dateIndex = prev.findIndex(
        (d) => d.date.toISOString() === date.toISOString()
      )
      if (dateIndex === -1) {
        return [...prev, { date, assigned: [person] }]
      }
      const updated = [...prev]
      updated[dateIndex] = {
        ...updated[dateIndex],
        assigned: updated[dateIndex].assigned.includes(person)
          ? updated[dateIndex].assigned.filter((p) => p !== person)
          : [...updated[dateIndex].assigned, person],
      }
      return updated
    })
  }
  return (
    <div>
      <h2>Assign people to dates:</h2>
      {dates.map((date) => (
        <FieldSet className="w-full max-w-sm mt-2" key={date.toISOString()}>
          <FieldLegend>{date.toDateString()}</FieldLegend>
          <div className="grid grid-cols-3">
            {people.map((person) => (
              <FieldGroup className="m-2 mx-auto w-56">
                <Field
                  orientation="horizontal"
                  key={`${date.toISOString()}-${person}`}
                >
                  <Checkbox
                    key={person + date.toISOString() + "checkbox"}
                    checked={
                      datesWithAssignments
                        .find(
                          (d) => d.date.toISOString() === date.toISOString()
                        )
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
                  {/* <input
                key={person + date.toISOString()}
                type="checkbox"
                value={person}
                onChange={() => {
                  handleAlternateAssignment(date, person);
                }}
              /> */}
                </Field>
              </FieldGroup>
            ))}
          </div>
        </FieldSet>
      ))}
      <Button onClick={() => onFinalize(datesWithAssignments)}>Finalize</Button>
    </div>
  )
}
