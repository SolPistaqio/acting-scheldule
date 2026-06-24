import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "./ui/button"
import { toast } from "sonner"

export function ShareButton() {
  const { t } = useTranslation()
  const [date, setdate] = useState("")
  const handleShare = () => {
    const currentUrl = window.location.href
    const currentDate = new Date()
    const minutes = currentDate.getMinutes()
    const dateString =
      currentDate.getHours() + ":" + (minutes < 10 ? `0${minutes}` : minutes)
    setdate(dateString)
    navigator.clipboard.writeText(currentUrl)
    toast.success(t("shareButton.copied"), { position: "top-center" })
  }

  return (
    <div className="mt-4">
      <Button className="w-full p-6" onClick={() => handleShare()}>
        <div>
          <div
            className="mb-0 pb-0 text-[1.1rem]"
            style={{
              marginBottom: "-0.5rem",
            }}
          >
            {t("shareButton.shareLink")}
          </div>
          <div className="h-4 text-sm text-muted-foreground">
            {date ? t("shareButton.lastShared", { date }) : ""}
          </div>
        </div>
      </Button>
    </div>
  )
}
