import React, {Component} from 'react';

class Locations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [
                {
                    cardTitle: 'Ä charte-titu',
                    cardText: 'Dr text derzue',
                    cardImage: 'https://unicheck.unicum.de/sites/default/files/styles/artikel_hauptbild/public/artikel/image/studieren-in-der-schweiz-alpenlandschaft-bergsee-thinkstockphotos-521200806-bluejayphoto.jpg?itok=FmFfUYCN'
                },
            ]
        }
    }

    render() {
        return (
            <div className="container mt-5">
                {
                    this.state.locations.map(
                        locations =>
                            <LocationCard cardTitle={locations.cardTitle} cardText={locations.cardText}
                                          cardImage={locations.cardImage}/>
                    )
                }
            </div>
        );
    }
}

class LocationCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myLocation: true,
            cardText: this.props.cardText,
            cardTitle: this.props.cardTitle,
            cardImage: this.props.cardImage,
        }
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
                    {this.state.myLocation &&
                    <div className="text-right">
                        <button className="btn btn-dark mr-2">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default Locations;