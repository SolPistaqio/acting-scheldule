import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { AddToCalendarButton } from "add-to-calendar-button-react"

import  addTimeToString  from "@/utils/addTimeToString"

export default function ScheduleDisplay({
  schedule,
  name,
  playInfo
}: {
  schedule: { date: Date; person: string }[] | null,
    name?: string
    playInfo?: { name: string; rehearsalTime: string } | null
}) {
 const calculateRehersalEndTime = (startTime: string) => {
   return addTimeToString(startTime, 2, 30)
  }

  const displayCalendarButton = (name && playInfo?.name && playInfo?.rehearsalTime) ? true : false
  
  if (!schedule) {
    return null
  }
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          {name ? `Generated Schedule for ${name}:` : "Generated Schedule:"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {schedule.map((slot, index) => (
            <li key={index}>
              <div className="flex items-center gap-2">
                <div className={displayCalendarButton ? "w-27" : "w-30"}>
                  {slot.date.toDateString()}
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
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

