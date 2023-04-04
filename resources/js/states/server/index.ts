import { createContextStore } from "easy-peasy";
import { type Server } from "../../helpers/api/local/getServersPaginator";
import { type Action, action, type Thunk, thunk } from "easy-peasy";
import getServer from "../../helpers/api/local/getServer";
/* TODO: permissions */
interface ServerData {
    server?: Server;

    setServer: Action<ServerData, Server>;

    clearState: Action<ServerData>;

    getServer: Thunk<ServerData, number, any, ServerData, Promise<void>>;
}

const store: ServerData = {
    server: undefined,
    setServer: action((state, payload) => {
        state.server = payload;
    }),
    clearState: action(state => (state.server = undefined)),
    getServer: thunk(async (actions, payload) => {
        const server = await getServer(payload);
        actions.setServer(server);
    }),
};
export const ServerStore = createContextStore<ServerData>(store);
