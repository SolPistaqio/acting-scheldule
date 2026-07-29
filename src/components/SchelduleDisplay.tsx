import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "react-i18next"
import { AddToCalendarButton } from "add-to-calendar-button-react"
import { formatDate } from "@/utils/formatDate"
import { useEffect, useState } from "react"

import addTimeToString from "@/utils/addTimeToString"
import { Separator } from "@/components/ui/separator"
import type { Assignment, PlayInfo } from "@/types/d"
import { ShareButton } from "./ShareButton"

export default function ScheduleDisplay({
  schedule,
  name,
  playInfo,
}: {
  schedule: Assignment[] | null
  name?: string
  playInfo?: PlayInfo | null
  ref?: React.Ref<HTMLDivElement>
}) {
  const { t, i18n } = useTranslation()
  const [, setLanguageUpdate] = useState(i18n.language)

  // Subscribe to language changes to trigger re-renders
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguageUpdate(i18n.language)
    }
    i18n.on("languageChanged", handleLanguageChange)
    return () => {
      i18n.off("languageChanged", handleLanguageChange)
    }
  }, [i18n])
  const calculateRehersalEndTime = (startTime: string) => {
    return addTimeToString(startTime, 2, 30)
  }

  const displayCalendarButton =
    name && playInfo?.name && playInfo?.rehearsalTime ? true : false

  if (!schedule) {
    return null
  }
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          {name
            ? t("scheduleDisplay.generatedScheduleFor", { name })
            : t("scheduleDisplay.generatedSchedule")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {schedule.map((slot, index) => (
            <li key={index}>
              <div className="flex items-center gap-2">
                <div className={displayCalendarButton ? "w-27" : "w-30"}>
                  {formatDate(slot.date, i18n.language)}
                </div>
                <div>{name ? "" : `- ${slot.person}`}</div>
                {displayCalendarButton ? (
                  <AddToCalendarButton
                    // @ts-expect-error - we check for the existence of these fields before rendering the button, so we know they exist
                    name={`${playInfo.name} Rehearsal`}
                    options={["Apple", "Google"]}
                    location="K. Barona iela 130 k-12, Riga, LV-1012, Latvia"
                    size="2"
                    hideTextLabelButton
                    hideTextLabelList
                    listStyle="overlay"
                    timeZone="Europe/Riga"
                    startDate={
                      slot.date.getFullYear().toString() +
                      "-" +
                      (slot.date.getMonth() + 1).toString().padStart(2, "0") +
                      "-" +
                      slot.date.getDate().toString().padStart(2, "0")
                    }
                    // @ts-expect-error - we check for the existence of these fields before rendering the button, so we know they exist
                    startTime={playInfo.rehearsalTime}
                    // @ts-expect-error - we check for the existence of these fields before rendering the button, so we know they exist
                    endTime={calculateRehersalEndTime(playInfo.rehearsalTime)}
                  />
                ) : null}
              </div>
              {displayCalendarButton && index < schedule.length - 1 ? (
                <Separator className="my-2" />
              ) : null}
            </li>
          ))}
        </ul>
        {!name && <ShareButton />}
      </CardContent>
    </Card>
  )
}
