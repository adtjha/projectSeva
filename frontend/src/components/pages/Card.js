import { useParams } from 'react-router-dom'
import { VideoCameraIcon, UsersIcon } from '@heroicons/react/solid'
import parse from '../Game/functions/parse'
import { motion } from 'framer-motion'

const data = {
    img: 'https://avatars.dicebear.com/api/avataaars/salmaHayek.svg',
    keywords: [
        'actor',
        'producer',
        'director',
        'actor',
        'producer',
        'director',
        'actor',
        'producer',
        'director',
    ],
    description:
        "Salma Hayek was born on September 2, 1966 in Coatzacoalcos, Mexico. Her father's of Lebanese descent & her mother's of Mexican/Spanish ancestry. After having seen Willy Wonka & the Chocolate Factory (1971) in a local movie theater, she decided she wanted to become an actress.",
    services: [
        {
            type: 'Request a clip',
            color: 'blue',
            icon: 'VideoCameraIcon',
            description:
                'Personalized  video with a message, for you and your loved ones.',
            options: {},
            pricing: {
                currency: '$',
                amount: 500,
            },
        },
        {
            type: 'set a meet',
            color: 'purple',
            icon: 'UsersIcon',
            description:
                'Setup a short meeting, and video chat with your favourite star.',
            options: {
                maxLimit: '5',
                pricingUnit: '60000ms',
            },
            pricing: {
                currency: '$',
                amount: 2500,
            },
        },
    ],
    ratings: [
        {
            img: 'https://avatars.dicebear.com/api/avataaars/supposeKumar.svg',
            name: 'Suppose Kumar',
            stars: '3.5',
            text: 'The app is honestly just the title. I don’t think it’s the best because you have to PAY REAL MONEY to make it have a fake I message missed ft call or missed call!? Also why can I change the home Screen?',
        },
    ],
}

const Card = () => {
    const { id } = useParams()

    return (
        <div className="w-full flex flex-col items-center justify-center p-4">
            <div className="w-full h-full bg-white shadow-md rounded-lg md:rounded-2xl m-4 mt-0 pt-4 flex flex-wrap md:flex-nowrap md:flex-row items-center md:items-start justify-center md:justify-start">
                <div className="w-36 md:w-1/3 md:h-full -mb-16 md:m-4 z-10 bg-blueGray-200 shadow-md rounded-full md:rounded-2xl overflow-hidden">
                    <img src={data.img} alt="card" />
                </div>
                <div className="w-full m-4 p-4 pt-16 md:pt-4 h-full flex flex-col items-center md:items-start justify-evenly md:justify-start">
                    <div className="w-full flex flex-col items-center md:items-start">
                        <h1 className="text-4xl md:text-6xl font-bold">
                            Salma Hayek
                        </h1>
                        <p className="py-2 px-4 md:px-0 text-xs text-center md:text-left text-blueGray-400">
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
                        </p>
                        <p className="py-2 px-4 md:px-0 text-blueGray-600 text-center md:text-left overflow-hidden">
                            {data.description}
                        </p>
                    </div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-between">
                        {data.services.map((s) => (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full py-2 px-4 md:px-2 m-2 bg-${s.color}-600 rounded-lg shadow-md flex flex-row items-center justify-between`}
                            >
                                <div className="w-12 md:w-20 flex items-center">
                                    {s.icon === 'VideoCameraIcon' ? (
                                        <VideoCameraIcon
                                            className={`m-2 w-6 md:w-12 h-6 md:h-12 text-${s.color}-200`}
                                        />
                                    ) : (
                                        <UsersIcon
                                            className={`m-2 w-6 md:w-12 h-6 md:h-12 text-${s.color}-200`}
                                        />
                                    )}
                                </div>
                                <div className="p-2 flex flex-grow flex-col items-start justify-center">
                                    <div className="uppercase font-bold text-white">
                                        {s.type}
                                    </div>
                                    <p
                                        className={`text-xs text-${s.color}-400 pr-2 text-left`}
                                    >
                                        {s.description}
                                    </p>
                                </div>
                                <div className="flex items-center text-white font-bold text-2xl">
                                    ₹{parse(s.pricing.amount)}
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex flex-wrap md:flex-row items-center md:items-start justify-center md:justify-start">
                <div className="w-full p-4 bg-white shadow-md rounded-lg h-full flex flex-col items-center md:items-start justify-evenly md:justify-start">
                    {data.ratings.map((r) => (
                        <div className="w-full p-4 bg-blueGray-100 hover:bg-blueGray-200 rounded-lg flex flex-row items-start justify-between">
                            <div className="w-8 h-8 flex items-center">
                                <img
                                    className="rounded-full shadow-md bg-blueGray-400"
                                    src={r.img}
                                    alt="rating"
                                />
                            </div>
                            <div className="w-full ml-2 flex-col items-start justify-evenly">
                                <div className="w-full h-8 flex flex-row items-center justify-between">
                                    <div className="text-lg">{r.name}</div>
                                    <div className="font-bold">{r.stars}</div>
                                </div>
                                <div className="w-full flex flex-row items-center justify-between">
                                    <div className="text-blueGray-600">
                                        {r.text}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Card
