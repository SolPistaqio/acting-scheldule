export interface Slot {
    date: Date
    assigned: string[]
}

export type Assignment = {
    date: Date
    person: string
}

export type PlayInfo = { name: string; rehearsalTime: string }

declare module "lz-string" {
  export function compressToEncodedURIComponent(input: string): string
  export function decompressFromEncodedURIComponent(
    input: string
  ): string | null
}