import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import TripsPage from "./Pages/TripsPage";
import TripDetails from "./Pages/TripDetails";
import EditTrip from "./Pages/EditTrip";
import MyGroupsPage from "./Pages/MyGroupsPage";
import UsersPage from "./Pages/UsersPage";
import ProfilePage from "./Pages/ProfilePage";  

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:id" element={<TripDetails />} />
          <Route path="/trips/:id/edit" element={<EditTrip />} />
          <Route path="/my-groups" element={<MyGroupsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
