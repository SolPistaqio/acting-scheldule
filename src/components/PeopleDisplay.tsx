export default function PeopleDisplay({ people }: { people: string[] }) {
  return (
    <div>
      <h3>Available Alternates:</h3>
      <ul>
        {people.map((person, index) => (
          <li key={index}>{person}</li>
        ))}
      </ul>
    </div>
  );
}