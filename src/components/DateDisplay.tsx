import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function DateDisplay({ dates, handleRemoveDate }: { dates: Date[]; handleRemoveDate: (date: Date) => void }) {
  return (
    <div>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Selected Dates:
      </h3>
      <ul>
        {dates.map((date, index) => (
          <li key={date.toISOString() + index}>
            <div className="grid grid-cols-[1fr_1fr] items-center space-x-2">
              {date.toDateString()}{" "}
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRemoveDate(date)}
              >
                X
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <Separator className="my-4" />
      <p>Total: {dates.length}</p>
    </div>
  )
}