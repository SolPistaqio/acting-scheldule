import { Separator } from "@/components/ui/separator"
import { useTranslation } from "react-i18next"
import SlotAssigner from "./SlotAssigner"
import { useEffect, useState } from "react"
import type { Slot } from "@/types/d"

export default function DateDisplay({
  people,
  dates,
  handleRemoveDate,
  setAssignments,
  assignments,
}: {
  people: string[]
  dates: Date[]
  handleRemoveDate: (date: Date) => void
  setAssignments: (assignments: Slot[]) => void
  assignments: Slot[]
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
  return (
    <div>
      <h3 className="mt-2 scroll-m-20 text-xl font-semibold tracking-tight sm:mt-0">
        {t("dateDisplay.selectedDates")}
      </h3>
      <SlotAssigner
        people={people}
        dates={dates}
        handleRemoveDate={handleRemoveDate}
        setAssignments={setAssignments}
        assignments={assignments}
      />
      <Separator className="my-4" />
      <p>{t("dateDisplay.total", { current: dates.length })}</p>
      <Separator className="my-4" />
    </div>
  )
}
