import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import { Game } from './components/Game'
import ChitFund from './components/pages/ChitFund'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Donation from './components/pages/Donation'
import AddMoney from './components/pages/AddMoney'
import Profile from './components/pages/Profile'

function App() {
    return (
        <Router>
            <div className="App m-auto">
                <Switch>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/donation">
                        <Donation />
                    </Route>
                    <Route path="/addMoney">
                        <AddMoney />
                    </Route>
                    <Route exact path="/game">
                        <Game key={1} />
                    </Route>
                    <Route path="/game/:id">
                        <Game key={1} />
                    </Route>
                    <Route exact path="/chit">
                        <ChitFund />
                    </Route>
                    <Route path="/">
                        <LandingPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
