import { SubNavItem } from "./SubNavItem";
import { ServerStore } from "../../../../states/server";
import { useStoreState } from "../../../../states/hook";
import checkPermission from "../../../../helpers/checkPermission";
import { Permission } from "../../../../Permission";

export default function SubNavBar() {
    const { permissions, owner_id } = ServerStore.useStoreState(state => state.server);
    const { id, admin } = useStoreState(state => state.user.data);

    const hasAdminAccess = () => {
        return owner_id === id || admin;
    };
    return (
        <nav
            className="nav nav-fill mb-3 justify-content-center"
            style={{ backgroundColor: "#1a202c" }}
            aria-label="SubNavigation"
        >
            <SubNavItem name="Dashboard" path="" />
            {(hasAdminAccess() || checkPermission(permissions, Permission.VIEW_FILES)) && (
                <SubNavItem name="File manager" path="/files" />
            )}
            {hasAdminAccess() && <SubNavItem name="Subusers" path="/subusers" />}
        </nav>
    );
}
