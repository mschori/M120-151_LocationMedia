import React, {Component} from 'react';
import AuthentificationService from "../authentication/AuthentificationService";
import axios from 'axios';

const imageStyle = {
    // 'max-width': '200px',
};

class Locations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form_type: 'new',
            form_location_id: 0,
            form_title: '',
            form_address: '',
            form_description: '',
            form_image: '',
            showAlert: false,
            alertType: 'alert alert-success',
            alertText: '',
            locations: [],
        }
    }

    componentDidMount() {
        this.getLocations();
    }

    render() {
        return (
            <div className="container mt-5">

                {this.state.showAlert &&
                <div className={this.state.alertType} role="alert">
                    {this.state.alertText}
                </div>
                }

                <button type="button" className="btn btn-success mt-3 mb-3" onClick={this.createLocation}>Create new
                    location
                </button>

                <button type="button" style={{display: "none"}} data-toggle="modal"
                        data-target="#newEditModal" id="modal_button">
                </button>

                <div className="modal fade" id="newEditModal" tabIndex="-1" role="dialog"
                     aria-labelledby="newEditModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="newEditModalLabel">Create new location</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input type="hidden" name="location_id" value={this.state.form_location_id}/>
                                <label htmlFor="name"><b>Title</b></label>
                                <input type="text" name="form_title" className="form-control" id="title"
                                       value={this.state.form_title} onChange={this.formOnChangeHandler}/>
                                <label htmlFor="address" className="mt-2"><b>Address</b></label>
                                <input type="text" name="form_address" className="form-control" id="address"
                                       value={this.state.form_address} onChange={this.formOnChangeHandler}/>
                                <label htmlFor="description" className="mt-2"><b>Description</b></label>
                                <input type="text" name="form_description" className="form-control" id="description"
                                       value={this.state.form_description} onChange={this.formOnChangeHandler}/>
                                <label htmlFor="image" className="mt-2"><b>Image</b></label>
                                <input type="file" id="image" name="form_image" accept="image/png, image/jpeg"
                                       className="form-control" onChange={this.handleImageChange} required/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        id="modalCloseButton">Close
                                </button>
                                <button type="button" className="btn btn-primary"
                                        onClick={this.sendCreateEdit}>Crate/Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    this.state.locations.map(
                        locations =>
                            <LocationCard key={locations.id} locationId={locations.id} cardTitle={locations.name}
                                          cardText={locations.description}
                                          cardImage={locations.imagename} userId={locations.fk_user}
                                          locationAddress={locations.address}
                                          editLocation={this.editLocation} deleteLocation={this.deleteLocation}/>
                    )
                }
            </div>
        );
    }

    formOnChangeHandler = (event) => {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    };

    handleImageChange = (e) => {
        this.setState({
            form_image: e.target.files[0]
        })
    };

    getLocations = () => {
        let uid = this.props.match.params.uid;
        axios.get('http://localhost:8080/users/' + uid + '/locations')
            .then(res => {
                this.setState({locations: res.data})
            })
            .catch(error => {
                // Error-Message???
            })
    };

    createLocation = () => {
        this.setState({
            form_type: 'new',
            form_location_id: '',
            form_title: '',
            form_address: '',
            form_description: '',
            form_image: '',
        });
        document.getElementById('modal_button').click();
    };

    editLocation = (location_id, cardTitle, locationAddress, cardText) => {
        this.setState({
            form_type: 'update',
            form_location_id: location_id,
            form_title: cardTitle,
            form_address: locationAddress,
            form_description: cardText,
            form_image: '',
        });
        document.getElementById('modal_button').click();
    };

    deleteLocation = (locationId, cardTitle) => {
        let decision = window.confirm("Do you really want to delete '" + cardTitle + "'?");
        if (!decision) {
            return;
        }

        axios.delete('http://localhost:8080/users/' + AuthentificationService.getUserId() + '/locations/' + locationId)
            .then(res => {
                this.setState({
                    showAlert: true,
                    alertType: 'alert alert-success',
                    alertText: 'Location successfully deleted!',
                });
                this.getLocations();
            })
            .catch(res => {
                // Error-Message ???
            });
    };

    sendCreateEdit = () => {
        let form_data = new FormData();
        if (this.state.form_image !== '') {
            form_data.append('file', this.state.form_image, this.state.form_image.name);
        } else {
            form_data.append('file', 'empty');
        }
        form_data.append('name', this.state.form_title);
        form_data.append('address', this.state.form_address);
        form_data.append('description', this.state.form_description);
        form_data.append('fk_user', AuthentificationService.getUserId());

        if (this.state.form_type === 'new') {
            axios.post('http://localhost:8080/users/' + AuthentificationService.getUserId() + '/locations', form_data, {headers: {'content-type': 'multipart/form-data'}})
                .then(res => {
                    this.setState({
                        showAlert: true,
                        alertType: 'alert alert-success',
                        alertText: 'Location successfully created!',
                    });
                    document.getElementById('modalCloseButton').click();
                    this.getLocations();
                })
                .catch(res => {
                    document.getElementById('modalCloseButton').click();
                    // Fehlermessage ???
                });
        } else if (this.state.form_type === 'update') {
            axios.put('http://localhost:8080/users/' + AuthentificationService.getUserId() + '/locations/' + this.state.form_location_id, form_data)
                .then(res => {
                    this.setState({
                        showAlert: true,
                        alertType: 'alert alert-success',
                        alertText: 'Location successfully updated!',
                    });
                    document.getElementById('modalCloseButton').click();
                    this.getLocations();
                })
                .catch(res => {
                    document.getElementById('modalCloseButton').click();
                    // Error-Message ????
                });
        }
    }
}

class LocationCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locationId: this.props.locationId,
            cardText: this.props.cardText,
            cardTitle: this.props.cardTitle,
            locationAddress: this.props.locationAddress,
            cardImage: this.props.cardImage,
        };
    }

    render() {
        return (
            <div className="card mb-3">
                <img
                    src={"http://localhost:8080/images/" + this.state.cardImage}
                    className="card-img-top" alt="..." style={imageStyle}/>
                <div className="card-body">
                    <h5 className="card-title">{this.state.cardTitle}</h5>
                    <p className="card-text">{this.state.locationAddress}</p>
                    <p className="card-text">{this.state.cardText}</p>
                    {AuthentificationService.authenticatedLocation(this.props.userId) &&
                    <div className="text-right">
                        <button className="btn btn-dark mr-2" onClick={this.handleEditClick}>Edit</button>
                        <button className="btn btn-danger" onClick={this.handleDeleteClick}>Delete</button>
                    </div>
                    }
                </div>
            </div>
        );
    }

    handleEditClick = () => {
        this.props.editLocation(this.state.locationId, this.state.cardTitle, this.state.locationAddress, this.state.cardText);
    };

    handleDeleteClick = () => {
        this.props.deleteLocation(this.state.locationId, this.state.cardTitle);
    };
}

export default Locations;