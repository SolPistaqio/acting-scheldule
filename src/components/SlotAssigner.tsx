import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "react-i18next"
import { formatDate } from "@/utils/formatDate"
import { useEffect, useState } from "react"
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
  // console.log(
  //   "[SlotAssigner] rendering with",
  //   dates.length,
  //   "dates and",
  //   people.length,
  //   "people"
  // )
  const { t, i18n } = useTranslation()
  const [, setLanguageUpdate] = useState(i18n.language)

  // Subscribe to language changes to trigger re-renders
  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("[SlotAssigner] language changed to", i18n.language)
      setLanguageUpdate(i18n.language)
    }
    i18n.on("languageChanged", handleLanguageChange)
    return () => {
      i18n.off("languageChanged", handleLanguageChange)
    }
  }, [i18n])

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
      <h2>{t("slotAssigner.assignPeople")}</h2>
      {dates.map((date) => (
        <FieldSet className="mt-2 w-full max-w-sm" key={date.toDateString()}>
          <FieldLegend>
            <div className="grid grid-cols-[1fr_1fr] items-center space-x-2">
              <div>{formatDate(date, i18n.language)}</div>
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
