function TripCard({ trip }) {
    return (
        <div className="trip-card">
            <h3>{trip.destination}</h3>
            <p>{trip.description}</p>
            <p><strong>Dates:</strong> {trip.start_date} to {trip.end_date}</p>
        </div>
    );
}

export default TripCard;