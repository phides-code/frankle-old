import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BoardProvider } from './context/BoardContext';
import { GameProvider } from './context/GameContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENTID}
        redirectUri={window.location.origin}
    >
        <GameProvider>
            <BoardProvider>
                <App />
            </BoardProvider>
        </GameProvider>
    </Auth0Provider>
);
