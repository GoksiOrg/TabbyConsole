import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

interface NavItemInfo {
    icon: IconDefinition;
    text: string;
    path: string;
}
export default function NavItem(props: NavItemInfo) {
    const location = useLocation();
    const setActiveClass = () => {
        return location.pathname === props.path ? "nav-active" : "";
    };
    return (
        <li className="nav-item">
            <a
                className={`nav-header-icon me-3 ${setActiveClass()}`}
                data-toggle="tooltip"
                title={props.text}
                href={props.path}
            >
                <FontAwesomeIcon icon={props.icon} size="2x" />
            </a>
            <div className="w-50">
                <a
                    className={`text-white nav-link d-block d-sm-none ${setActiveClass()}`}
                    style={{ textDecoration: "none" }}
                    href={props.path}
                >
                    {props.text}
                </a>
            </div>
        </li>
    );
}
