import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import type { PlayInfo } from "@/types/d"

export default function PlayInfoForm({
  setPlayInfo,
  playInfo,
}: {
  setPlayInfo: (info: PlayInfo) => void
  playInfo: PlayInfo | null
}) {
  const { t } = useTranslation()
  const [isInfoSaved, setIsInfoSaved] = useState(false)
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
          <CardTitle>{t("playInfoForm.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldSet className="w-full max-w-xs">
            <FieldGroup>
              <div className="grid grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor="play-name">
                    {t("playInfoForm.playName")}
                  </FieldLabel>
                  <Input
                    id="play-name"
                    name="play-name"
                    type="text"
                    required
                    defaultValue={playInfo?.name || ""}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="time-of-rehearsal">
                    {t("playInfoForm.rehearsalStartTime")}
                  </FieldLabel>
                  <Input
                    id="time-of-rehearsal"
                    name="time-of-rehearsal"
                    type="time"
                    required
                    defaultValue={playInfo?.rehearsalTime || ""}
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
        </CardContent>
        <CardFooter className="mt-4">
          <Button type="submit" className="w-full">
            {isInfoSaved
              ? t("playInfoForm.updateInfo")
              : t("playInfoForm.saveInfo")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
