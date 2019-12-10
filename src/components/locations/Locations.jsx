import React, {Component} from 'react';
import AuthentificationService from "../authentication/AuthentificationService";

class Locations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form_location_id: 0,
            form_name: '',
            form_address: '',
            form_description: '',
            form_image: '',
            locations: [
                {
                    cardTitle: 'Ä charte-titu',
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

                <button type="button" className="btn btn-success mt-3 mb-3" data-toggle="modal" data-target="#exampleModal">
                    Create new location
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create new location</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input type="hidden" name="location_id" value=""/>
                                <label htmlFor="name"><b>Name</b></label>
                                <input type="text" name="name" className="form-control" id="name"/>
                                <label htmlFor="address" className="mt-2"><b>Address</b></label>
                                <input type="text" name="address" className="form-control" id="address"/>
                                <label htmlFor="description" className="mt-2"><b>Description</b></label>
                                <input type="text" name="description" className="form-control" id="description"/>
                                <label htmlFor="image" className="mt-2"><b>Image</b></label>
                                <input type="text" name="image" className="form-control" id="image"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Crate/Update</button>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    this.state.locations.map(
                        locations =>
                            <LocationCard cardTitle={locations.cardTitle} cardText={locations.cardText}
                                          cardImage={locations.cardImage} userId={locations.userId} editLocation={this.editLocation()}/>
                    )
                }
            </div>
        );
    }

    editLocation = () => {

    }
}

class LocationCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardText: this.props.cardText,
            cardTitle: this.props.cardTitle,
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
                    <p className="card-text">{this.state.cardText}</p>
                    {AuthentificationService.authenticatedLocation(this.props.userId) &&
                    <div className="text-right">
                        <button className="btn btn-dark mr-2">Edit</button>
                        <button className="btn btn-danger" onClick={this.props.editLocation}>Delete</button>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default Locations;