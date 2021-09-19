import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import { About } from './features'
import { SocketContext, socket } from './connect/socket'
import { Game } from 'components/Game'

function App() {
    return (
        <Router>
            <div className="App m-auto">
                <Switch>
                    <Route path="/game">
                        <SocketContext.Provider value={socket}>
                            <Game key={1} />
                        </SocketContext.Provider>
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
