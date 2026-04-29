import { useState } from "react"
import PeopleDisplay from "./PeopleDisplay"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"

const MAX_ALTERNATES = 3

export default function PeoplePicker({
  onFinalize,
}: {
  onFinalize: (people: string[]) => void
}) {
  const [currentAlternate, setCurrentAlternate] = useState<string>("")
  const [alternates, setAlternates] = useState<string[]>([])
  const handleAddAlternate = () => {
    if (currentAlternate.trim() === "") return
    if (alternates.length >= MAX_ALTERNATES) return
    if (alternates.includes(currentAlternate)) return
    onFinalize([...alternates, currentAlternate])
    setAlternates([...alternates, currentAlternate])
    setCurrentAlternate("")
  }

  const handleRemoveAlternate = (alternate: string) => {
    const newAlternates = alternates.filter((a) => a !== alternate)
    setAlternates(newAlternates)
    onFinalize(newAlternates)
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add alternates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 text-sm text-muted-foreground">
          <div className="pr-4">
            <FieldSet className="w-full max-w-xs">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    value={currentAlternate}
                    onChange={(e) => setCurrentAlternate(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddAlternate()
                      }
                    }}
                  />
                  <FieldDescription>
                    Add the names of the actors who will be part of the schedule
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
            <Button
              variant="outline"
              onClick={() => {
                handleAddAlternate()
              }}
            >
              Add alternate
            </Button>
          </div>

          <PeopleDisplay people={alternates} handleRemoveAlternate={handleRemoveAlternate} />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onFinalize(alternates)}>
          Confirm alternate list
        </Button>
      </CardFooter>
    </Card>
  )
}
