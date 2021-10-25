import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useInterval } from 'react-use'
import Typewriter from 'typewriter-effect'

const LandingPage = () => {
    const [color, setColor] = useState('black')
    const [who, setWho] = useState('Influencer')
    return (
        <div className="bg-gradient-to-r from-red-100 via-green-100 to-blue-100 bg-blend-hard-light h-screen w-full grid grid-flow-row-dense">
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
            <section class="bg-white text-blueGray-600 body-font h-screen w-full">
                <div class="container h-full w-full m-auto flex items-center justify-evenly flex-col md:flex-row">
                    <div className="md:w-2/5 flex flex-col items-center justify-evenly">
                        <h1 className="text-4xl my-2 text-center">
                            <span className="font-bold">one-to-one</span>{' '}
                            interaction.
                        </h1>
                        <span className="text-2xl text-center my-2">with</span>
                        <p className="text-4xl font-bold my-2 text-center">
                            celebrities, notable personalities, social media
                            influencers
                        </p>
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
                                                    .typeString(
                                                        '<span className="text-red-500">Famous CEO</span>'
                                                    )
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
                                    <div className="w-72 md:w-full h-36 md:h-auto border-2 border-blueGray-600 bg-blueGray-50 rounded-xl flex items-center justify-center overflow-hidden">
                                        <motion.img
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-72 h-36"
                                            key="you"
                                            src={`https://avatars.dicebear.com/api/avataaars/YOU.svg?clothesColor[]=pastelGreen&mouth[]=smile`}
                                            alt="user"
                                        ></motion.img>
                                    </div>
                                    <span className="text-blueGray-50">
                                        you
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-evenly py-1 my-2">
                                <span className="uppercase text-xs">
                                    upcoming
                                </span>
                                <div className="flex flex-row justify-evenly py-1">
                                    {[0, 1, 2, 3, 4].map((e) => (
                                        <div
                                            key={e}
                                            className="w-4 md:w-12 h-4 md:h-12 mx-1 bg-blueGray-700 shadow-md rounded-full flex items-center justify-center overflow-hidden"
                                        >
                                            <img
                                                src={`https://avatars.dicebear.com/api/avataaars/${e}.svg?mouth[]=smile&mouth[]=default&mouth[]=scream&mouth[]=serious&mouth[]=tongue&mouth[]=twinkle&mouth[]=sad&mouth[]=grimace&mouth[]=eating&mouth[]=disbelief&mouth[]=concerned&mouth[]=screamOpen`}
                                                alt="user"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-72 h-px bg-blueGray-200 my-2"></div>
                            <div className="flex flex-row items-center justify-evenly py-1">
                                <span className="uppercase text-xs">
                                    audience :
                                </span>{' '}
                                <div className="flex flex-row justify-evenly py-1 px-2">
                                    {[
                                        '0frog',
                                        '1frog',
                                        '2frog',
                                        '3frog',
                                        '4frog',
                                        '5frog',
                                        '6frog',
                                        '7frog',
                                        '8frog',
                                        '9frog',
                                        '00frog',
                                        '11frog',
                                        '22frog',
                                        '33frog',
                                        '44frog',
                                        '55frog',
                                        '66frog',
                                        '77frog',
                                        '88frog',
                                        '99frog',
                                    ].map((e) => (
                                        <div
                                            key={e}
                                            className="w-4 h-4 -mx-1 shadow-md bg-blueGray-700 rounded-full flex items-center justify-center overflow-hidden"
                                        >
                                            <img
                                                src={`https://avatars.dicebear.com/api/avataaars/${e}.svg`}
                                                alt="user"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
