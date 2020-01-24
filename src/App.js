import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Navigationbar from './components/navbar/Naviagtionbar';
import Users from './components/users/Users';
import Locations from "./components/locations/Locations";
import ErrorComponent from "./components/ErrorComponent";
import Welcome from "./components/Welcome";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import AuthenticatedRoute from "./components/authentication/AuthenticatedRoute";

class App extends Component {
    render() {
        return (
            <div>
                <div className="App">
                    <Header/>
                    <Navigationbar/>
                    <Router>
                        <Switch>
                            <Route path='/' exact component={Welcome}/>
                            <Route path='/register' exact component={Register}/>
                            <Route path='/login' component={Login}/>
                            <AuthenticatedRoute path='/users' component={Users}/>
                            <AuthenticatedRoute path='/locations/:uid' component={Locations}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

function Header() {
    return (
        <header>
            <title>Locaton-APP</title>
        </header>
    );
}

export default App;
