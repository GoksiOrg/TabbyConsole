import {Route, Routes} from 'react-router-dom';
import LoginContainer from "../components/auth/LoginContainer";
/*TODO: probably change login and logout to /auth/**/
export default function AuthRouter() {
    return (
        <div className="pt-8 xl:pt-32">
            <Routes>
                <Route path="/" element={<LoginContainer/>}/>
            </Routes>
        </div>
    );
}

