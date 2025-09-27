import { useState } from "react";
import { createTrip } from "../api";

export default function TripForm({ onAddTrip }) {
    const [formData, setFormData] = useState({
        destination: "",
        details: "",
        start_date: "",
        end_date: "",
        user_id: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function validateForm() {
        const { destination, details, start_date, end_date, user_id } = formData;

        if (!destination.trim()) return "Destination is required.";
        if (!details.trim()) return "Details are required.";
        if (!start_date) return "Start date is required.";
        if (!end_date) return "End date is required.";
        if (new Date(start_date) > new Date(end_date))
            return "Start date cannot be after end date.";
        if (!user_id) return "User ID is required.";
        if (isNaN(user_id)) return "User ID must be a number.";

        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        const validationError = validateForm();
        if (validationError) {
        setError(validationError);
        return;
        }

        try {
        const newTrip = await createTrip(formData);
        onAddTrip(newTrip); 
        setSuccess("Trip created successfully!");
        setFormData({
            destination: "",
            details: "",
            start_date: "",
            end_date: "",
            user_id: "",
        });
        } 
        catch (err) { setError("Failed to create trip. Please try again."); }    
    }

    return (
        <form onSubmit={handleSubmit}>
        <h2>Create a New Trip</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
        />
        <br />

        <textarea
            name="details"
            placeholder="Trip Details"
            value={formData.details}
            onChange={handleChange}
        />
        <br />

        <label>Start Date: </label>
        <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
        />
        <br />

        <label>End Date: </label>
        <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
        />
        <br />

        <input
            type="number"
            name="user_id"
            placeholder="User ID"
            value={formData.user_id}
            onChange={handleChange}
        />
        <br />

        <button type="submit">Add Trip</button>
        </form>
    );
    }


