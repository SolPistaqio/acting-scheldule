import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { useState } from "react";

export default function PlayInfoForm(
    { setPlayInfo }: { setPlayInfo: (info: { name: string; rehearsalTime: string }) => void }
) {
    const [isInfoSaved, setIsInfoSaved] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      // @ts-expect-error - TypeScript doesn't know about the form fields, so we use FormData to extract them
      const formData = new FormData(e.currentTarget) 
      const name = formData.get("play-name") as string
      const rehearsalTime = formData.get("time-of-rehearsal") as string
      setPlayInfo({ name, rehearsalTime })
      setIsInfoSaved(true)
      // const rehearsalTime = formData.get("time-of-rehearsal") as string;
      // setPlayInfo({ name, rehearsalTime });
    }
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <form className="w-full" onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Play Information</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldSet className="w-full max-w-xs">
            <FieldGroup>
              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="play-name">Play Name</FieldLabel>
                  <Input id="play-name" name="play-name" type="text" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="time-of-rehearsal">
                    Rehearsal Start Time
                  </FieldLabel>
                  <Input
                    id="time-of-rehearsal"
                    name="time-of-rehearsal"
                    type="time"
                    required
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
        </CardContent>
        <CardFooter className="mt-4">
          <Button type="submit" className="w-full">
            {isInfoSaved ? "Update Info" : "Save Info"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
