import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Common routes for all users */}
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Home />} />
        <Route path="/signin" element={<Home />} />

        {/* Routes for authenticated users */}
        {/* <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
