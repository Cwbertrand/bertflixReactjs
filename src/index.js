import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ToggleColorModeProvider from './utils/ToggleColorMode';
import App from './components/App';
import store from './app/store';
import './style.css';

// To use theme in the other components, we have to wrap our application with it using themeProvider and Createtheme

ReactDOM.render(
    <Provider store={store}>
        <ToggleColorModeProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ToggleColorModeProvider>
    </Provider>,
    document.getElementById('root'),
);
