import {useEffect, useState} from "react";
import { fetchTrips } from "../api";
import TripCard from "../Components/TripCard";  

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
                    trips.map(trip => (
                        <TripCard key={trip.id} trip={trip} /> )
                    ))}
        </div>      
                    
    );
}

export default TripsPage;   