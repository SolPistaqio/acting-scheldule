import { useState } from "react";

export default function SlotAssigner({
  people,
  dates,
  onFinalize,
}: {
  people: string[];
  dates: Date[];
  onFinalize: (assignments: { date: Date; assigned: string[] }[]) => void;
}) {
  const [datesWithAssignments, setDatesWithAssignments] = useState<
    { date: Date; assigned: string[] }[]
  >([]);
  const handleAlternateAssignment = (date: Date, person: string) => {
    setDatesWithAssignments((prev) => {
      const dateIndex = prev.findIndex(
        (d) => d.date.toISOString() === date.toISOString(),
      );
      if (dateIndex === -1) {
        return [...prev, { date, assigned: [person] }];
      }
      const updated = [...prev];
      updated[dateIndex] = {
        ...updated[dateIndex],
        assigned: updated[dateIndex].assigned.includes(person)
          ? updated[dateIndex].assigned.filter((p) => p !== person)
          : [...updated[dateIndex].assigned, person],
      };
      return updated;
    });
  };
  return (
    <div>
        <h2>Assign people to dates:</h2>
      {dates.map((date) => (
        <div key={date.toISOString()}>
          <p>{date.toDateString()}</p>
          {people.map((person, index) => (
            <span key={`${date.toISOString()}-${person}`}>
              <span key={index+date.toISOString()+person}>{person}</span>
              <input
                key={person + date.toISOString()}
                type="checkbox"
                value={person}
                onChange={() => {
                  handleAlternateAssignment(date, person);
                }}
              />
            </span>
          ))}
        </div>
      ))}
        <button onClick={() => onFinalize(datesWithAssignments)}>Finalize</button>
    </div>
  );
}