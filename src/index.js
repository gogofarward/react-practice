import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import FullPage from "./components/FullPage";
import ErrorPage from "./components/ErrorPage";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={FullPage}/>
            <Route path="/home" component={App}/>
            <Route component={ErrorPage}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
