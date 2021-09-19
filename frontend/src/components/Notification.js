import React, { useEffect, useState } from 'react'

export const Notification = (props) => {
    const [show, setShow] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 3000);
    });

    return (
        <>
            {show ? (
                <div
                    className="absolute z-20 left-2 right-2 ml-auto mr-auto top-2 h-16 p-4 flex flex-row  border-2 rounded-2xl shadow-lg bg-white animate-dropdown"
                    style={{ width: 'fit-content', blockSize: 'fit-content' }}
                >
                    <div className="pr-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div className="font-bold">{props.message}</div>
                    <div
                        className="pl-2"
                        onClick={() => {
                            setShow(false)
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    )
}
