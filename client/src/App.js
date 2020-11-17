import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './Auth/PrivateRoute';

//Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

//Components
import Auth from './Auth/Auth';
import DailyThingBoard from './dailyThingBoard/dailyThingBoard';

class App extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/auth' component={Auth}/>
                <PrivateRoute path='/' component={DailyThingBoard} />
            </Switch>
        );
    }
}

export default App;