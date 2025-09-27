    import { useEffect, useState } from "react";
    import { useParams, useNavigate, Link } from "react-router-dom";

    function TripDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/trips/${id}`)
        .then(res => res.json())
        .then(data => setTrip(data))
        .catch(err => console.error(err));
    }, [id]);

    if (!trip) return <p>Loading trip...</p>;

    return (
        <div>
        <h2>{trip.destination}</h2>
        <p>{trip.description}</p>
        <p>
            {trip.start_date} → {trip.end_date}
        </p>

        <Link to={`/trips/${id}/edit`}>
            <button>Edit</button>
        </Link>
        <button onClick={() => navigate("/trips")}>Back</button>
        </div>
    );
    }

    export default TripDetails;
