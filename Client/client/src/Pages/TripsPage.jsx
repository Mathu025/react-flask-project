import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/trips")
      .then(res => res.json())
      .then(data => {
        setTrips(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await fetch(`http://127.0.0.1:5555/trips/${id}`, { method: "DELETE" });
      setTrips(trips.filter(trip => trip.id !== id));
    } catch (err) {
      console.error("Error deleting trip:", err);
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
              <button onClick={() => handleDelete(trip.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TripsPage;
