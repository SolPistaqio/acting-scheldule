export default function AssignmentDisplay({ assignments }: { assignments: { date: Date, assigned: string[] }[] }) {
    return (
        <div>
            <h3>Assignments:</h3>
            <ul>
                {assignments.map((assignment, index) => (
                    <li key={index}>
                        {assignment.date.toDateString()}: {assignment.assigned.join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
}