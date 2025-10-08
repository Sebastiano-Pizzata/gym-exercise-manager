import "../style/header.css";
import Search from "./Search";

function Header() {
    return (
        <header>
            <div className="header-content">
                <h2>Gym Exercise</h2>
                <div>
                    <Search />
                </div>
            </div>
        </header>
    );
}

export default Header;
