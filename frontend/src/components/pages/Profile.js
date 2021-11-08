import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import {
    Switch,
    Route,
    useHistory,
    useRouteMatch,
    Link,
} from 'react-router-dom'
import { Game } from '../Game'
import { Loading } from '../Loading'
import { Nav } from '../Nav'
import { guid } from '../Game/functions/guid'
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
                    <Home />
                </Route>
                <Route path="/card/:id">
                    <Card />
                </Route>
                <Route path="/fund">
                    <Fund />
                </Route>
                <Route exact path="/game">
                    <Game key={1} />
                </Route>
                <Route path="/game/:id">
                    <Game key={1} />
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
