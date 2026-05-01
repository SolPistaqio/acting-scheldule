import { Separator } from "@/components/ui/separator"
import SlotAssigner from "./SlotAssigner";
import type { Slot } from "@/types/d";

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
  return (
    <div>
      <h3 className="mt-2 scroll-m-20 text-xl font-semibold tracking-tight sm:mt-0">
        Selected Dates:
      </h3>
      <SlotAssigner
        people={people}
        dates={dates}
        handleRemoveDate={handleRemoveDate}
        setAssignments={setAssignments}
        assignments={assignments}
      />
      <Separator className="my-4" />
      <p>Total: {dates.length}/12</p>
      <Separator className="my-4" />
    </div>
  )
}