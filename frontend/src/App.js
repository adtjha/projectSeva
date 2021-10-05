import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import { About } from './features'
import { Game } from 'components/Game'
import ChitFund from 'components/ChitFund'

function App() {
    return (
        <Router>
            <div className="App m-auto">
                <Switch>
                    <Route exact path="/game">
                        <Game key={1} />
                    </Route>
                    <Route path="/game/:id">
                        <Game key={1} />
                    </Route>
                    <Route path="/about">
                        <About />
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
