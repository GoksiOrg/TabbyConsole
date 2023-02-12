import {lazy, React, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Loading from "./Loading";
import MainContainer from "./main/MainContainer";
import {store} from "../states/export";
import {StoreProvider} from "easy-peasy";

const AuthRouter = lazy(() => import("../routers/AuthRouter"))

interface InfoWindow extends Window {
    User?: {
        id: number;
        username: string;
        admin: boolean;
        created_at: string;
        updated_at: string;
    }
}

export default function App() {
    const {User} = window as InfoWindow;
    if (User && !store.getState().user.data) {
        store.getActions().user.setUserData({
            id: User.id,
            username: User.username,
            admin: User.admin,
            createdAt: new Date(User.created_at),
            updatedAt: new Date(User.updated_at),
        });
    }
    return (
        <StoreProvider store={store}>
            <div className="mx-auto w-auto">
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Suspense fallback={<Loading/>}>
                                    <MainContainer/>
                                </Suspense>
                            }/>
                        <Route
                            path="/login/*"
                            element={
                                <Suspense fallback={<Loading/>}>
                                    <AuthRouter/>
                                </Suspense>
                            }/>
                    </Routes>
                </BrowserRouter>
            </div>
        </StoreProvider>
        /*routes*/
    );
}

