interface Slot {
  date: Date
  options: string[]
}

interface Assignment {
  date: Date
  person: string
}

export function createAlternateSchedule(
  assignments: { date: Date; assigned: string[] }[]
): Assignment[] | null {
  const people = [...new Set(assignments.flatMap((a) => a.assigned))]
  //sort assignments by date in ascending order
  assignments.sort((a, b) => a.date.getTime() - b.date.getTime())

  const slots: Slot[] = assignments.map((a) => ({
    date: a.date,
    options: a.assigned,
  }))

  const REQUIRED = Math.floor(assignments.length / people.length)
  const result: Assignment[] = []
  const count: { [key: string]: number } = {}
  people.forEach((p) => (count[p] = 0))

  function availableSlots(person: string, fromIndex: number): number {
    let n = 0
    for (let j = fromIndex; j < slots.length; j++) {
      if (slots[j].options.includes(person)) n++
    }
    return n
  }

  // Only filter on the hard constraint (can't exceed REQUIRED unless everyone
  // has already met it). Never hard-filter based on "same person as previous
  // slot" — that's a preference, not a rule, and hard-filtering it can prune
  // out the only valid solution.
  function getValidOptions(slotIndex: number): string[] {
    const slot = slots[slotIndex]
    const allMet = people.every((p) => count[p] >= REQUIRED)

    return slot.options.filter((person) => {
      if (!allMet && count[person] >= REQUIRED) return false
      return true
    })
  }

  function backtrack(i: number, depth: number = 0): boolean {
    if (i === slots.length) {
      return people.every((p) => count[p] >= REQUIRED)
    }

    const slot = slots[i]
    const validOptions = getValidOptions(i)

    if (validOptions.length === 0) {
      return false
    }

    // Forward feasibility check (unchanged — this one is a legitimate
    // necessary condition, not an over-eager filter)
    for (const person of people) {
      const remaining = REQUIRED - count[person]
      if (remaining <= 0) continue
      const available = availableSlots(person, i)
      if (available < remaining) {
        return false
      }
    }

    const prev = result[result.length - 1]
    const allMet = people.every((p) => count[p] >= REQUIRED)

    // Sort as a PREFERENCE only: try to avoid repeating the same person as
    // the previous slot when they have slack, and prefer the most-constrained
    // person otherwise. But every valid option is still tried if the
    // preferred one doesn't pan out.
    const sortedOptions = [...validOptions].sort((a, b) => {
      if (allMet) {
        return count[a] - count[b]
      }

      const aIsRepeat = prev && prev.person === a
      const bIsRepeat = prev && prev.person === b

      const slackA = availableSlots(a, i) - (REQUIRED - count[a])
      const slackB = availableSlots(b, i) - (REQUIRED - count[b])

      // Penalize (deprioritize, don't eliminate) repeating the same person
      // when they still have slack to be used elsewhere.
      const aPenalty = aIsRepeat && slackA > 0 ? 1 : 0
      const bPenalty = bIsRepeat && slackB > 0 ? 1 : 0
      if (aPenalty !== bPenalty) return aPenalty - bPenalty

      return slackA - slackB
    })

    for (const person of sortedOptions) {
      result.push({ date: slot.date, person })
      count[person]++

      if (backtrack(i + 1, depth + 1)) return true

      result.pop()
      count[person]--
    }

    return false
  }

  const success = backtrack(0)
  return success ? result : null
}
