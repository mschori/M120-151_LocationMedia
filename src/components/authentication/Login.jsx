import React, {Component} from 'react';

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
        if (this.state.username === 'Michael' && this.state.password === 'sml12345') {
            window.history.replaceState('/locations', 'Locations', '/locations/' + 3);
            document.location.reload();
        } else {
            this.setState({hasLoginFailed: true})
        }
    }
}

export default Login;