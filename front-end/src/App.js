import React, {Fragment} from 'react';
import SignUpComponent from "./components/signup"
import LoginComponent from "./components/login";
import BlogAdminPanel from "./components/blog_management/home";
import {Route, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Home from "./components/blog/home";

function App() {
    return (
        <Switch>
            {/*<Route path={'/'} component={Home}/>*/}
            <Route path={'/login'} component={LoginComponent}/>
            <Route path={'/register'} component={SignUpComponent}/>
            <Route path={'/blog'} component={BlogAdminPanel}/>
        </Switch>
    );
}

export default App;
