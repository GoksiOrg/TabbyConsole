import { ServerStore } from "../../../../states/server";
import { useLocation } from "react-router-dom";

export function SubNavItem(props: { name: string; path: string }) {
    const location = useLocation();

    console.log(location.pathname);
    const id = ServerStore.useStoreState(state => state.server.id);
    const setActiveClass = () => {
        return location.pathname === `/server/${id}${props.path}` ? "sub-active" : "";
    };
    return (
        <li className="nav-item">
            <a className={`nav-link ${setActiveClass()}`} href={`${id}${props.path}`}>
                {props.name}
            </a>
        </li>
    );
}
