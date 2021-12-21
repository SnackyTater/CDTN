import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {LandingPage, HomePage, ProfilePage, SignupPage, ChatPage} from '../page'

export default function route() {
    return (
        <Router>
            <div className='App'>
                <Switch>
                    <Route exact path="/">
                        <LandingPage/>
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path="/home">
                        <HomePage/>
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path="/profile">
                        <ProfilePage/>
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path="/signup">
                        <SignupPage/>
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path="/chat">
                        <ChatPage/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}