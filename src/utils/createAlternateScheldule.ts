const REQUIRED = 4;

// helper: check consecutive dates
const isConsecutive = (d1: Date, d2: Date) => {
  const day1 = d1.getTime();
  const day2 = d2.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  return day2 - day1 === oneDay;
};

interface Slot {
  date: Date;
  options: string[];
}

interface Assignment {
  date: Date;
  person: string;
}

export function createAlternateSchedule(
  people: string[],
  dates: Date[],
  assignments: { date: Date; assigned: string[] }[],
): Assignment[] | null {
  // Build slots from dates and available people
  const slots: Slot[] = dates.map((date) => {
    const slotAssignment = assignments.find(
      (a) => a.date.getTime() === date.getTime(),
    );
    return {
      date,
      options: slotAssignment?.assigned || people,
    };
  });

  const result: Assignment[] = [];
  const count: { [key: string]: number } = {};
  people.forEach((p) => (count[p] = 0));

  function backtrack(i: number): boolean {
    if (i === slots.length) {
      return people.every((p) => count[p] === REQUIRED);
    }

    const slot = slots[i];

    // Sort options by assignment count (ascending) to prefer people with fewer assignments
    const sortedOptions = [...slot.options].sort((a, b) => count[a] - count[b]);

    for (const person of sortedOptions) {
      if (count[person] >= REQUIRED) continue;

      // avoid consecutive days for same person
      const prev = result[result.length - 1];
      if (
        prev &&
        prev.person === person &&
        isConsecutive(prev.date, slot.date)
      ) {
        continue;
      }

      result.push({ date: slot.date, person });
      count[person]++;

      if (backtrack(i + 1)) return true;

      result.pop();
      count[person]--;
    }

    return false;
  }

  return backtrack(0) ? result : null;
}
