"use client"
import { useEffect, useRef, useState } from "react"

import Calendar from "./components/DatePicker"
import PeoplePicker from "./components/PeoplePicker"
import { createAlternateSchedule } from "./utils/createAlternateScheldule"
import ScheduleDisplay from "./components/SchelduleDisplay"
import PlayInfoForm from "./components/PlayInfoForm"
import type { Assignment, PlayInfo, Slot } from "./types/d"
import { encodeState, decodeState } from "./utils/encoding"
import { useSearchParams } from "react-router-dom"
import {
  decodeUrlState,
  decodePeopleFromUrlState,
} from "./utils/decodeUrlState"
import { Toaster } from "@/components/ui/sonner"

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialState = decodeUrlState(searchParams.get("state"))
  const initialPeople = decodePeopleFromUrlState(searchParams.get("people"))
  const initialPlayInfo = decodeState(
    searchParams.get("playInfo") ?? ""
  ) as PlayInfo | null
  const [people, setPeople] = useState<string[]>(initialPeople ?? [])
  const [assignments, setAssignments] = useState<Slot[]>(
    initialState?.slots ?? []
  )
  const [schedule, setSchedule] = useState<Assignment[] | null>(
    initialState?.schedule ?? null
  )
  const [playInfo, setPlayInfo] = useState<PlayInfo | null>(
    initialPlayInfo ?? null
  )
  const scheduleRef = useRef<HTMLDivElement>(null)
  const handleGenerateSchedule = () => {
    const schedule = createAlternateSchedule(assignments)
    if (schedule) {
      setSchedule(schedule)
      const encoded = encodeState(assignments)
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev) // copy existing params
        next.set("state", encoded)
        return next
      })
    } else {
      alert("Failed to generate a valid schedule with the given constraints.")
    }
  }

  useEffect(() => {
    const encodedPeople = encodeState(people)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set("people", encodedPeople)
      return next
    })
  }, [people, setSearchParams])

  useEffect(() => {
    const encodedPlayInfo = encodeState(playInfo)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set("playInfo", encodedPlayInfo)
      return next
    })
  }, [playInfo, setSearchParams])

  return (
    <>
      <Toaster />
      <PlayInfoForm setPlayInfo={setPlayInfo} playInfo={playInfo} />
      <PeoplePicker
        onFinalize={(people) => setPeople(people)}
        initialState={initialPeople}
      />

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
