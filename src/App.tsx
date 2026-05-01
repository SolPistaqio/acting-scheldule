import { useEffect, useRef, useState } from "react"

import Calendar from "./components/DatePicker"
import PeoplePicker from "./components/PeoplePicker"
import { createAlternateSchedule } from "./utils/createAlternateScheldule"
import ScheduleDisplay from "./components/SchelduleDisplay"
import PlayInfoForm from "./components/PlayInfoForm"
import type { Assignment, PlayInfo, Slot } from "./types/d"
import { encodeState } from "./utils/encoding"

function App() {
  const [people, setPeople] = useState<string[]>([])
  const [assignments, setAssignments] = useState<
    Slot[]
  >([])
  const [schedule, setSchedule] = useState<Assignment[] | null>(null)
  const [playInfo, setPlayInfo] = useState<PlayInfo | null>(null)
  const scheduleRef = useRef<HTMLDivElement>(null)
  const handleGenerateSchedule = () => {
    const schedule = createAlternateSchedule(assignments)
    if (schedule) {
      setSchedule(schedule)
    } else {
      alert("Failed to generate a valid schedule with the given constraints.")
    }
  }
  useEffect(() => {
    if (schedule) {
      scheduleRef.current?.scrollIntoView({ behavior: "smooth" })
      const encodedState = encodeState(assignments)
      console.log("Encoded State:", encodedState)
    }
  }, [schedule]) //eslint-disable-line react-hooks/exhaustive-deps

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