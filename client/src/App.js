import React, { Component } from 'react';
import Auth from './Auth/Auth';

//Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

class App extends Component {

    render() {
        return (
            <React.Fragment>
                <Auth />
            </React.Fragment>
        );
    }
}

export default App;