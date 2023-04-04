import { createContextStore } from "easy-peasy";
import { type Server } from "../../helpers/api/local/getServersPaginator";
import { Action } from "easy-peasy";

interface ServerData {
    server?: Server;

    setServer: Action<ServerData, Server>;
}

export const ServerStore = createContextStore<ServerData>({});
