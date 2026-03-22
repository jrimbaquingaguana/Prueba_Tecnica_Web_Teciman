import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="app-header">
      <div className="container header-content">
        <div>
          <h1 className="brand-title">Wine Analysis App</h1>
          <p className="brand-subtitle">
            Registro, visualización y envío de análisis
          </p>
        </div>

        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Nuevo registro
          </NavLink>

          <NavLink
            to="/records"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Visualización
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;