import { type Permission } from "../Permission";
import { useStoreState } from "../states/hook";

export default function checkPermission(permissions: number, permission: Permission): boolean {
    if (permissions === -1) return true;
    const admin = useStoreState(state => state.user.data.admin);
    return admin || (permissions & permission) === 1;
}
