import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import {LandingPage, HomePage, ProfilePage, SignupPage, ChatPage, ResetPasswordPage, NotFoundPage} from '../page';

import {HomeContext, HomeContextStore} from '../context/home';
import {PopupContext, PopupContextStore} from '../context/popup';
import {SnackbarContext, SnackbarContextStore} from '../context/snackbar';

export default function route() {
    return (
        <Router>
            <div className='App'>
                <Switch>
                    <PopupContext.Provider value={PopupContextStore()}>
                        <Route exact path="/">
                            <LandingPage/>
                        </Route>

                        <SnackbarContext.Provider value={SnackbarContextStore()}>
                            <Route exact path="/home">
                                <HomeContext.Provider value={HomeContextStore()}>
                                    <HomePage/>
                                </HomeContext.Provider>
                            </Route>

                            <Route exact path="/profile">
                                <ProfilePage/>
                            </Route>

                            <Route exact path="/chat">
                                <ChatPage/>
                            </Route>
                        </SnackbarContext.Provider>
                        

                        <Route exact path="/signup">
                            <SignupPage/>
                        </Route>
                    </PopupContext.Provider>

                    <Route exact path="/reset-password/:id">
                        <ResetPasswordPage />
                    </Route>

                    <Route path="/404">
                        <NotFoundPage />
                    </Route>

                    <Redirect to="/404"/>
                </Switch>
            </div>
        </Router>
    )
}