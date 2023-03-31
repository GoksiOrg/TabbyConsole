import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./Loading";
import MainContainer from "./main/MainContainer";
import "bootstrap";
import { store } from "../states/export";
import { StoreProvider } from "easy-peasy";
import LoginContainer from "./auth/LoginContainer";
import ServerRouter from "../routers/ServerRouter";
import AddServer from "./server/AddServer";
import Error from "./ErrorStatus";

interface InfoWindow extends Window {
    User?: {
        id: number;
        username: string;
        admin: boolean;
        created_at: string;
        updated_at: string;
    };
}

export default function App() {
    const { User } = window as InfoWindow;
    if (User != null && store.getState().user.data == null) {
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
                                <Suspense fallback={<Loading />}>
                                    <MainContainer />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/login/"
                            element={
                                <Suspense fallback={<Loading />}>
                                    <LoginContainer />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/server/*"
                            element={
                                <Routes>
                                    <Route path="/add" element={<AddServer />} />
                                    <Route path=":id/*" element={<ServerRouter />} />
                                </Routes>
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <Error
                                    error={{
                                        statusCode: 404,
                                        message: "Tabby couldn't find your resource :(",
                                    }}
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </StoreProvider>
        /* routes */
    );
}
