export default function ScheduleDisplay({ schedule }: { schedule: { date: Date, person: string }[] | null }) {
    if(!schedule) {
        return null;
    }
    return (
        <div>
            <h3>Generated Schedule:</h3>
            <ul>
                {schedule.map((slot, index) => (
                    <li key={index}>
                        {slot.date.toDateString()}: {slot.person}
                    </li>
                ))}
            </ul>
        </div>
    );
}