import { createContextStore } from "easy-peasy";
import { type Action, action, type Thunk, thunk } from "easy-peasy";
import getServer from "../../helpers/api/local/getServer";
import { type ActiveServer } from "../../helpers/api/local/getServer";
/* TODO: permissions */
interface ServerData {
    server?: ActiveServer;

    setServer: Action<ServerData, ActiveServer>;

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
