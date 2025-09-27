

const API_URL = "http://127.0.0.1:5555";

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
    
    const responseText = await res.text();
    console.log("Raw response:", responseText);
    
    if (!res.ok) {
        let errorMessage = `HTTP ${res.status}: `;
        
        try {
            const errorData = JSON.parse(responseText);
            errorMessage += errorData.message || errorData.error || JSON.stringify(errorData);
        } catch (e) {
            errorMessage += responseText || res.statusText;
        }
        
        console.error("Server error details:", errorMessage);
        throw new Error(errorMessage);
    }
    
    try {
        return JSON.parse(responseText);
    } catch (e) {
        console.error("Failed to parse success response:", responseText);
        throw new Error("Invalid response format from server");
    }
}

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


    export async function signup(userData) {
    const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to sign up");
    }
    return res.json();
    }

    export async function login(credentials) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to login");
    }
    return res.json();
    }

    export async function fetchCurrentUser(tokenOrNothing) {
    const res = await fetch(`${API_URL}/me`, {
        headers: tokenOrNothing
        ? { Authorization: `Bearer ${tokenOrNothing}` }
        : undefined,
    });
    if (!res.ok) {
        throw new Error("Failed to fetch current user");
    }
    return res.json();
    }

    export async function deleteTrip(id) {
    const res = await fetch(`${API_URL}/trips/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete trip");
    return true;
}

export async function deleteGroup(id) {
    const res = await fetch(`${API_URL}/trips/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete trip");
    return true;
}
