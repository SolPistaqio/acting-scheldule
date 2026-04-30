import { useState } from "react"

import Calendar from "./components/DatePicker"
import PeoplePicker from "./components/PeoplePicker"
// import SlotAssigner from "./components/SlotAssigner"
import { createAlternateSchedule } from "./utils/createAlternateScheldule"
import ScheduleDisplay from "./components/SchelduleDisplay"
import PlayInfoForm from "./components/PlayInfoForm"

function App() {
  const [people, setPeople] = useState<string[]>([])
  const [assignments, setAssignments] = useState<
    { date: Date; assigned: string[] }[]
  >([])
  const [schedule, setSchedule] = useState<
    { date: Date; person: string }[] | null
  >(null)
  const [playInfo, setPlayInfo] = useState<{ name: string; rehearsalTime: string } | null>(null)
  const handleGenerateSchedule = () => {
    const schedule = createAlternateSchedule(assignments)
    if (schedule) {
      setSchedule(schedule)
    } else {
      alert("Failed to generate a valid schedule with the given constraints.")
    }
  }

  return (
    <>
      <PlayInfoForm setPlayInfo={setPlayInfo} />
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
      <ScheduleDisplay schedule={schedule} />
      {schedule &&
        people.map((person) => {
          const individualSchedule = schedule.filter((s) => s.person === person)
          return (
              <ScheduleDisplay
                schedule={individualSchedule}
                name={person}
                playInfo={playInfo}
                key={person}
              />
          )
        })}
    </>
  )
}

export default App