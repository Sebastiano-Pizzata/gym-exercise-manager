import "../style/header.css";
import Search from "./Search";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <div className="header-content">
                <Link className="home-link" to={'/'}><h2>Gym Exercise</h2></Link>
                <div>
                    <Search />
                </div>
            </div>
        </header>
    );
}

export default Header;
