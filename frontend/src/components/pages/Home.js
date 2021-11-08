import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import { collection } from '@firebase/firestore';
import { db } from '../../firebase';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { useState } from 'react';
import { useWindowScroll } from 'react-use';
import { Loading } from '../Loading';
import { Card } from "./Card";

export const Home = () => {
    const { x, y } = useWindowScroll();
    const query = collection(db, 'channel');
    const [channels, loading, error] = useCollectionOnce(query);
    const [selected, setSelected] = useState(null);

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
                                <div className="relative w-full h-full flex flex-col flex-wrap md:flex-row justify-around items-center p-4">
                                    {channels.docs.map((doc) => (
                                        <Card
                                            data={doc.data()}
                                            id={doc.id}
                                            isSelected={selected === doc.id}
                                            setSelected={setSelected} />
                                    ))}
                                    {console.log(channels)}
                                </div>
                            </AnimateSharedLayout>
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className={(y < 240 ? 'hidden' : 'fixed') +
                                    ' bottom-8 right-8 w-12 h-12 p-2 rounded-full shadow-lg bg-blueGray-800 flex items-center justify-center cursor-pointer'}
                                onClick={() => window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth',
                                })}
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
                                        d="M7 11l5-5m0 0l5 5m-5-5v12" />
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
    );
};


/**
 * GoTo URL : https://www.dedo.com/game?channel=72nWEeqmyKRtZjyotl4f&room=a2zf0
 * 
 * channel = 72nWEeqmyKRtZjyotl4f
 * room = a2zf0
 */