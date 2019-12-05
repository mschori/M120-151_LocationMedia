import React, {Component} from 'react';

class ErrorComponent extends Component{
    render() {
        return(
            <div className="container mt-5">
                This site is not present.<br/>
                Try another site.
            </div>
        );
    }
}

export default ErrorComponent;
