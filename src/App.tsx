import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import RootLayout from "./layout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import GasRequest from "./pages/request";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="request" element={<GasRequest />} />
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
