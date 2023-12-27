import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { store } from './store';
import './index.css';
import { Provider } from 'react-redux';
import {setupStore} from './store/'
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <React.StrictMode>
            <BrowserRouter>
        <App></App>
            </BrowserRouter>
    </React.StrictMode>
    </Provider>
);
