import { useState, useEffect } from "react";
import { NavLink} from "react-router-dom";
import NavStyle from "./Nav.module.css";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  // const auth=route.auth
  console.log()
  const navigate = useNavigate();
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "underline" : "none",
      color: isActive ? "Lightblue" : "white",
    };
  };

  const onLogout = () => {
    localStorage.clear();
    setisAuthenticated(false);
    setState(true)
    navigate("/login",{auth:false});
    window.location.reload()
  };
  useEffect(() => {}, []);
  const [isAuthenticated, setisAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") ? true : false
  );
  const [state,setState]=useState(false)
  return (
    <div>
      <nav className="bg-secondary d-flex justify-content-lg-betweeb navbar navbar-dark px-2">
        <div>
          <NavLink style={navLinkStyles} to={isAuthenticated?'/profile':'login'}>
            Logo
          </NavLink>
        </div>
        <div className="d-flex">
        
          <div className={`dropdown  ${NavStyle.brand}`}>
            <button
              className="btn btn-secondary dropdown-toggle py-0"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
             Profile
            </button>
            <div
              className="dropdown-menu w-auto"
              aria-labelledby="dropdownMenuButton"
            >
              <button className="dropdown-item" onClick={() => onLogout()}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
