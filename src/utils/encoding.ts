import LZString from "lz-string"
import type { Slot } from "../types/d"

export function encodeState(state: Slot[]): string {
  return LZString.compressToEncodedURIComponent(
    JSON.stringify({
      ...state,
    })
  )
}

export function decodeState(hash: string): Slot[] | null {
  const str = LZString.decompressFromEncodedURIComponent(hash)
  if (!str) return null

  const parsed = JSON.parse(str)
  return {
    ...parsed,
  }
}
