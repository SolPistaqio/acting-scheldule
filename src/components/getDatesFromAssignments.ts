import type { Slot } from "@/types/d"

export const getDatesFromAssignments = (assignments: Slot[]): Date[] => {
  const dates: Date[] = []
  for (const assignment of assignments) {
    dates.push(assignment.date)
  }
  return dates
}
