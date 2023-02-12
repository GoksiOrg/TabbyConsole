import React, {useRef, useState} from 'react';
import http from "../../helpers/httpService";
import validateInput from "../../helpers/validationHelper";
import Alert from "./Alert";

interface BackendResponse {
    success: boolean;
    redirect: string;
    error: string;
}

const passwordRegex = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+$')

export default function LoginContainer() {
    const errorAlertInitial = {
        shouldDisplay: false,
        message: ""
    }
    const [checked, setChecked] = useState<boolean>(false);
    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const [errorAlert, setErrorAlert] = useState(errorAlertInitial);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const handleCheckBoxChange = () => {
        setChecked(!checked);
    }
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => e.target.classList.remove('is-invalid');
    const login = (event: SubmitEvent) => {
        setErrorAlert({shouldDisplay: false, message: ""});
        event.preventDefault();
        let inputCheck = validateInput(usernameRef.current,
            (str) => str.length >= 4 && str.length < 15);
        let passwordCheck = validateInput(passwordRef.current,
            (str) => str.length >= 7 && str.length < 20 && passwordRegex.test(str));
        if (!passwordCheck || !inputCheck) return;
        setSubmitting(true);
        http.post('/login', {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            remember_me: checked
        }).then(result => {
            let response: BackendResponse = result.data;
            if (response.success) {
                // @ts-ignore
                window.location = response.redirect;
            } else {
                if (!response.error) setErrorAlert({shouldDisplay: true, message: "Invalid username or password !"}) // probably refactor if we happen to have more errors
                else if (response.error === "too_many_attempts") setErrorAlert({
                    shouldDisplay: true,
                    message: "Too many login attempts, try again later !"
                })
                usernameRef.current.value = "";
                passwordRef.current.value = "";
            }
        }).catch(error => {
            if (error.code == "ECONNABORTED") {
                setErrorAlert({shouldDisplay: true, message: "Error while communicating with backend !"})
            }
        }).finally(() => setSubmitting(false));
    }

    return (
        <form onSubmit={login} noValidate>
            <div className='d-flex justify-content-center align-items-center vh-100 flex-column'>
                <div className="form-floating mb-4">
                    <input className="form-control bg-dark text-light" type="username" ref={usernameRef}
                           disabled={isSubmitting}
                           maxLength={15} onChange={handleOnChange}/>
                    <label className="form-label text-light">Username</label>
                    <div className="invalid-feedback">
                        Username must have at least 4 characters !
                    </div>
                </div>

                <div className="form-floating">
                    <input className="form-control bg-dark text-light" type="password" ref={passwordRef}
                           disabled={isSubmitting}
                           maxLength={20} onChange={handleOnChange}/>
                    <label className="form-label text-light">Password</label>
                    <div className="invalid-feedback">
                        Password does not meet the criteria !
                    </div>
                </div>

                <div className="form-check mt-1">
                    <input className="form-check-input mt-3 bg-dark border-secondary" type="checkbox" value=""
                           id="rememberMe"
                           onChange={handleCheckBoxChange} checked={checked}/>
                    <label className="form-check-label mt-3 text-white" htmlFor="rememberMe"> Remember me </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4 mt-1" disabled={isSubmitting}>Sign in
                </button>
                <Alert shouldRender={errorAlert.shouldDisplay} message={errorAlert.message}/>
            </div>
        </form>
    );
}
