import { action, type Action } from "easy-peasy";

export interface User {
    id: number;
    username: string;
    admin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserStore {
    data?: User;
    setUserData: Action<UserStore, User>;
}

const user: UserStore = {
    data: undefined,
    setUserData: action((state, userPayload) => {
        state.data = userPayload;
    }),
};
export default user;
