import {useEffect, useState} from "react";
import { fetchTrips } from "../api";

function TripsPage() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadTrips() {
            try {
                const data = await fetchTrips();
                setTrips(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadTrips();
    }, []);

    if (loading) return <p>Loading trips...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Available Trips</h2>
            {trips.length === 0 ? (
                <p>No trips available.</p>
            ) : (
                <ul>
                    {trips.map(trip => (
                        <li key={trip.id}>
                            <h3>{trip.destination}</h3>
                            <p>{trip.description}</p>
                            <p><strong>Dates:</strong> {trip.start_date} to {trip.end_date}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TripsPage;   