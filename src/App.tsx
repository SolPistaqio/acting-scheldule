import { useState } from "react"

import Calendar from "./components/DatePicker"
import PeoplePicker from "./components/PeoplePicker"
// import SlotAssigner from "./components/SlotAssigner"
import { createAlternateSchedule } from "./utils/createAlternateScheldule"
import ScheduleDisplay from "./components/SchelduleDisplay"

function App() {
  const [people, setPeople] = useState<string[]>([])
  const [assignments, setAssignments] = useState<
    { date: Date; assigned: string[] }[]
  >([])
  const [schedule, setSchedule] = useState<
    { date: Date; person: string }[] | null
  >(null)
  const handleGenerateSchedule = () => {
    const schedule = createAlternateSchedule(assignments)
    if (schedule) {
      setSchedule(schedule)
    } else {
      alert("Failed to generate a valid schedule with the given constraints.")
    }
  }
  return (
    <div className="wrapper">
      <PeoplePicker onFinalize={(people) => setPeople(people)} />
      <Calendar
        onFinalize={(assignments) => {
          setAssignments(assignments)
          handleGenerateSchedule()
        }}
        people={people}
        assignments={assignments}
        setAssignments={setAssignments}
      />

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