// src/api.js

const API_URL = "http://127.0.0.1:5555";

// --- TRIPS ---
export async function fetchTrips() {
    const res = await fetch(`${API_URL}/trips`);
    if (!res.ok) throw new Error("Failed to fetch trips");
    return res.json();
}

export async function fetchTripById(id) {
    const res = await fetch(`${API_URL}/trips/${id}`);
    if (!res.ok) throw new Error("Failed to fetch trip");
    return res.json();
}

export async function createTrip(tripData) {
    console.log("Sending trip data:", tripData); // Debug log
    
    const res = await fetch(`${API_URL}/trips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripData),
    });
    
    console.log("Response status:", res.status);
    console.log("Response headers:", Object.fromEntries(res.headers.entries()));
    
    // Always try to get the response body for debugging
    const responseText = await res.text();
    console.log("Raw response:", responseText);
    
    if (!res.ok) {
        let errorMessage = `HTTP ${res.status}: `;
        
        try {
            // Try to parse as JSON first
            const errorData = JSON.parse(responseText);
            errorMessage += errorData.message || errorData.error || JSON.stringify(errorData);
        } catch (e) {
            // If not JSON, use the text
            errorMessage += responseText || res.statusText;
        }
        
        console.error("Server error details:", errorMessage);
        throw new Error(errorMessage);
    }
    
    // Parse the successful response
    try {
        return JSON.parse(responseText);
    } catch (e) {
        console.error("Failed to parse success response:", responseText);
        throw new Error("Invalid response format from server");
    }
}

// --- USERS ---
export async function fetchUsers() {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
}

export async function fetchUserById(id) {
    const res = await fetch(`${API_URL}/users/${id}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
}

export async function createUser(userData) {
    const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Failed to create user");
    return res.json();
}

// --- GROUPS ---
export async function fetchGroups() {
    const res = await fetch(`${API_URL}/travelgroups`);
    if (!res.ok) throw new Error("Failed to fetch groups");
    return res.json();
}

export async function fetchGroupById(id) {
    const res = await fetch(`${API_URL}/travelgroups/${id}`);
    if (!res.ok) throw new Error("Failed to fetch group");
    return res.json();
}

export async function createGroup(groupData) {
    const res = await fetch(`${API_URL}/travelgroups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupData),
    });
    if (!res.ok) throw new Error("Failed to create group");
    return res.json();
}

export async function fetchMemberships() {
    const res = await fetch(`${API_URL}/memberships`);
    if (!res.ok) throw new Error("Failed to fetch memberships");
    return res.json();
}

export async function createMembership(membershipData) {
    const res = await fetch(`${API_URL}/memberships`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(membershipData),
    });
    if (!res.ok) throw new Error("Failed to join group");
    return res.json();
}

export async function deleteMembership(id) {
    const res = await fetch(`${API_URL}/memberships/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to leave group");
    return res.json();
}