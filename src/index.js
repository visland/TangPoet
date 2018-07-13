import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './component/Relation.css';
import Home from './pages/Home.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();