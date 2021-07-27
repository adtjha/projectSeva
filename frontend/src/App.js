import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Board from './components/Board'
import LandingPage from './components/LandingPage'
import { About } from './features'

function App() {
    return (
        <Router>
            <div className="App m-auto lg:p-8 ">
                <Switch>
                    <Route path="/game">
                        <Board key={1} />
                    </Route>
                    <Route path="/about">
                        <About />
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
