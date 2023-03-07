import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faKey,
    faPlus,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useStoreState } from "../../states/hook";

export default function NavBar() {
    const name = useStoreState(state => state.user.data.username);
    return (
        <nav
            className="navbar navbar-expand-sm mb-3"
            style={{ backgroundColor: "#1a202c" }}
            aria-label="Main navigation"
        >
            <div className="container-fluid">
                <div className="navbar-brand ">
                    <a href="/" className="text-decoration-none">
                        <img
                            className="d-inline-block align-text-bottom"
                            src="/img/cool_cat.png"
                            alt="Logo"
                            width={35}
                            height={35}
                        />
                        <span className="text-white ms-2">TabbyConsole</span>
                    </a>
                </div>
                <img
                    src="/img/avatars/male_avatar_1.png"
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#nav"
                    alt="avatar"
                />
                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav me-3 ms-auto">
                        <li className="nav-item d-block d-sm-none">
                            <p className="d-flex justify-content-center align-items-center text-white mb-2">
                                Hello {name} !
                            </p>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-header-icon me-3"
                                data-toggle="tooltip"
                                title="Add server"
                                href="/server/add"
                            >
                                <FontAwesomeIcon icon={faPlus} size="2x" />
                            </a>
                            <a
                                className="text-decoration-none text-white nav-link d-block d-sm-none"
                                href="/server/add"
                            >
                                Add server
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-header-icon me-3"
                                data-toggle="tooltip"
                                title="Create api key"
                                href="/user/token"
                            >
                                <FontAwesomeIcon icon={faKey} size="2x" />
                            </a>
                            <a
                                className="text-decoration-none text-white nav-link d-block d-sm-none"
                                href="/user/token"
                            >
                                Create api key
                            </a>
                        </li>
                        <li className="nav-item me-3 d-none d-sm-block">
                            <img
                                src="/img/avatars/male_avatar_1.png"
                                alt="avatar"
                                data-toggle="tooltip"
                                title={name}
                            />
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-header-icon"
                                data-toggle="tooltip"
                                title="Logout"
                                href="/logout"
                            >
                                <FontAwesomeIcon
                                    icon={faRightFromBracket}
                                    size="2x"
                                />
                            </a>
                            <a
                                className="text-decoration-none text-white nav-link d-block d-sm-none"
                                href="/logout"
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
