import { ExclamationCircleIcon } from '@heroicons/react/solid'

export const ErrorPage = ({ error }) => {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-red-50">
            <div className="w-full md:w-3/5 flex flex-row items-center justify-evenly">
                <div className="flex flex-row items-center justify-start">
                    <ExclamationCircleIcon className="w-6 h-6 text-red-400 mr-2" />
                    <h1 className="text-red-800 text-lg md:text-xl tracking-wider">
                        Error
                    </h1>
                </div>
            </div>
            <div className="w-full md:w-3/5 flex flex-col items-center justify-evenly mt-4">
                <div className="w-3/5 flex flex-col items-center justify-start">
                    <div className="font-bold text-red-600 text-xl md:text-2xl uppercase">
                        {error.title}
                    </div>
                    <div className="text-red-400 text-base md:text-lg p-4 md:p-8">
                        {error.message}
                    </div>
                </div>
            </div>
        </div>
    )
}
