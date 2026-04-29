import { Separator } from "@/components/ui/separator"
import SlotAssigner from "./SlotAssigner";

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
  setAssignments: (assignments: { date: Date; assigned: string[] }[]) => void
  assignments: { date: Date; assigned: string[] }[]
}) {
  return (
    <div>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
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