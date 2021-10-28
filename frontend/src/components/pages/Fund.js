import { motion } from 'framer-motion'
import parse from '../Game/functions/parse'

const data = {
    balance: '6557',
    book: [
        {
            date: '02/12/21',
            amt: '450',
            type: 'deposit',
        },
        {
            date: '04/12/21',
            amt: '100',
            type: 'deposit',
        },
        {
            date: '06/12/21',
            amt: '450',
            type: 'deposit',
        },
        {
            date: '08/12/21',
            amt: '500',
            type: 'bank transfer',
        },
    ],
}

const Fund = () => {
    return (
        <div className="w-full h-full flex flex-wrap md:flex-nowrap md:flex-row items-center md:items-start justify-center md:justify-start">
            <div className="w-1/2  m-4 py-4 bg-white shadow-md rounded-lg flex flex-col items-center justify-evenly">
                <div className="mb-4 text-3xl font-bold text-blueGray-300 uppercase">
                    funds
                </div>

                <div className="relative py-4 text-6xl font-black text-blueGray-800 flex items-center font-mono">
                    <span className="-ml-8 mr-4 text-2xl font-normal text-blueGray-700">
                        ₹
                    </span>
                    {parse(data.balance)}
                </div>
                <div className="md:w-full flex flex-col md:flex-row items-center justify-evenly">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-blueGray-600 text-white m-1 py-2 px-6 rounded-md shadow-md text-center uppercase"
                    >
                        + add money
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-blueGray-600 text-white m-1 py-2 px-6 rounded-md shadow-md text-center uppercase"
                    >
                        - transfer to bank
                    </motion.button>
                </div>
            </div>
            <div className="w-1/2  m-4 py-4 bg-white shadow-md rounded-lg flex flex-col items-center justify-evenly">
                <div className="mb-4 text-3xl font-bold text-blueGray-300 uppercase">
                    History
                </div>
                <table className="w-full table-fixed">
                    <thead>
                        <tr>
                            <th className="w-1/4 border-r border-b border-blueGray-300 px-4 py-2 text-blueGray-600 capitalize">
                                date
                            </th>
                            <th className="w-1/2 border-r border-b border-blueGray-300 px-4 py-2 text-blueGray-600 capitalize">
                                type
                            </th>
                            <th className="w-1/4 border-b border-blueGray-300 px-4 py-2 text-blueGray-600 capitalize">
                                amount
                            </th>
                        </tr>
                    </thead>
                    <tbody> 
                        {data.book.map((e) => (
                            <tr>
                                <td className="px-4 py-2 border-r border-blueGray-300 text-blueGray-600 text-center font-medium font-mono">
                                    {e.date}
                                </td>
                                <td className="px-4 py-2 border-r border-blueGray-300 text-blueGray-600 font-medium font-mono uppercase">
                                    {e.type}
                                </td>
                                <td className="px-4 py-2 text-blueGray-600 text-center font-medium font-mono">
                                    ₹ {e.amt}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Fund
