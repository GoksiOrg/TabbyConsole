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
        <h1>Ide gas</h1>
/*routes*/
    );
}

