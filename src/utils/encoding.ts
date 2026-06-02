import LZString from "lz-string"
import type { PlayInfo, Slot } from "../types/d"

export function encodeState(state: Slot[] | string[] | PlayInfo | null): string {
  return LZString.compressToEncodedURIComponent(
    JSON.stringify({
      ...state,
    })
  )
}

export function decodeState(hash: string): Slot[] | string[] | PlayInfo | null {
  if (!hash) return null
  const str = LZString.decompressFromEncodedURIComponent(hash)
  if (!str) return null

  const parsed = JSON.parse(str)
  return {
    ...parsed,
  }
}
