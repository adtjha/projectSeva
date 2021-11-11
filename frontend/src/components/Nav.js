import { logout } from '../firebase'
import image from '../images/logo/android-chrome-512x512.png'
import { useHistory } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useMedia } from 'react-use'
import { useState } from 'react'
import { LogoutIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { BASE_API } from '../Constants'

const loginMenu = [
    { name: 'home', href: '/' },
    { name: 'funds', href: '/fund' },
]

export const Nav = ({ user }) => {
    const isLg = useMedia('(min-width: 768px)', false)
    const [open, setOpen] = useState(false)
    const history = useHistory()

    console.log(user)

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
        <div className="relative z-40 top-0 w-full flex flex-col md:flex-row items-center justify-center p-4">
            <div className="w-full flex justify-between items-center p-4 bg-white rounded-lg shadow-md border-2 border-gray-100">
                <div className="w-36 flex flex-row items-center justify-evenly">
                    <img className="h-8 w-8" src={image} alt="logo" />
                    <h1 className="text-4xl font-bold text-blueGray-600">
                        dedo
                    </h1>
                </div>
                {isLg ? (
                    <>
                        <div className="max-w-lg flex flex-col flex-grow md:flex-row justify-evenly items-center">
                            {loginMenu.map((e) => (
                                <div className="py-1 px-2 flex flex-row items-center cursor-pointer">
                                    <h1 className="px-2 text-lg text-blueGray-500 hover:text-blueGray-800 capitalize">
                                        <Link to={`${e.href}`}>{e.name}</Link>
                                    </h1>
                                </div>
                            ))}
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
                            {loginMenu.map((e, i) => (
                                <motion.h1
                                    variants={itemVariants}
                                    key={i}
                                    className="items-center text-lg text-blueGray-500 hover:text-blueGray-800 cursor-pointer"
                                >
                                    <Link
                                        to={`${e.href}`}
                                        onClick={() => setOpen(false)}
                                    >
                                        {e.name}
                                    </Link>
                                </motion.h1>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
