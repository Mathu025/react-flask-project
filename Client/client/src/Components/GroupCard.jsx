function GroupCard({trip}) {
    return (
        <div>
        <h3>{trip.destination}</h3>
        <p>{trip.details}</p>
        <p><strong>Dates:</strong>{trip.start_date}-{trip.end_date}</p>
        </div>
    );
}

export default GroupCard;