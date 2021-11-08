import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import { collection } from '@firebase/firestore'
import { auth, db } from '../../firebase'
import {
    Switch,
    Route,
    useHistory,
    useRouteMatch,
    Link,
} from 'react-router-dom'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { useState } from 'react'
import { useWindowScroll } from 'react-use'
import { Game } from '../Game'
import { Loading } from '../Loading'
import { Nav } from '../Nav'
import { guid } from '../Game/functions/guid'
import Fund from './Fund'
import parse from '../Game/functions/parse'
import { UsersIcon, XCircleIcon } from '@heroicons/react/solid'
// import Card from './Card'

const Card = ({ isSelected, data, setSelected, id }) => {
    return (
        <>
            {!isSelected && (
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    key={id}
                    layoutId={id}
                    onClick={() => setSelected(id)}
                    className="p-4 bg-gradient-to-b from-white to-blueGray-100  shadow-lg border border-blueGray-200 rounded-2xl max-w-sm my-4 flex flex-col items-center cursor-pointer"
                >
                    <motion.div className="mb-2 flex flex-row items-center justify-between">
                        <motion.div
                            layoutId={`${id}-img-box`}
                            className="w-48 mr-2 z-10 flex items-center justify-center bg-blueGray-200 md:shadow-md rounded-t-lg md:rounded-lg overflow-hidden"
                        >
                            <motion.img
                                layoutId={`${id}-img`}
                                src={data.img}
                                alt="pics"
                            />
                        </motion.div>
                        <motion.h1
                            layoutId={`${id}-name`}
                            className="font-bold"
                        >
                            {data.name}
                        </motion.h1>
                    </motion.div>
                    <motion.div className="my-2 w-full flex flex-row items-center justify-around">
                        <div className="flex flex-col items-center justify-center">
                            <motion.div
                                layoutId={`${id}-raised-title`}
                                className="text-blueGray-400 uppercase text-xs tracking-wider"
                            >
                                RAISED
                            </motion.div>
                            <motion.div
                                layoutId={`${id}-raised`}
                                className="w-18 flex flex-row items-center justify-evenly"
                            >
                                ₹ {parse(data.raised)}
                            </motion.div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <motion.div
                                layoutId={`${id}-playing-title`}
                                className="text-blueGray-400 uppercase text-xs tracking-wider"
                            >
                                PLAYING
                            </motion.div>
                            <motion.div
                                layoutId={`${id}-playing`}
                                className="w-18 flex flex-row items-center justify-evenly"
                            >
                                {data.users}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-blueGray-400 ml-1"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            </motion.div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <motion.div
                                layoutId={`${id}-min-title`}
                                className="text-blueGray-400 uppercase text-xs tracking-wider"
                            >
                                MINIMUM
                            </motion.div>
                            <motion.div
                                layoutId={`${id}-min`}
                                className="w-18 flex flex-row items-center justify-evenly"
                            >
                                ₹ {parse(data.pricing)}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        key={id}
                        layoutId={id}
                        className="w-full md:w-2/3 h-full relative my-4 p-4 shadow-md rounded-2xl bg-white border border-blueGray-200 flex flex-wrap md:flex-nowrap md:flex-row items-center md:items-start justify-center md:justify-start cursor-pointer"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-10 h-10 p-1 m-2 bg-white rounded-2xl absolute top-0 right-0 z-20"
                        >
                            <XCircleIcon onClick={() => setSelected(null)} />
                        </motion.div>
                        <motion.div
                            layoutId={`${id}-img-box`}
                            className="w-full md:w-1/3 md:h-full -mb-16 md:m-8 md:mr-0 z-10 flex items-center justify-center bg-blueGray-200 md:shadow-md rounded-t-lg md:rounded-lg overflow-hidden"
                        >
                            <motion.img
                                layoutId={`${id}-img`}
                                src={data.img}
                                alt="card"
                            />
                        </motion.div>
                        <motion.div className="w-full  md:pt-4 h-full flex flex-col items-center md:items-start justify-evenly md:justify-start">
                            <div className="w-full flex flex-col items-start md:items-start z-20">
                                <motion.h1
                                    layoutId={`${id}-name`}
                                    className="p-2 pb-1 text-xl md:text-4xl font-bold bg-gradient-to-b from-transparent via-white to-white"
                                >
                                    {data.name}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="p-2 pt-0 md:px-0 text-sm text-blueGray-400"
                                >
                                    {data.keywords.map((k, i, arr) => (
                                        <>
                                            <a
                                                href="/"
                                                key={k}
                                                className="w-min capitalize hover:text-red-400 hover:underline cursor-pointer p-0 m-0"
                                            >
                                                #{k}
                                            </a>
                                            {i !== arr.length - 1 ? ', ' : ''}
                                        </>
                                    ))}
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="p-2 md:px-0 text-blueGray-600 overflow-hidden"
                                >
                                    {data.description}
                                </motion.p>
                            </div>
                            <div className="w-full p-2 flex flex-row items-center justify-evenly">
                                <div className=" flex flex-col items-center justify-center">
                                    <motion.div
                                        layoutId={`${id}-raised-title`}
                                        className="text-blueGray-400 uppercase text-xs tracking-wider"
                                    >
                                        RAISED
                                    </motion.div>
                                    <motion.div
                                        layoutId={`${id}-raised`}
                                        className="w-18 flex flex-row items-center justify-evenly"
                                    >
                                        ₹ {parse(data.raised)}
                                    </motion.div>
                                </div>
                                <div className=" flex flex-col items-center justify-center">
                                    <motion.div
                                        layoutId={`${id}-playing-title`}
                                        className="text-blueGray-400 uppercase text-xs tracking-wider"
                                    >
                                        PLAYING
                                    </motion.div>
                                    <motion.div
                                        layoutId={`${id}-playing`}
                                        className="w-18 flex flex-row items-center justify-evenly"
                                    >
                                        {data.users}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-blueGray-400 ml-1"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                        </svg>
                                    </motion.div>
                                </div>
                                <div className=" flex flex-col items-center justify-center">
                                    <motion.div
                                        layoutId={`${id}-min-title`}
                                        className="text-blueGray-400 uppercase text-xs tracking-wider"
                                    >
                                        MINIMUM
                                    </motion.div>
                                    <motion.div
                                        layoutId={`${id}-min`}
                                        className="w-18 flex flex-row items-center justify-evenly"
                                    >
                                        ₹ {parse(data.pricing)}
                                    </motion.div>
                                </div>
                            </div>
                            <div className="w-full p-2 flex flex-col md:flex-row items-center justify-between">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className={`w-full py-2 px-4 md:px-2 m-2 bg-blueGray-600 rounded-lg shadow-md flex flex-row items-center justify-between`}
                                >
                                    <div className="w-12 md:w-20 flex items-center">
                                        <UsersIcon className="m-2 w-6 md:w-12 h-6 md:h-12 text-blueGray-200" />
                                    </div>
                                    <div className="p-2 flex flex-grow flex-col items-start justify-center">
                                        <div className="uppercase font-bold text-white">
                                            play ludo
                                        </div>
                                    </div>
                                    <div className="flex items-center text-white font-bold text-2xl">
                                        ₹{parse(data.pricing)}
                                    </div>
                                </motion.button>
                                <p className="text-xs text-blueGray-400 px-4 text-left">
                                    Setup a short meeting, and video chat with
                                    your favourite star.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

const Home = () => {
    const { x, y } = useWindowScroll()
    const query = collection(db, 'channel')
    const [channels, loading, error] = useCollectionOnce(query)
    const [selected, setSelected] = useState(null)

    return (
        <>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && (
                <main className="w-full h-full flex items-center justify-center">
                    <Loading />
                </main>
            )}
            {channels && (
                <main className="w-full h-full flex flex-col items-center justify-center">
                    {channels.docs.length > 0 ? (
                        <>
                            <div className="z-0 w-full flex justify-center items-center -mb-4">
                                <div className="opacity-40 uppercase font-bold">
                                    Click on any channel to participate in it.
                                </div>
                            </div>
                            <AnimateSharedLayout type="crossfade">
                                <div className="w-full flex flex-col flex-wrap md:flex-row justify-around items-center p-4">
                                    {channels.docs.map((doc) => (
                                        <Card
                                            data={doc.data()}
                                            id={doc.id}
                                            isSelected={selected === doc.id}
                                            setSelected={setSelected}
                                        />
                                    ))}
                                    {console.log(channels)}
                                </div>
                            </AnimateSharedLayout>
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
                        </>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white border-2 border-blueGray-100 m-auto px-8 py-4 uppercase rounded-md shadow-xl"
                        >
                            Create Channel
                        </motion.button>
                    )}
                </main>
            )}
        </>
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
