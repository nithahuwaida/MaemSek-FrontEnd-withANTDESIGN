import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';

//navigation
import Login from '../auth/Login.js';
import Register from '../auth/Register.js';
import Authentication from '../auth/Authentication.js';
import Home from '../home/Home.js';

function App() {
  return (
    <div className="App" >
        <BrowserRouter>
          <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
            <Authentication>
              <Route exact path="/" component={Home}/>
              <Route exact path="/product" component={Home}/>
            </Authentication>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;