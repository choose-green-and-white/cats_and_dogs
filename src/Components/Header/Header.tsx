
import { NavLink } from "react-router-dom";
import "../Header/header.css";

export default function Header() {
  return (
    <nav className="header">
      <div>
        <NavLink to="/" >CATS</NavLink>
      </div>
      <div>
        <NavLink to="/dogs">DOGS</NavLink>
      </div>
      <div>
        <NavLink to="/fox">FOXES</NavLink>
      </div>
      <div>
        <NavLink to="/favorites">FAVORITES</NavLink>
      </div>
    </nav>
  );
}