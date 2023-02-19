import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faRightFromBracket} from "@fortawesome/free-solid-svg-icons"

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-sm bg-dark">
            <div className="container-fluid">
                <div className="navbar-brand ">
                    <img className="d-inline-block align-text-bottom" src="/img/cool_cat.png" alt="Logo" width={35}
                         height={35}/>
                    <span className="text-white ms-2">RemoteConsole</span>
                </div>
                <img src="/img/avatars/male_avatar_1.png" className="navbar-toggler" data-bs-toggle="collapse"
                     data-bs-target="#nav" alt="avatar"/>
                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav me-3 ms-auto">
                        <li className="nav-item">
                            <a className="nav-header-icon" data-toggle="tooltip" title="Add server"
                               href="/servers/add"><FontAwesomeIcon icon={faPlus} size="2x"/></a>
                            <a className="text-decoration-none text-white nav-link d-block d-sm-none"
                               href="/servers/add">Add server</a>
                        </li>
                        <li className="nav-item ms-3 me-3 d-none d-sm-block">
                            <img src="/img/avatars/male_avatar_1.png" alt="avatar"/>
                        </li>
                        <li className="nav-item">
                            <a className="nav-header-icon" data-toggle="tooltip" title="Logout"
                               href="/logout"><FontAwesomeIcon icon={faRightFromBracket} size="2x"/></a>
                            <a className="text-decoration-none text-white nav-link d-block d-sm-none"
                               href="/logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
