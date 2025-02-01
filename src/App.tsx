import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import RootLayout from "./layout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Profile from "./pages/profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/signup" element={<RootLayout />} />

        {/* Routes for authenticated users */}
        {/* <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
