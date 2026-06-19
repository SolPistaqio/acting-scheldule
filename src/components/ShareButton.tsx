import { useState } from "react";
import { Button } from "./ui/button"
import { toast } from "sonner"

export function ShareButton() {
    const [date, setdate] = useState('')
  const handleShare = () => {
    const currentUrl = window.location.href
    const currentDate = new Date()
    const minutes = currentDate.getMinutes()
    const dateString = currentDate.getHours() + ":" + (minutes<10 ? `0${minutes}` : minutes)
    setdate(dateString)
    navigator.clipboard.writeText(currentUrl)
    toast.success("Link copied to clipboard!", { position: "top-center" })
  }

  return (
    <div className="mt-4">
      <Button className="p-6 w-full" onClick={() => handleShare()}>
        <div>
          <div
            className="mb-0 pb-0 text-[1.1rem]"
            style={{
              marginBottom: "-0.5rem",
            }}
          >
            Share link to scheldule
          </div>
          <div className="text-sm text-muted-foreground h-4">
            {date ? `Last shared: ${date}` : ""}
          </div>
        </div>
      </Button>
    </div>
  )
}
