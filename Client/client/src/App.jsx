import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import TripsPage from "./Pages/TripsPage";
import MyGroupsPage from "./Pages/MyGroupsPage";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/my-groups" element={<MyGroupsPage />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;