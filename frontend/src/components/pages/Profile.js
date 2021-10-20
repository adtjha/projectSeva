import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout } from '../../firebase'
import image from '../../images/logo/android-chrome-512x512.png'
import { useHistory } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { useMedia, useWindowScroll } from 'react-use'
import { useState } from 'react'
import { LogoutIcon } from '@heroicons/react/outline'

const Loading = () => {
    return (
        <div className="h-screen w-screen flex">
            <svg
                class="animate-spin m-auto h-8 w-8 text-blueGray-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    class="opacity-10"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                ></circle>
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </div>
    )
}

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

const Nav = ({ user }) => {
    const isLg = useMedia('(min-width: 768px)', false)
    const [open, setOpen] = useState(false)
    const history = useHistory()

    const logoutUser = () => {
        logout()
            .then((e) => {
                history.replace('/')
            })
            .catch((e) => alert(e))
    }

    const itemVariants = {
        closed: {
            opacity: 0,
        },
        open: { opacity: 1 },
    }

    const sideVariants = {
        closed: {
            transition: {
                staggerChildren: 0.15,
                staggerDirection: -1,
            },
        },
        open: {
            transition: {
                staggerChildren: 0.15,
                staggerDirection: 1,
            },
        },
    }

    return (
        <div className="sticky z-40 top-0 w-full flex flex-col md:flex-row items-center justify-center p-4">
            <div className="w-full flex justify-between items-center p-4 bg-white rounded-lg shadow-lg border-2 border-gray-100">
                <div className="w-36 flex flex-row items-center justify-evenly">
                    <img className="h-8 w-8" src={image} alt="logo" />
                    <h1 className="text-4xl font-bold text-blueGray-600">
                        dedo
                    </h1>
                </div>
                {isLg ? (
                    <>
                        <div className="max-w-lg flex flex-col flex-grow md:flex-row justify-evenly items-center">
                            <div className="py-1 px-2 flex flex-row items-center cursor-pointer">
                                <h1 className="px-2 text-lg text-blueGray-500 hover:text-blueGray-800">
                                    History
                                </h1>
                            </div>
                            <div className="py-1 px-2 flex flex-row items-center cursor-pointer">
                                <h1 className="px-2 text-lg text-blueGray-500 hover:text-blueGray-900">
                                    Settings
                                </h1>
                            </div>
                            <div className="py-1 px-2 flex flex-row items-center cursor-pointer">
                                <h1 className="px-2 text-lg text-blueGray-500 hover:text-blueGray-900">
                                    Raise Funds
                                </h1>
                            </div>
                        </div>
                    </>
                ) : (
                    ''
                )}
                <div className="w-24 md:w-36 flex flex-row items-center justify-evenly">
                    <motion.img
                        className="w-12 h-12 rounded-full border shadow-lg hidden md:inline-flex"
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.98 }}
                        src={user.photoURL}
                        alt="user"
                    />
                    <button onClick={logoutUser}>
                        <LogoutIcon className="w-8 h-8 text-blueGray-600 hover:text-blueGray-800" />
                    </button>
                    {!isLg && (
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-blueGray-800"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onClick={() => setOpen(!open)}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 288 }}
                        exit={{
                            height: 0,
                            transition: { delay: 0.7, duration: 0.3 },
                        }}
                        className="w-full h-72 mt-2 flex flex-col justify-evenly items-center bg-white rounded-lg shadow-lg border-2 border-gray-100"
                    >
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={sideVariants}
                            className="w-full h-full mt-2 flex flex-col justify-evenly items-center p-4"
                        >
                            {['History', 'Settings', 'Raise Funds'].map(
                                (e, i) => (
                                    <motion.h1
                                        variants={itemVariants}
                                        key={e + i}
                                        className="items-center text-lg text-blueGray-500 hover:text-blueGray-800 cursor-pointer"
                                    >
                                        {e}
                                    </motion.h1>
                                )
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const Profile = () => {
    const [user, loading, error] = useAuthState(auth)
    const { x, y } = useWindowScroll()
    const history = useHistory()
    console.log(user, loading, error)
    return error ? (
        <div>error</div>
    ) : loading ? (
        <Loading />
    ) : user ? (
        <motion.div>
            <Nav user={user} />
            <div className="z-0 w-full flex justify-center items-center">
                <div className="opacity-40 uppercase font-bold">
                    Click on any channel to participate in it.
                </div>
            </div>
            <div className="w-full flex flex-col flex-wrap md:flex-row justify-around items-center p-4">
                {channels.map((c) => (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
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
        </motion.div>
    ) : (
        <div className="w-screen h-screen flex">
            <h1
                className="m-auto bg-blueGray-200 text-6xl text-blueGray-800 font-extrabold rounded-2xl shadow-lg py-4 px-8"
                onClick={() => history.replace('/login')}
            >
                Login
            </h1>
        </div>
    )
}

export default Profile
