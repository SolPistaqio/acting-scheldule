import { decodeState } from "./encoding";
import type { Slot } from "../types/d"
import { createAlternateSchedule } from "./createAlternateScheldule";


export function decodeUrlState(urlState: string | null) {
  if (!urlState) return null
  const decoded = decodeState(urlState)
  if (!decoded) return null
  const slots: Slot[] = Object.values(decoded)
  const slotsWithDates = slots.map((slot) => ({
    ...slot,
    date: new Date(slot.date),
  }))
  console.log("Decoded state from URL:", slotsWithDates)
  return {
    slots: slotsWithDates,
    schedule: createAlternateSchedule(slotsWithDates) ?? null,
  }
}

export function decodePeopleFromUrlState(urlState: string | null): string[] {
  if (!urlState) return []
  const decoded = decodeState(urlState)
  return decoded ? Object.values(decoded) : []
}

