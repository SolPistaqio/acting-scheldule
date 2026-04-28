import { useState } from "react";
import PeopleDisplay from "./PeopleDisplay";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";

const MAX_ALTERNATES = 3;

export default function PeoplePicker({
  onFinalize,
}: {
  onFinalize: (people: string[]) => void;
}) {
  const [currentAlternate, setCurrentAlternate] = useState<string>("");
  const [alternates, setAlternates] = useState<string[]>([]);

  return (
    <div>
      <div className="section">
        <FieldSet className="w-full max-w-xs">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Name</FieldLabel>
              <Input
                id="username"
                type="text"
                value={currentAlternate}
                onChange={(e) => setCurrentAlternate(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    if (currentAlternate.trim() === "") return
                    if (alternates.length >= MAX_ALTERNATES) return
                    if (alternates.includes(currentAlternate)) return
                    setAlternates([...alternates, currentAlternate])
                    setCurrentAlternate("")
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
            if (currentAlternate.trim() === "") return
            if (alternates.length >= MAX_ALTERNATES) return
            if (alternates.includes(currentAlternate)) return
            setAlternates([...alternates, currentAlternate])
            setCurrentAlternate("")
          }}
        >
          Add alternate
        </Button>
        <PeopleDisplay people={alternates} />
      </div>
      <Button onClick={() => onFinalize(alternates)}>
        Confirm alternate list
      </Button>
    </div>
  )
}
