export const formatDate = (date: Date, locale?: string) => {
  const currentLocale = (locale ?? "en").toLowerCase()
  const language = currentLocale.split("-")[0]
  console.log("[formatDate] received locale:", locale, "using:", currentLocale)

  if (language === "lv") {
    // Latvian format: 01.06.2026
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    console.log(
      "[formatDate] formatting as Latvian:",
      `${day}.${month}.${year}`
    )
    return `${day}.${month}.${year}`
  }

  // English format: Mon Jun 01 2026
  console.log("[formatDate] formatting as English:", date.toDateString())
  return date.toDateString()
}
