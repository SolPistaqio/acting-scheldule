export default function DateDisplay({ dates }: { dates: Date[] }) {
  return (
    <div>
      <h3>Selected Dates:</h3>
      <ul>
        {dates.map((date, index) => (
          <li key={index}>{date.toDateString()}</li>
        ))}
      </ul>
    </div>
  );
}