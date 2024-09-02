import { Link, useNavigate } from "react-router-dom";
import "./CSS/navbar.css";
import LinkStyles from "./LinkStyles";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const token = Cookies.get("authToken");
const decoded = token ? jwtDecode(token) : "token doesnt exists";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    Cookies.remove("authToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <header>
      <nav>
        <Link to="/" style={LinkStyles}>
          <p>მთავარი</p>
        </Link>
        <Link style={LinkStyles} to={token ? "/HouseUpload" : "/SignIn"}>
          <p>ატვირთვა</p>
        </Link>
        {!token && (
          <Link to="/SignIn" style={LinkStyles}>
            <p>შესვლა</p>
          </Link>
        )}
        {token && <p>გამარჯობა, {decoded.userName}</p>}
        {token && <p onClick={handleLogOut}>გასვლა</p>}
      </nav>
    </header>
  );
};

export default Navbar;
