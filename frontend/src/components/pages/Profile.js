import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom'
import { Game } from '../Game'
import { Loading } from '../Loading'
import { Nav } from '../Nav'
import Fund from './Fund'
import { Home } from './Home'
import { Card } from './Card'

const Profile = () => {
    const [user, loading, error] = useAuthState(auth)
    const history = useHistory()
    const { path } = useRouteMatch()

    return error ? (
        <div>error</div>
    ) : loading ? (
        <Loading />
    ) : user ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <header className="w-full h-full">
                <Nav user={user} />
            </header>

            <Switch>
                <Route exact path={path}>
                    <Home user={user} />
                </Route>
                <Route path="/fund">
                    <Fund user={user} />
                </Route>
                <Route exact path="/game/:channelId">
                    <Game user={user} key={1} />
                </Route>
            </Switch>
        </div>
    ) : (
        history.replace('/login')
    )
}

export default Profile

/**
 */

/**
 */
