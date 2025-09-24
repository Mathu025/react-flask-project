import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    start_date: "",
    end_date: "",
    description: ""
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/trips/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://127.0.0.1:5555/trips/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      navigate(`/trips/${id}`);
    } catch (err) {
      console.error("Error updating trip:", err);
    }
  };

  return (
    <div>
      <h2>Edit Trip</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
        />
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">Update Trip</button>
      </form>
    </div>
  );
}

export default EditTrip;
