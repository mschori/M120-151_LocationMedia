import React, {Component} from 'react';
import AuthentificationService from "../authentication/AuthentificationService";
import axios from 'axios';

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
            locations: [
                {
                    locationId: 1,
                    cardTitle: 'Ä charte-titu',
                    locationAddress: 'züri',
                    cardText: 'Dr text derzue',
                    cardImage: 'https://unicheck.unicum.de/sites/default/files/styles/artikel_hauptbild/public/artikel/image/studieren-in-der-schweiz-alpenlandschaft-bergsee-thinkstockphotos-521200806-bluejayphoto.jpg?itok=FmFfUYCN',
                    userId: 3,
                },
                {
                    locationId: 2,
                    cardTitle: 'Ä charte-titu',
                    locationAddress: 'lyss',
                    cardText: 'Dr text derzue',
                    cardImage: 'https://unicheck.unicum.de/sites/default/files/styles/artikel_hauptbild/public/artikel/image/studieren-in-der-schweiz-alpenlandschaft-bergsee-thinkstockphotos-521200806-bluejayphoto.jpg?itok=FmFfUYCN',
                    userId: 3,
                },
            ]
        }
    }

    render() {
        return (
            <div className="container mt-5">

                {this.getLocations()}

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
                                <input type="text" name="name" className="form-control" id="title"
                                       value={this.state.form_title}/>
                                <label htmlFor="address" className="mt-2"><b>Address</b></label>
                                <input type="text" name="address" className="form-control" id="address"
                                       value={this.state.form_address}/>
                                <label htmlFor="description" className="mt-2"><b>Description</b></label>
                                <input type="text" name="description" className="form-control" id="description"
                                       value={this.state.form_description}/>
                                <label htmlFor="image" className="mt-2"><b>Image</b></label>
                                <input type="text" name="image" className="form-control" id="image"
                                       value={this.state.form_image}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
                            <LocationCard locationId={locations.locationId} cardTitle={locations.cardTitle}
                                          cardText={locations.cardText}
                                          cardImage={locations.cardImage} userId={locations.userId}
                                          locationAddress={locations.locationAddress}
                                          editLocation={this.editLocation} deleteLocation={this.deleteLocation}/>
                    )
                }
            </div>
        );
    }

    getLocations = () => {
        let uid = this.props.match.params.uid;
        axios.get('https://localhost:3000/locations/' + uid)
            .then(res => {
                const locations = res.data;
                this.setState({locations: locations})
            });
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

        axios.delete('https://localhost:3000/locations/' + locationId)
            .then(res => {
                // Auswerten der Antwort
                //
                this.setState({
                    showAlert: true,
                    alertType: 'alert alert-success',
                    alertText: 'Location successfully deleted!',
                });
            });
    };

    sendCreateEdit = () => {
        let data = {
            title: '',
            address: '',
            description: '',
            image: '',
        };

        if (this.state.form_type === 'new') {
            axios.post('https://localhost:3000/locations/', {data})
                .then(res => {
                    // Auswerten der Antwort
                    //
                    this.setState({
                        showAlert: true,
                        alertType: 'alert alert-success',
                        alertText: 'Location successfully created!',
                    });
                });
        } else if (this.state.form_type === 'update') {
            axios.put('https://localhost:3000/locations/' + this.state.form_location_id, {data})
                .then(res => {
                    // Auswerten der Antwort
                    //
                    this.setState({
                        showAlert: true,
                        alertType: 'alert alert-success',
                        alertText: 'Location successfully updated!',
                    });
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
                    src={this.state.cardImage}
                    className="card-img-top" alt="..."/>
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