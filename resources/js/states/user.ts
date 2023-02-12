import {action, Action} from "easy-peasy";

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
    updateUserData: Action<UserStore, Partial<User>>
}

const user: UserStore = {
    data: undefined,
    setUserData: action((state, userPayload) => {
        state.data = userPayload;
    }),
    updateUserData: action((state, userPayload) => {
        state.data = {...state.data, ...userPayload}
    })

};
export default user;
