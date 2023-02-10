import {lazy, React, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Loading from "./Loading";
import MainContainer from "./main/MainContainer";
import {InfoWindow} from "../helpers/InfoWindow";

const AuthRouter = lazy(() => import("../routers/AuthRouter"))

export default function App() {
    const {User} = window as InfoWindow;
    return (
        <div className="mx-auto w-auto">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                        <Suspense fallback={<Loading/>}>
                            <MainContainer />
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
        /*routes*/
    );
}

