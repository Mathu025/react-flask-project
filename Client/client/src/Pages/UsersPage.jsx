import {useEffect, useState} from "react";
import { fetchUsers } from "../api";

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, []);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>All Users</h2>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                    users.map(user => (
                        <div key={user.id} className="user-card">
                            <h3>{user.name}</h3>
                            <p>Email: {user.email}</p>
                            <p>Role: {user.role}</p>
                            <p>Trips Joined: {user.trips.length}</p>
                        </div>
                    ))
                )}
        </div>

    );
}

export default UsersPage;