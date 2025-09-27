export default function TripsList({ trips }) {
  return (
    <div>
      <h2>All Trips</h2>
      {trips.length === 0 ? (
        <p>No trips available</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>
              <strong>{trip.destination}</strong> <br />
              {trip.details} <br />
              From: {trip.start_date} To: {trip.end_date} <br />
              By User ID: {trip.user_id}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
