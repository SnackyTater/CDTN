import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {LandingPage, HomePage, ProfilePage, SignupPage, ChatPage, ResetPasswordPage} from '../page';

import {HomeContext, HomeContextStore} from '../context/home';

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
                        <HomeContext.Provider value={HomeContextStore()}>
                            <HomePage/>
                        </HomeContext.Provider>
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
                <Switch>
                    <Route path="/reset-password/:id">
                        <ResetPasswordPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}