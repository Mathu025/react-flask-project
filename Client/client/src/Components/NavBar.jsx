import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="navbar">
            <h1>Travel Buddy</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/trips">Trips</Link>
                <Link to="/my-groups">My Groups</Link>
                <Link to="/users">Users</Link>
                <Link to="/signup">Profile</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}
export default NavBar;