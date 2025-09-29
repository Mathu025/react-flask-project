function GroupCard({group}) {
    return (
        <div>
        <h3>Group Name: {group.group_name}</h3>
        <p>Max-Numbers: {group.max_members}</p>
        {group.trip && (
                <p><strong>Trip:</strong> {group.trip.destination}</p>
            )}
        </div>
    );
}

export default GroupCard;