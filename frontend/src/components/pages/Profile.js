import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWindowScroll } from 'react-use'
import Donation from './Donation'
import AddMoney from './AddMoney'
import { Game } from '../Game'
import { Loading } from '../Loading'
import { Nav } from '../Nav'
import { guid } from '../Game/functions/guid'

const channels = [
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
    {
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        img: 'https://fakeimg.pl/64x64/',
        totalRaised: 4500,
        users: 20,
        minDonation: 225,
    },
]

const Home = () => {
    const { x, y } = useWindowScroll()

    return (
        <main className="">
            <div className="z-0 w-full flex justify-center items-center -mb-4">
                <div className="opacity-40 uppercase font-bold">
                    Click on any channel to participate in it.
                </div>
            </div>
            <div className="w-full flex flex-col flex-wrap md:flex-row justify-around items-center p-4">
                {channels.map((c, i) => (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        key={guid}
                        className="p-4 bg-blueGray-50 shadow-lg border border-blueGray-200 rounded-2xl max-w-sm my-4 flex flex-col items-center cursor-pointer"
                    >
                        <div className="mb-2 flex flex-row items-center justify-between">
                            <div className="font-bold">{c.name}</div>
                            <motion.img
                                className="w-24 h-24 m-auto rounded-2xl"
                                src={c.img}
                                alt="pics"
                            />
                        </div>
                        <div className="my-2 w-full flex flex-row items-center justify-around">
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-blueGray-400 uppercase text-xs tracking-wider">
                                    RAISED
                                </div>
                                <div className="w-18 flex flex-row items-center justify-evenly">
                                    ₹ {c.totalRaised}
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-blueGray-400 uppercase text-xs tracking-wider">
                                    PLAYING
                                </div>
                                <div className="w-18 flex flex-row items-center justify-evenly">
                                    {c.users}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-blueGray-400 ml-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-blueGray-400 uppercase text-xs tracking-wider">
                                    MINIMUM
                                </div>
                                <div className="w-18 flex flex-row items-center justify-evenly">
                                    ₹ {c.minDonation}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className={
                    (y < 240 ? 'hidden' : 'fixed') +
                    ' bottom-8 right-8 w-12 h-12 p-2 rounded-full shadow-lg bg-blueGray-800 flex items-center justify-center cursor-pointer'
                }
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth',
                    })
                }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blueGray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                    />
                </svg>
            </motion.div>
        </main>
    )
}

const Profile = () => {
    const [user, loading, error] = useAuthState(auth)
    const history = useHistory()
    const { path } = useRouteMatch()

    return error ? (
        <div>error</div>
    ) : loading ? (
        <Loading />
    ) : user ? (
        <div>
            <header>
                <Nav user={user} />
            </header>

            <Switch>
                <Route exact path={path}>
                    <Home />
                </Route>
                <Route path="/donation">
                    <Donation />
                </Route>
                <Route path="/funds">
                    <AddMoney />
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
