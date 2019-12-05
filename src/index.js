import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './public/redux/store';

const WrappedApp = () => {
    return (
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    )
}

ReactDOM.render(<WrappedApp/>, document.getElementById('root'));
// serviceWorker.unregister();
serviceWorker.register();
