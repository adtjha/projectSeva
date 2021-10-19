import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import image from '../../images/logo/android-chrome-512x512.png'
import fundraise from '../../images/fundraise.jpg'
import ludoBoard from '../../images/ludoBoard.jpg'
import { useHistory } from 'react-router'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useWindowScroll } from 'react-use'
import { useState } from 'react'
import {
    CogIcon,
    DocumentDuplicateIcon,
    CurrencyRupeeIcon,
    XIcon,
} from '@heroicons/react/solid'

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

const Nav = ({ open, setOpen, user }) => {
    return (
        <div className="w-full flex justify-between items-center py-4 px-8">
            <img className="h-8 w-8 mr-4" src={image} alt="logo" />
            <h1 className="text-4xl font-bold text-blueGray-600">dedo</h1>
            <button className="flex flex-row items-center justify-between">
                <motion.img
                    className="w-12 h-12 mr-4 rounded-full border shadow-lg hidden lg:inline-flex"
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.98 }}
                    src={user.photoURL}
                    alt="user"
                />
                {open ? (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        layoutId="nav"
                        className="w-full h-full px-8 md:p-10 absolute inset-0 bg-blueGray-800 flex flex-col md:flex-row flex-wrap items-start md:items-center justify-evenly"
                    >
                        <div className="ml-4 flex flex-row items-center">
                            <DocumentDuplicateIcon className="w-9 h-9 text-blueGray-400 mr-4" />
                            <h1 className="text-4xl text-blueGray-200">
                                History
                            </h1>
                        </div>
                        <div className="ml-4 flex flex-row items-center">
                            <CogIcon className="w-9 h-9 text-blueGray-400 mr-4" />
                            <h1 className="text-4xl text-blueGray-200">
                                Settings
                            </h1>
                        </div>
                        <div className="ml-4 flex flex-row items-center">
                            <CurrencyRupeeIcon className="w-9 h-9 text-blueGray-400 mr-4" />
                            <h1
                                className="text-4xl text-blueGray-200"
                                onClick={() => setOpen(!open)}
                            >
                                Raise Funds
                            </h1>
                        </div>
                        <div className="ml-4 flex flex-row items-center">
                            <XIcon className="w-9 h-9 text-blueGray-400 mr-4" />
                            <h1
                                className="text-4xl text-blueGray-200"
                                onClick={() => setOpen(!open)}
                            >
                                Close
                            </h1>
                        </div>
                    </motion.div>
                ) : (
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
                )}
            </button>
        </div>
    )
}

const Profile = () => {
    const [open, setOpen] = useState(false)
    const [user, loading, error] = useAuthState(auth)
    const { x, y } = useWindowScroll()
    const history = useHistory()
    console.log(user, loading, error)
    return error ? (
        <div>error</div>
    ) : loading ? (
        <Loading />
    ) : user ? (
        <div>
            <Nav open={open} setOpen={setOpen} user={user} />
            {open ? (
                <></>
            ) : (
                <>
                    <div className="w-full flex justify-center items-center">
                        <div className="opacity-40 uppercase font-bold">
                            Click on any channel to participate in it.
                        </div>
                    </div>
                    <div className="w-full flex flex-col flex-wrap md:flex-row justify-around items-center p-4">
                        {channels.map((c) => (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-84 p-4 bg-blueGray-50 shadow-md border border-blueGray-200 rounded-lg max-w-sm my-4 flex flex-col items-center cursor-pointer"
                            >
                                <div className="mb-2 flex flex-row items-center justify-between">
                                    <div className="font-bold">{c.name}</div>
                                    <motion.img
                                        className="w-24 h-24 m-auto rounded-lg"
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
                </>
            )}
        </div>
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
