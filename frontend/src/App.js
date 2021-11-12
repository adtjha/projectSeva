import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import LandingPage from './components/pages/LandingPage'
import ChitFund from './components/pages/ChitFund'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Profile from './components/pages/Profile'
import { AnimateSharedLayout } from 'framer-motion'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import { Loading } from './components/Loading'
import { ErrorPage } from './components/ErrorPage'
import { useEffect } from 'react'

function App() {
    const [user, loading, error] = useAuthState(auth)

    useEffect(() => {
        if (error !== undefined) {
            return (
                <ErrorPage
                    error={{
                        title: error.code,
                        message: error.message,
                    }}
                />
            )
        }
    })

    return (
        <Router>
            <AnimateSharedLayout type="crossfade">
                <div className="App m-auto">
                    {loading ? (
                        <Loading />
                    ) : user ? (
                        <Switch>
                            <Route path="/">
                                <Profile />
                            </Route>
                        </Switch>
                    ) : (
                        <Switch>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/signup">
                                <Signup />
                            </Route>
                            <Route exact path="/chit">
                                <ChitFund />
                            </Route>
                            <Route exact path="/">
                                <LandingPage />
                            </Route>
                            <Route path="*">
                                <Redirect
                                    to={{
                                        pathname: '/login',
                                    }}
                                />
                            </Route>
                        </Switch>
                    )}
                </div>
            </AnimateSharedLayout>
        </Router>
    )
}

export default App
