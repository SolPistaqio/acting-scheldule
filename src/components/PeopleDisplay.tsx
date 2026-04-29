import { Button } from "./ui/button";

export default function PeopleDisplay({ people, handleRemoveAlternate }: { people: string[]; handleRemoveAlternate: (alternate: string) => void }) {
  return (
    <div>
      <h3>Available Alternates:</h3>
      <ul>
        {people.map((person, index) => (
          <li key={index}>
            <div className="grid grid-cols-[1fr_1fr] items-center space-x-2">
              {person}
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRemoveAlternate(person)}
              >
                X
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}