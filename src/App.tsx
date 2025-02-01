import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import RootLayout from "./layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/signup" element={<RootLayout />} />
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
