import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from '../layout/page/landing/landing';
import Signup from '../layout/page/signup/signup';
import Profile from '../layout/page/profile/profile';
import Home from '../layout/page/home/home';
import Chat from '../layout/page/chat/chat';

export default function route() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Landing/>
                    </Route>
                    <Route exact path="/signup">
                        <Signup/>
                    </Route>
                    <Route exact path="/profile">
                        <Profile/>
                    </Route>
                    <Route exact path="/home">
                        <Home/>
                    </Route>
                    <Route exact path="/chat">
                        <Chat/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
