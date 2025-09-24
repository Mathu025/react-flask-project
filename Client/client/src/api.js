const API_URL = "http://127.0.0.1:5555";

export async function fetchTrips() {
    const res = await fetch(`${API_URL}/trips`);
    if (!res.ok) {
        throw new Error("Failed to fetch trips")
    }
    return res.json();
}