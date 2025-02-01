import { Link } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { user, logout } = UseAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors"
          >
            GasByGas
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks user={user} logout={logout} />
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <NavLinks user={user} logout={logout} mobile />
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLinks({
  user,
  logout,
  mobile = false,
}: {
  user: any;
  logout: () => void;
  mobile?: boolean;
}) {
  const linkClass = `block py-2 hover:text-blue-200 transition-colors ${
    mobile ? "text-lg" : ""
  }`;

  return (
    <ul className={`${mobile ? "space-y-2" : "flex items-center space-x-4"}`}>
      <li>
        <Link to="/" className={linkClass}>
          Home
        </Link>
      </li>
      {user ? (
        <>
          <li>
            <Link to="/dashboard" className={linkClass}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/request" className={linkClass}>
              Request Gas
            </Link>
          </li>
          <li>
            <Link to="/profile" className={linkClass}>
              Profile
            </Link>
          </li>
          <li>
            <button onClick={logout} className={`${linkClass} font-semibold`}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login" className={linkClass}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className={`${linkClass} font-semibold`}>
              Register
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
