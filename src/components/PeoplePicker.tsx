import { useState } from "react";
import PeopleDisplay from "./PeopleDisplay";

const MAX_ALTERNATES = 3;

export default function PeoplePicker({
  onFinalize,
}: {
  onFinalize: (people: string[]) => void;
}) {
  const [currentAlternate, setCurrentAlternate] = useState<string>("");
  const [alternates, setAlternates] = useState<string[]>([]);

  return (
    <div>
      <div className="section">
        <input
          type="text"
          value={currentAlternate}
          onChange={(e) => setCurrentAlternate(e.target.value)}
        />
        <button
          onClick={() => {
            if (currentAlternate.trim() === "") return;
            if (alternates.length >= MAX_ALTERNATES) return;
            if (alternates.includes(currentAlternate)) return;
            setAlternates([...alternates, currentAlternate]);
            setCurrentAlternate("");
          }}>
          Add alternate
        </button>
        <PeopleDisplay people={alternates} />
      </div>
      <button onClick={() => onFinalize(alternates)}>
        Confirm alternate list
      </button>
    </div>
  );
}
