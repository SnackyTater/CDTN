import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './component/landing/landing';
import Signup from './component/signup/signup';
import Profile from './component/profile/profile'

function App() {
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
                </Switch>
            </div>
        </Router>
    )
}

export default App; 