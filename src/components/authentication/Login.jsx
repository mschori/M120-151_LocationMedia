import React, {Component} from 'react';
import './AuthentificationService.js';
import AuthentificationService from "./AuthentificationService";
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
        }
    }

    render() {
        return (
            <div className="container mt-5">
                {this.state.hasLoginFailed &&
                <div className="alert alert-danger" role="alert">
                    Login failed!
                </div>
                }
                <label htmlFor="username" className="col-form-label">Username</label>
                <input type="text" className="form-control" id="username" name="username" onChange={this.handlerChange}
                       value={this.state.username}/>
                <label htmlFor="password" className="col-form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password"
                       onChange={this.handlerChange} value={this.state.password}/>
                <button className="btn btn-dark mt-3" onClick={this.login}>Login</button>
            </div>
        );
    }

    handlerChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    login = () => {

        let data = {username: this.state.username, password: this.state.password};

        axios.post('http://localhost:8080/users/login', data)
            .then(res => {
                if (res.data.loginSuccessfull) {
                    let userId = res.data.id;
                    AuthentificationService.registerSuccessfullLogin(this.state.username, userId);
                    window.history.replaceState('/locations', 'Locations', '/locations/' + userId);
                    document.location.reload();
                } else {
                    this.setState({hasLoginFailed: true})
                }
            })
            .catch(res => {
                this.setState({hasLoginFailed: true})
            });
    }
}

export default Login;