import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from '../page/landing/landing';
import Home from '../page/home/home';
import Profile from '../page/profile/profile';
import Signup from '../page/signup/signup';

export default function route() {
    return (
        <Router>
            <div className='App'>
                <Switch>
                    <Route exact path="/">
                        <Landing/>
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path="/home">
                        <Home/>
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path="/profile">
                        <Profile/>
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path="/signup">
                        <Signup/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}