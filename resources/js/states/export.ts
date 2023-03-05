import user, { type UserStore } from "./user";
import { createStore } from "easy-peasy";

export interface GlobalStore {
    user: UserStore;
}

const state: GlobalStore = {
    user,
};

export const store = createStore<GlobalStore>(state);
