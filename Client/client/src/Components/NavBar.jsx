import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
    return (
        <nav className="navbar">
            <h1>Travel Buddy</h1>
            <div className="links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/trips">Trips</NavLink>
                <NavLink to="/my-groups">My Groups</NavLink>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/signup">SignUp</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>
        </nav>
    );
}
export default NavBar;