import React from 'react';
import ReactDOM from 'react-dom/client';

function LoginContainer() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>
                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginContainer;

if (document.getElementById('login-container')) {
    const Index = ReactDOM.createRoot(document.getElementById("login-container"));
    Index.render(
        <React.StrictMode>
            <LoginContainer/>
        </React.StrictMode>
    )
}
