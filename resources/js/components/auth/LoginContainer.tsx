import React, {useState} from 'react';

export default function LoginContainer() {
    const [checked, setChecked] = useState(false);
    const handleCheckBoxChange = () => {
        setChecked(!checked);
    }
    return (
        <form >
            <div className='d-flex justify-content-center align-items-center vh-100 flex-column '>
                <div className="form-floating mb-4">
                    <input className="form-control" type="username" id="usernameInput" maxLength={15} minLength={4}/>
                    <label htmlFor="emailInput">Username</label>
                </div>

                <div className="form-floating ">
                    <input className="form-control" type="password" id="passwordInput" maxLength={20} minLength={7}/>
                    <label className="form-label" htmlFor="passwordInput">Password</label>
                </div>

                <div className="form-check mt-1">
                    <input className="form-check-input mt-3" type="checkbox" value="" id="rememberMe" onChange={handleCheckBoxChange} checked={checked}/>
                    <label className="form-check-label mt-3" htmlFor="rememberMe"> Remember me </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4 mt-1">Sign in</button>
            </div>
        </form>
    );
}
