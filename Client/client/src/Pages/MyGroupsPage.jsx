import { useEffect, useState } from "react";    
import { fetchGroups, deleteGroup } from "../api";  
import GroupCard from "../Components/GroupCard";

function MyGroupsPage() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadGroups() {
            try {
                const allGroups = await fetchGroups();
                setGroups(allGroups);
            }                   
            catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadGroups();
    }, []);

    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this group?")) return;
        try {
            console.log("Starting delete for group ID:", id);
            await deleteGroup(id); 
            console.log("Delete successful, updating UI");
            setGroups(groups.filter(group => group.id !== id)); 
        } catch (err) {
            console.error("Delete failed with error:", err);
            alert("Failed to delete group: " + err.message);
        }
    }

    if (loading) return <p>Loading groups...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>All Travel Groups</h2>
            {groups.length === 0 ? (
                <p>No travel groups found.</p>
            ) : (
                groups.map(group => (
                    <div key={group.id}>
                        <GroupCard group={group} />
                        <button onClick={() => handleDelete(group.id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default MyGroupsPage;