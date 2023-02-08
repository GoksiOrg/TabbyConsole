import React from 'react';

interface InfoWindow extends Window {
    User?: {
        name: string,
        admin: boolean;
    }
}
export default function App() {
    const { User } = window as InfoWindow;
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
/*routes*/
    );
}

