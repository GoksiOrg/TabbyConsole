import {lazy, React, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Loading from "./Loading";

const AuthRouter = lazy(() => import("../routers/AuthRouter"))

interface InfoWindow extends Window {
    User?: {
        name: string,
        admin: boolean;
    }
}

export default function App() {
    const {User} = window as InfoWindow;
    return (
        <div className="mx-auto w-auto">
            <BrowserRouter>
                <Routes>
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

