const REQUIRED = 4

const fmt = (d: Date) => d.toDateString().slice(0, 10)

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

  const slots: Slot[] = assignments.map((a) => ({
    date: a.date,
    options: a.assigned,
  }))

  console.log("=== createAlternateSchedule ===")
  console.log("People:", people)
  console.log("Slots:")
  slots.forEach((s, i) =>
    console.log(`  [${i}] ${fmt(s.date)} → options: [${s.options.join(", ")}]`)
  )

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

  function getValidOptions(slotIndex: number): string[] {
    const slot = slots[slotIndex]
    const prev = result[result.length - 1]
    const prevSlot = slotIndex > 0 ? slots[slotIndex - 1] : null
    const isConsecutiveSlot = !!(
      prev && prevSlot?.date.getTime() === prev.date.getTime()
    )
    const allMet = people.every((p) => count[p] >= REQUIRED)

    // First pass: apply all constraints normally
    const strictOptions = slot.options.filter((person) => {
      if (!allMet && count[person] >= REQUIRED) return false
      if (isConsecutiveSlot && prev.person === person) {
        if (allMet) {
          const othersInSlot = slot.options.filter((p) => p !== person)
          const allOthersHigher = othersInSlot.every(
            (p) => count[p] >= count[person]
          )
          if (!allOthersHigher) return false
        } else {
          const slack =
            availableSlots(person, slotIndex) - (REQUIRED - count[person])
          if (slack > 0) return false
        }
      }
      return true
    })

    // If strict filtering leaves at least one option, use it
    if (strictOptions.length > 0) return strictOptions

    // Last resort: slot has no valid options under strict rules,
    // so fall back to only the REQUIRED cap, drop consecutive constraint
    console.log(
      `    ⚠ Slot [${slotIndex}] has no strict options — relaxing consecutive constraint`
    )
    return slot.options.filter((person) => {
      if (!allMet && count[person] >= REQUIRED) {
        console.log(
          `    ✗ ${person} skipped — already at REQUIRED (${REQUIRED})`
        )
        return false
      }
      return true
    })
  }

  function backtrack(i: number, depth: number = 0): boolean {
    const indent = "  ".repeat(depth)

    if (i === slots.length) {
      const allMet = people.every((p) => count[p] >= REQUIRED)
      console.log(
        `${indent}✔ All slots filled. Counts:`,
        { ...count },
        allMet ? "→ SUCCESS" : "→ FAIL (not all met REQUIRED)"
      )
      return allMet
    }

    const slot = slots[i]
    console.log(`${indent}► Slot [${i}] ${fmt(slot.date)} | counts:`, {
      ...count,
    })

    const validOptions = getValidOptions(i)
    console.log(`${indent}  Valid options: [${validOptions.join(", ")}]`)

    if (validOptions.length === 0) {
      console.log(`${indent}  ✗ No valid options — backtracking`)
      return false
    }

    // Forward feasibility check
    for (const person of people) {
      const remaining = REQUIRED - count[person]
      if (remaining <= 0) continue
      const available = availableSlots(person, i)
      if (available < remaining) {
        console.log(
          `${indent}  ✗ Forward check failed: ${person} needs ${remaining} more but only ${available} slots available — backtracking`
        )
        return false
      }
    }

    // Sort by slack (most constrained first)
    const sortedOptions = [...validOptions].sort((a, b) => {
      const allMet = people.every((p) => count[p] >= REQUIRED)
      if (allMet) {
        // Phase 2: just distribute evenly
        return count[a] - count[b]
      }
      // Phase 1: most constrained first (lowest slack)
      const slackA = availableSlots(a, i) - (REQUIRED - count[a])
      const slackB = availableSlots(b, i) - (REQUIRED - count[b])
      return slackA - slackB
    })

    console.log(`${indent}  Trying order: [${sortedOptions.join(", ")}]`)

    for (const person of sortedOptions) {
      console.log(`${indent}  → Assign ${person} to ${fmt(slot.date)}`)
      result.push({ date: slot.date, person })
      count[person]++

      if (backtrack(i + 1, depth + 1)) return true

      console.log(`${indent}  ← Undo ${person} from ${fmt(slot.date)}`)
      result.pop()
      count[person]--
    }

    console.log(
      `${indent}  ✗ All options exhausted for slot [${i}] — backtracking`
    )
    return false
  }

  const success = backtrack(0)
  console.log("=== Result:", success ? "FOUND" : "NULL", "===")
  if (success) {
    console.log("Assignments:")
    result.forEach((a) => console.log(`  ${fmt(a.date)} → ${a.person}`))
  }
  return success ? result : null
}
