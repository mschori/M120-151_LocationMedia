import React, {Component} from "react";
import {Route, Redirect} from 'react-router-dom';
import AuthentificationService from "./AuthentificationService";

class AuthenticatedRoute extends Component {
    render() {
        if (AuthentificationService.isUserLogedIn()) {
            return (
                <Route {...this.props}/>
            )
        } else {
            return (
                <Redirect to="/login"/>
            )
        }
    }
}

export default AuthenticatedRoute;