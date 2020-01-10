import React, {Component} from 'react';
import axios from "axios";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: '',
            image: '',
            pwVerifyFailed: false,
            pwTooShort: false,
        }
    }

    render() {
        return (
            <div className="container mt-5">
                {this.state.pwVerifyFailed &&
                <div className="alert alert-danger" role="alert">
                    Passwords are not equal!
                </div>
                }
                {this.state.pwTooShort &&
                <div className="alert alert-danger" role="alert">
                    Passwords is too short!
                </div>
                }
                <label htmlFor="username" className="col-form-label">Username</label>
                <input type="text" className="form-control" id="username" name="username" onChange={this.handlerChange}
                       value={this.state.username}/>
                <label htmlFor="password1" className="col-form-label">Password</label>
                <input type="password" className="form-control" id="password1" name="password1"
                       onChange={this.handlerChange} value={this.state.password1}/>
                <label htmlFor="password2" className="col-form-label">Retype password</label>
                <input type="password" className="form-control" id="password2" name="password2"
                       onChange={this.handlerChange} value={this.state.password2}/>
                <label htmlFor="image" className="mt-2">User-Image</label>
                <input type="file" id="image" name="image" accept="image/png, image/jpeg"
                       className="form-control" onChange={this.handleImageChange} required/>
                <button className="btn btn-dark mt-3" onClick={this.register}>Register</button>
            </div>
        );
    }

    handlerChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    register = () => {
        if (this.state.password1.length < 8) {
            this.setState({pwTooShort: true});
            return;
        } else if (this.state.password1 !== this.state.password2) {
            this.setState({pwVerifyFailed: true});
            return;
        }

        //Register
        let form_data = new FormData();
        form_data.append('file', this.state.image, this.state.image.name);
        form_data.append('username', this.state.username);
        form_data.append('password', this.state.password1);

        axios.post('http://localhost:8080/users', form_data, {headers: {'content-type': 'multipart/form-data'}})
            .then(res => {
                this.setState({
                    showAlert: true,
                    alertType: 'alert alert-success',
                    alertText: 'User successfully created! Reloading...',
                });
                this.goToLogin();
            })
            .catch(res => {
                // Fehlermessage ???
            });

    };

    goToLogin = () => {
        window.history.replaceState('/login', 'Login', '/login');
        document.location.reload();
    }
}

export default Register;