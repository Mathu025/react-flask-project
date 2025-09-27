import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TripsPage() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); // get logged-in user

    useEffect(() => {
        async function fetchTrips() {
        try {
            const res = await fetch("http://127.0.0.1:5555/trips");
            const data = await res.json();
            setTrips(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
        fetchTrips();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this trip?")) return;
        try {
            await fetch(`http://127.0.0.1:5555/trips/${id}`, { method: "DELETE" });
            setTrips(trips.filter(trip => trip.id !== id));
            alert("Trip deleted successfully!")
        } catch (err) {
            console.error("Error deleting trip:", err);
        }
    };

    const handleJoin = async (tripId) => {
        if (!user) {
            alert("You must be logged in to join a trip.");
            return;
        }

        try {
        const res = await fetch(`http://127.0.0.1:5555/trips/${tripId}/join`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id }),
        });
        if (!res.ok) throw new Error("Failed to join trip");

        alert("You have successfully joined the trip!");
        } catch (err) {
            console.error(err);
            alert("Error joining trip.");
        }
    };

    if (loading) return <p>Loading trips...</p>;

    return (
        <div>
            <h2>All Trips</h2>
            {trips.length === 0 ? (
            <p>No trips found.</p>
        ) : (
            <ul>
                {trips.map(trip => (
                <li key={trip.id}>
                <Link to={`/trips/${trip.id}`}>{trip.destination}</Link>{" "}
                <button onClick={() => handleDelete(trip.id)}>Delete</button>{" "}
                <button onClick={() => handleJoin(trip.id)}>
                    {user && trip.users?.includes(user.id) ? "Joined" : "Join"}
                    </button>
                </li>
            ))}
            </ul>
        )}
        {user && (
        <div>
            <Link to="/trips/new">
                <button>Create New Trip</button>
            </Link>
        </div>
        )}


        </div>
    );
}
