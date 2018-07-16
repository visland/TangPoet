import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppContainer } from 'react-hot-loader';
import Home from './pages/Home.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <AppContainer>
        <Home />
    </AppContainer>,
    document.getElementById('root')
);

if(module.hot){
    module.hot.accept('./pages/Home',()=>{
        const NewHome = require('./pages/Home').default;
        ReactDOM.render(
            <AppContainer>
                <NewHome />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
