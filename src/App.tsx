import { useState } from "react"

import Calendar from "./components/DatePicker"
import PeoplePicker from "./components/PeoplePicker"
import SlotAssigner from "./components/SlotAssigner"
import { createAlternateSchedule } from "./utils/createAlternateScheldule"
import AssignmentDisplay from "./components/AssignmentDisplay"
import ScheduleDisplay from "./components/SchelduleDisplay"

function App() {
  const [people, setPeople] = useState<string[]>([])
  const [dates, setDates] = useState<Date[]>([])
  const [assignments, setAssignments] = useState<
    { date: Date; assigned: string[] }[]
  >([])
  const [schedule, setSchedule] = useState<
    { date: Date; person: string }[] | null
  >(null)
  const handleGenerateSchedule = () => {
    const schedule = createAlternateSchedule(people, dates, assignments)
    if (schedule) {
      setSchedule(schedule)
    } else {
      alert("Failed to generate a valid schedule with the given constraints.")
    }
  }
  return (
    <div className="wrapper">
      <Calendar onFinalize={(dates) => setDates(dates)} />
      <PeoplePicker onFinalize={(people) => setPeople(people)} />

      <SlotAssigner people={people} dates={dates} onFinalize={setAssignments} />
      <AssignmentDisplay assignments={assignments} />
      <button onClick={() => handleGenerateSchedule()}>
        Generate schedule
      </button>
      <h2>Generated Schedule:</h2>
      <ScheduleDisplay schedule={schedule} />
      <h2>Individual Assignments:</h2>
      {schedule ? (
        people.map((person) => {
          const individualSchedule = schedule.filter((s) => s.person === person)
          return (
            <div key={person}>
              <h3>{person}</h3>
              <ScheduleDisplay schedule={individualSchedule} />
            </div>
          )
        })
      ) : (
        <p>No schedule generated yet.</p>
      )}
    </div>
  )
}

export default App