import React from 'react'

export const Choice = ({ user, room, setRoom, handleSubmit }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-5/6 h-16 items-center justify-center my-4 mx-auto flex flex-row">
                <div className="flex flex-col mr-2 items-center text-center text-blueGray-800">
                    <div
                        className="text-xs font-normal opacity-80"
                        style={{ letterSpacing: '0.25em' }}
                    >
                        Channel
                    </div>
                    <div className="text-lg font-bold ">
                        72nWEeqmyKRtZjyotl4f
                    </div>
                </div>
            </div>
            <div className="w-full md:w-100 h-full flex flex-wrap items-center justify-center p-4 rounded-2xl border-2 border-dashed border-blueGray-400 ">
                <div className="w-full h-full mb-4 p-4 flex flex-col shadow-md hover:shadow-lg rounded-2xl bg-white border-2 border-blueGray-50">
                    <h1 className="font-semibold m-auto py-4">
                        Type Room ID below 👇
                    </h1>
                    <div className="w-full flex flex-col">
                        <input
                            className="mx-6 p-2 text-center rounded-2xl border-2 border-blueGray-400"
                            placeholder="anNik"
                            onChange={(e) => setRoom(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="my-6 mx-auto bg-blueGray-800 text-blueGray-200 py-2 px-4 rounded-md"
                            onClick={handleSubmit}
                        >
                            Join Room
                        </button>
                    </div>
                </div>
                <div className="w-full text-center p-4 text-4xl font-mono opacity-20">
                    - OR -
                </div>
                <div className="w-full h-full p-4 flex flex-col">
                    <button
                        type="submit"
                        className="m-auto bg-blueGray-800 text-blueGray-200 py-2 px-4 rounded-md"
                        onClick={handleSubmit}
                    >
                        Play Random
                    </button>
                </div>
            </div>
        </div>
    )
}
