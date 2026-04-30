export default function addTimeToString(timeStr: string, hoursToAdd: number, minutesToAdd: number) {
  const [hours, minutes] = timeStr.split(":").map(Number)

  const totalMinutes = hours * 60 + minutes + hoursToAdd * 60 + minutesToAdd

  const newHours = Math.floor(totalMinutes / 60) % 24 // % 24 wraps midnight
  const newMinutes = totalMinutes % 60

  return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`
}
