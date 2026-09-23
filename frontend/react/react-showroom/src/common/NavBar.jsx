import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/counter-zus">Counter [ZUSTAND]</Link>
        </li>
        <li>
          <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        </li>
        <li>
          <Link to="/search">Wikipedia Search</Link>
        </li>
        <li>
          <Link to="/chrono">Chronometer</Link>
        </li>
        <li>
          <Link to="/wc">World Clock</Link>
        </li>
        <li>
          <Link to="/fav-list-zus">Favorite List [Zustand]</Link>
        </li>
        <li>
          <Link to="/fav-list-redux">Favorite List [Redux]</Link>
        </li>
        <li>
          <Link to="/quiz-app">Quiz Application</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
