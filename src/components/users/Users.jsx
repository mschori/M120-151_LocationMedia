import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    userId: 1,
                    username: 'Michael',
                    userImage: 'https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png',
                    countLocations: 2
                }
            ]
        }
    }

    render() {
        return (
            <div className="container d-flex flex-wrap mt-5">
                {
                    this.state.users.map(
                        users =>
                            <UserCard userId={users.userId} username={users.username} userImage={users.userImage}
                                      countLocations={users.countLocations}/>
                    )
                }
            </div>
        );
    }
}

class UserCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            username: this.props.username,
            countLocations: this.props.countLocations,
            userImage: this.props.userImage,
        }
    }

    render() {
        return (
            <div className="col-4 m-2">
                <div className="card border-primary">
                    <div className="card-body text-center">
                        <p>
                            <img src={this.state.userImage} alt=""/>
                        </p>
                        <h4 className="card-title">{this.state.username}</h4>
                        <p>{this.state.countLocations} Locations</p>
                        <button className="btn btn-primary" onClick={this.goToLocations}>Show</button>
                    </div>
                </div>
            </div>
        );
    }

    goToLocations = () => {
        window.history.replaceState('/locations', 'Locations', '/locations/' + this.state.userId);
        document.location.reload();
    }
}

export default Users;