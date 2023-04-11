import { ServerStore } from "../../states/server";

export default function SubNavBar() {
    const permissions = ServerStore.useStoreState(state => state.server.permissions);
    return (
        <nav
            className="navbar mb-3"
            style={{ backgroundColor: "#1a202c" }}
            aria-label="SubNavigation"
        >
            sadasda adasd asda
        </nav>
    );
}
