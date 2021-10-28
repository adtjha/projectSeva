import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useInterval } from 'react-use'
import Typewriter from 'typewriter-effect'
import { ArrowRightIcon } from '@heroicons/react/solid'

const LandingPage = () => {
    const [color, setColor] = useState('black')
    const [who, setWho] = useState('Influencer')
    return (
        <div className="bg-blend-hard-light h-screen w-full grid grid-flow-row-dense">
            <section class="text-blueGray-600 body-font h-screen w-full">
                <div class="container h-full w-full m-auto flex px-5 py-14 items-center justify-center flex-col">
                    <div class="text-center w-full">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            class="text-6xl mb-4 font-bold text-blueGray-900"
                        >
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter
                                        .pauseFor(1000)
                                        .typeString('Fundraising done better.')
                                        .pauseFor(500)
                                        .deleteAll()
                                        .typeString(
                                            'Philanthropy like never before.'
                                        )
                                        .pauseFor(500)
                                        .deleteAll()
                                        .typeString(
                                            'Bringing people together for a cause.'
                                        )
                                        .pauseFor(1000)
                                        .start()
                                }}
                                options={{
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </motion.h1>
                        <p class="mb-8 uppercase text-xs tracking-wide opacity-80">
                            Fundraising requires bank account and PAN Card.
                        </p>
                        <div class="flex justify-center">
                            <Link
                                class="w-36 inline-flex items-center justify-center px-8 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-blueGray-100 bg-blueGray-700 hover:bg-blueGray-800 focus:border-rose-700 active:bg-blueGray-700 transition ease-in-out duration-150 cursor-pointer uppercase"
                                to="/login"
                            >
                                Login
                            </Link>
                            <Link
                                class="w-36 inline-flex items-center justify-center px-8 py-2 ml-2 border border-transparent text-base leading-6 font-medium rounded-md text-blueGray-100 bg-blueGray-700 hover:bg-blueGray-800 focus:border-rose-700 active:bg-blueGray-700 transition ease-in-out duration-150 cursor-pointer uppercase"
                                to="/signup"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section class="bg-white text-blueGray-600 body-font h-screen w-full flex flex-col">
                <div class="container h-full w-full m-auto flex items-center justify-evenly flex-col md:flex-row">
                    <div className="md:w-2/5 flex flex-col items-center justify-evenly">
                        <h1 className="text-6xl my-2 text-center">
                            <span className="font-bold">one-to-one</span>{' '}
                            interaction.
                        </h1>
                    </div>
                    <div className="flex flex-col items-center justify-evenly">
                        <div className="w-80 md:w-120 p-2 flex flex-col items-center justify-evenly border-4 border-blueGray-200 bg-blueGray-50 rounded-2xl shadow-md ">
                            <div className="w-full h-full flex flex-col md:flex-row items-center justify-between">
                                <div className="w-72 md:w-4/5 h-40 md:h-auto bg-blueGray-600 shadow-lg rounded-xl flex flex-col items-center justify-start">
                                    <div className="w-72 md:w-full h-36 md:h-auto border-2 border-blueGray-600 bg-blueGray-50 rounded-xl flex items-center justify-center overflow-hidden">
                                        <motion.img
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-72 h-36"
                                            key={who}
                                            src={`https://avatars.dicebear.com/api/avataaars/${who}.svg?mouth[]=smile`}
                                            alt="user"
                                        />
                                    </div>
                                    <span className="text-blueGray-50">
                                        <Typewriter
                                            onInit={(typewriter) => {
                                                typewriter
                                                    .pauseFor(1000)
                                                    .typeString('Influencer')
                                                    .pauseFor(500)
                                                    .deleteChars(10)
                                                    .callFunction(() => {
                                                        setWho('Famous CEO')
                                                    })
                                                    .typeString('Famous CEO')
                                                    .pauseFor(500)
                                                    .deleteChars(10)
                                                    .callFunction(() => {
                                                        setWho('Celebrity')
                                                    })
                                                    .typeString('Celebrity')
                                                    .pauseFor(500)
                                                    .deleteChars(9)
                                                    .callFunction(() => {
                                                        setWho(
                                                            'Notable Personality'
                                                        )
                                                    })
                                                    .typeString(
                                                        'Notable Personality'
                                                    )
                                                    .pauseFor(1000)
                                                    .callFunction(() => {
                                                        setWho('Influencer')
                                                    })
                                                    .start()
                                            }}
                                            options={{
                                                autoStart: true,
                                                loop: true,
                                            }}
                                        />
                                    </span>
                                </div>
                                <div className="w-full md:w-4 h-4 md:h-full"></div>
                                <div className="w-72 md:w-4/5 h-40 md:h-auto bg-blueGray-600 shadow-lg rounded-xl flex flex-col items-center justify-start">
                                    <div className="relative w-72 md:w-full h-36 md:h-auto border-2 border-blueGray-600 bg-blueGray-50 rounded-xl flex items-center justify-center overflow-hidden">
                                        <motion.img
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-72 h-36"
                                            key="you"
                                            src={`https://avatars.dicebear.com/api/avataaars/YOU.svg?clothesColor[]=pastelGreen&mouth[]=smile`}
                                            alt="user"
                                        ></motion.img>
                                        <span className="absolute top-1 right-1 text-xs font-semibold text-blueGray-800">
                                            03:55
                                        </span>
                                    </div>
                                    <span className="text-blueGray-50">
                                        you
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="bg-blueGray-900 text-blueGray-600 body-font h-screen w-full flex flex-col">
                <div class="container h-full w-full m-auto flex items-center justify-evenly flex-col md:flex-row">
                    <div
                        className="w-full md:w-2/5 flex flex-wrap md:flex-col items-start justify-evenly text-6xl md:text-7xl font-bold bg-blueGray-900"
                        style={{
                            background:
                                'linear-gradient(180deg, rgba(15,23,42,1) 0%, rgba(235,87,87,1) 5%, rgba(242,201,76,1) 30%, rgba(171,192,83,1) 45%, rgba(39,174,96,1) 70%, rgba(47,128,237,1) 95%, rgba(15,23,42,1) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        <h1 className="hidden md:flex md:my-2">or</h1>
                        <h1 className="hidden md:flex md:my-2">just</h1>
                        <h1 className="hidden md:flex md:my-2">play</h1>
                        <h1 className="hidden md:flex md:my-2">ludo</h1>
                        <h1 className="hidden md:flex md:my-2">with</h1>
                        <h1 className="hidden md:flex md:my-2">them.</h1>
                        <h1 className="flex md:hidden text-center">
                            or just play ludo with them.
                        </h1>
                    </div>
                    <div className="flex flex-col items-center justify-evenly">
                        <div className="w-80 md:w-120 h-80 md:h-120 p-2 border-4 border-blueGray-400 bg-blueGray-800 rounded-3xl shadow-md flex flex-col items-center justify-between">
                            <div className="w-full h-24 md:h-44 flex flex-row items-center justify-between">
                                <div className="w-24 md:w-44 h-24 md:h-44 bg-red-400 border-2 border-red-600 rounded-2xl flex items-start">
                                    <div className="w-full h-4/5 shadow-md bg-blueGray-700 rounded-2xl flex items-center justify-center overflow-hidden">
                                        <img
                                            src="https://avatars.dicebear.com/api/avataaars/player1.svg"
                                            alt="user"
                                        />
                                    </div>
                                </div>
                                <div className="w-24 md:w-44 h-24 md:h-44 bg-green-400 border-2 border-green-600 rounded-2xl flex justify-end">
                                    <div className="w-4/5 h-full shadow-md bg-blueGray-700 rounded-2xl flex items-center justify-center overflow-hidden">
                                        <img
                                            src="https://avatars.dicebear.com/api/avataaars/player2.svg"
                                            alt="user"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-24 md:h-24 flex flex-row items-center justify-center">
                                <div className="w-24 md:w-44 h-24 md:h-24 flex items-center justify-center">
                                    <div className="w-20 md:w-24 h-20 md:h-24 bg-blueGray-400 rounded-2xl flex items-center justify-center">
                                        <div className="w-8 h-8 border-4 border-blueGray-800 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-24 md:h-44 flex flex-row items-center justify-between">
                                <div className="w-24 md:w-44 h-24 md:h-44 bg-yellow-400 border-2 border-yellow-600 rounded-2xl flex justify-start">
                                    <div className="w-4/5 h-full shadow-md bg-blueGray-700 rounded-2xl flex items-center justify-center overflow-hidden">
                                        <img
                                            src="https://avatars.dicebear.com/api/avataaars/player3.svg"
                                            alt="user"
                                        />
                                    </div>
                                </div>
                                <div className="w-24 md:w-44 h-24 md:h-44 bg-blue-400 border-2 border-blue-600 rounded-2xl flex items-end">
                                    <div className="w-full h-4/5 shadow-md bg-blueGray-700 rounded-2xl flex items-center justify-center overflow-hidden">
                                        <img
                                            src="https://avatars.dicebear.com/api/avataaars/player23.svg"
                                            alt="user"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-blueGray-50 text-blueGray-600 body-font h-screen w-full flex flex-col items-center justify-center">
                <div className="w-full h-1/5 flex items-center justify-center">
                    <h1 className="text-8xl font-bold text-blueGray-300">
                        pricing
                    </h1>
                </div>
                <div className="w-full h-3/5 flex flex-col md:flex-row items-center justify-evenly">
                    <div className="w-1/2 md:w-1/5 flex flex-col items-center justify-center text-center">
                        <h1 className="text-2xl font-bold uppercase text-blueGray-600">
                            for individual Fundraise
                        </h1>
                        <p className="text-xs font-normal capitalize mt-4 text-blueGray-600">
                            A single channel will be provided, with rooms being
                            created automatically to accomodate the players.
                        </p>
                    </div>
                    <div className="m-4">
                        <ArrowRightIcon className="transform-gpu rotate-90 md:rotate-0 w-16 md:w-64 h-4 md:h-12 text-blueGray-400" />
                    </div>
                    <div className="w-1/2 md:w-1/5 flex flex-col items-center justify-center text-center">
                        <h1 className="text-6xl font-bold uppercase">25%</h1>
                        <p className="text-xs font-normal capitalize mt-4">
                            25% of total fundraise will be charged as platform
                            service fee.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
