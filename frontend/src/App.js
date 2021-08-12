import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Board from './components/Board'
import LandingPage from './components/LandingPage'
import { About } from './features'
import { SocketContext, socket } from './connect/socket'

function App() {
    return (
        <SocketContext.Provider value={socket}>
            <Router>
                <div className="App m-auto lg:p-8 ">
                    <Switch>
                        <Route path="/game">
                            <Board key={1} socket={socket} />
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
