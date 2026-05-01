import { useRef, useState } from "react"

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
  const scheduleRef = useRef<HTMLDivElement>(null)
  const handleGenerateSchedule = () => {
    const schedule = createAlternateSchedule(assignments)
    if (schedule) {
      setSchedule(schedule)
      scheduleRef.current?.scrollIntoView({ behavior: "smooth" })
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
      <div ref={scheduleRef}>
        <ScheduleDisplay schedule={schedule} />
      </div>
      <div className="mx-auto w-full max-w-2xl sm:flex">
        {schedule &&
          people.map((person) => {
            const individualSchedule = schedule.filter(
              (s) => s.person === person
            )
            return (
              <ScheduleDisplay
                schedule={individualSchedule}
                name={person}
                playInfo={playInfo}
                key={person}
              />
            )
          })}
      </div>
    </>
  )
}

export default App