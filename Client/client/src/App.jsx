import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import TripsPage from "./Pages/TripsPage";
import TripDetails from "./Pages/TripDetails";
import EditTrip from "./Pages/EditTrip";
import MyGroupsPage from "./Pages/MyGroupsPage";
import UsersPage from "./Pages/UsersPage";
import ProfilePage from "./Pages/ProfilePage";  
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Pages/Login";    

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trips" element={<ProtectedRoute> <TripsPage /> </ProtectedRoute>} />
          <Route path="/trips/:id" element={<ProtectedRoute> <TripDetails /> </ProtectedRoute>} />
          <Route path="/trips/:id/edit" element={<ProtectedRoute><EditTrip /> </ProtectedRoute>} />
          <Route path="/my-groups" element={<ProtectedRoute> <MyGroupsPage /> </ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><UsersPage /> </ProtectedRoute>} />
          <Route path="/signup" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
