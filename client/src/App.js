import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

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
                <Route exact path='/' component={DailyThingBoard} />
                <Route exact path='/auth' component={Auth}/>
            </Switch>
        );
    }
}

export default App;