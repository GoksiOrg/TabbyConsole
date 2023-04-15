import { faKey, faPlus, faRightFromBracket, faLock } from "@fortawesome/free-solid-svg-icons";
import { useStoreState } from "../../states/hook";
import TabbyAvatar from "./TabbyAvatar";
import { useEffect, useState } from "react";
import NavItem from "./NavItem";

export default function NavBar() {
    const name = useStoreState(state => state.user.data.username);
    const isAdmin = useStoreState(state => state.user.data.admin);
    const [isXs, setXs] = useState<boolean>(window.innerWidth < 576);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => {
                const xs = window.innerWidth < 576;
                if (xs !== isXs) setXs(xs);
            },
            false
        );
    }, [isXs]);

    return (
        <nav
            className="navbar navbar-expand-sm"
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
                {isXs && <TabbyAvatar name={name} toggler={true} />}
                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav me-3 ms-auto">
                        <li className="nav-item d-block d-sm-none">
                            <p className="d-flex justify-content-center align-items-center text-white mb-2">
                                Hello {name} !
                            </p>
                        </li>
                        <NavItem icon={faPlus} text="Add server" path="/server/add" />
                        <NavItem icon={faKey} text="Create api key" path="/user/token" />
                        {isAdmin && <NavItem icon={faLock} text="Admin area" path="/admin" />}
                        <li className="nav-item me-3 mt-1 d-none d-sm-block">
                            {!isXs && <TabbyAvatar name={name} toggler={false} />}
                        </li>
                        <NavItem icon={faRightFromBracket} text="Logout" path="/logout" />
                    </ul>
                </div>
            </div>
        </nav>
    );
}
