import { useEffect, useState } from "react";    
import { fetchUsers } from "../api";
import GroupCard from "../Components/GroupCard";

function MyGroupsPage() {
    const [myTrips, setMyTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentUserId = 1;  

    useEffect(() => {
        async function loadGroups() {
            try {
                const users = await fetchUsers();
                const me = users.find(user => user.id === currentUserId);
                setMyTrips(me?.trips || []);
            }                   
            catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadGroups();
    }, []);

    if (loading) return <p>Loading your groups...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>My Travel Groups</h2>
            {myTrips.length === 0 ? (
                <p>You are not part of any travel groups.</p>
            ) : (
                    myTrips.map(trip => (
                        <GroupCard key={trip.id} trip={trip} /> )
                    ))}
        </div>      

    );
}

export default MyGroupsPage;