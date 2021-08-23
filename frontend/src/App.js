import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import { About } from './features'
import { SocketContext, socket } from './connect/socket'
import { Game } from 'components/Game'

function App() {
    return (
        <SocketContext.Provider value={socket}>
            <Router>
                <div className="App m-auto">
                    <Switch>
                        <Route path="/game">
                            <Game key={1} />
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
        </SocketContext.Provider>
    )
}

export default App
