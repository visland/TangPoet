import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppContainer } from 'react-hot-loader';
import Home from './pages/Home.js';
import Mobile from './pages/Mobile.js'
import registerServiceWorker from './registerServiceWorker';

let isMobile = ()=>{
    return window.screen.availHeight > window.screen.availWidth && window.screen.availWidth < 1024
}

ReactDOM.render(
    <AppContainer>
        {
            isMobile()?
            <Mobile />:
            <Home />
        }
    </AppContainer>,
    document.getElementById('root')
);
registerServiceWorker()

if(module.hot){
    let path = isMobile() ? 'Mobile' : 'Home'
    module.hot.accept('./pages/'+ path,()=>{
        const NewHome = require('./pages/'+ path).default;
        ReactDOM.render(
            <AppContainer>
                <NewHome />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
