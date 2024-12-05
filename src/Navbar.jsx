import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo-container">
          <Link to="/">
            <img
              src="/star-wars.svg"
              alt="Star Wars Logo"
              className="navbar-logo"
            />
          </Link>
        </div>

        <ul className="navbar-links">
          <li>
            <Link to="/listar" className="navbar-link">
              Listar Personagens
            </Link>
          </li>
          <li>
            <Link to="/adicionar" className="navbar-link">
              Adicionar Personagem
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
