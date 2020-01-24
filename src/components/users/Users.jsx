import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const imageStyle = {
    'border-radius': '50%',
    'max-width': '100px',
    'max-height': '100px',
};

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return (
            <div className="container d-flex flex-wrap mt-5">
                {
                    this.state.users.map(
                        users =>
                            <UserCard userId={users.id} username={users.username} userImage={users.imagename}/>
                    )
                }
            </div>
        );
    }

    getUsers = () => {
        axios.get('http://localhost:8080/users')
            .then(res => {
                this.setState({users: res.data})
            })
            .catch(error => {
                // Error-Message???
            })
    };
}

class UserCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            username: this.props.username,
            countLocations: '',
            userImage: this.props.userImage,
        }
    }

    render() {
        return (
            <div className="col-4 m-2">
                <div className="card border-primary">
                    <div className="card-body text-center">
                        <p>
                            <img src={"http://localhost:8080/images/" + this.state.userImage} style={imageStyle}
                                 alt=""/>
                        </p>
                        <h4 className="card-title">{this.state.username}</h4>
                        <p>{this.state.countLocations} Locations</p>
                        <button className="btn btn-primary" onClick={this.goToLocations}>Show</button>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.countLocations();
    }

    countLocations = () => {
        let uid = this.state.userId;
        axios.get('http://localhost:8080/users/' + uid + '/locations')
            .then(res => {
                let counter = res.data.length;
                this.setState({countLocations: counter})
            })
            .catch(error => {
                // Error-Message???
            })
    };

    goToLocations = () => {
        window.history.replaceState(`/locations/${this.state.userId}`, 'Locations', `/locations/${this.state.userId}`);
        document.location.reload();
    }
}

export default Users;