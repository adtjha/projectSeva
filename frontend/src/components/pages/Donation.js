import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import image from '../../images/logo/android-chrome-512x512.png'

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

const donationsList = [
    {
        photoURL: 'https://fakeimg.pl/192x192/',
        name: 'Feeding From Far-Ration Distribution Amid Lockdown',
        amountDonated: '500',
        playedOn: '19-10-2021',
        rating: '4.3',
    },
    {
        photoURL: 'https://fakeimg.pl/192x192/',
        name: 'My Little Boy’s Cancer Has Relapsed Twice But I’m Helpless. Please Save Him',
        amountDonated: '250',
        playedOn: '27-12-2021',
        rating: '4',
    },
    {
        photoURL: 'https://fakeimg.pl/192x192/',
        name: '24x7 Ambulance Network For COVID19 Patients And Healthcare Systems',
        amountDonated: '400',
        playedOn: '09-12-2021',
        rating: '3.3',
    },
    {
        photoURL: 'https://fakeimg.pl/192x192/',
        name: 'Father-kidney transplant and son-bone marrow transplant. Please help save the family.',
        amountDonated: '800',
        playedOn: '22-12-2021',
        rating: '4',
    },
]

const Donation = () => {
    const [user, loading, error] = useAuthState(auth)
    console.log(user, loading, error)
    return error ? (
        <div>error</div>
    ) : loading ? (
        <Loading />
    ) : (
        <div>
            <div className="w-screen flex justify-between items-center py-4 px-8">
                <img className="h-8 w-8 mr-4" src={image} alt="logo" />
                <h1 className="text-4xl font-bold text-blueGray-600">
                    Donations
                </h1>
                <img
                    className="w-12 h-12 rounded-full border shadow-lg"
                    src={user.photoURL}
                    alt="user"
                />
            </div>
            <div className="w-screen h-max flex flex-col md:flex-row lg:flex-row justify-around items-center py-4 px-8">
                {donationsList.map((d) => (
                    <div className="h-auto w-84 p-4 m-2 bg-blueGray-50 rounded-2xl shadow-xl flex flex-col items-center justify-center">
                        <div className="w-full flex flex-row justify-start items-center mb-1">
                            <img
                                src={`${d.photoURL}`}
                                className="h-8 w-8 rounded-lg mr-2"
                                alt={`${d.photoURL}`}
                            />
                            <h1 className="">{`${d.name.slice(0, 28)}...`}</h1>
                        </div>
                        <div className="w-full flex flex-row justify-between items-center mb-1">
                            <h4 className="text-blueGray-500">
                                Donation Date :{' '}
                                <span className="text-blueGray-800">
                                    {d.playedOn}
                                </span>
                            </h4>
                            <h4 className="font-bold">{d.amountDonated}</h4>
                        </div>
                        <div className="w-full flex flex-row items-center justify-between">
                            <div className="w-max flex flex-row items-center justify-start">
                                <h1 className="text-blueGray-500">
                                    Rating :{' '}
                                    <span className="text-blueGray-800">
                                        {d.rating}
                                    </span>
                                </h1>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <div className="flex flex-row items-center text-blueGray-500 bg-blueGray-100 hover:bg-blueGray-200 px-2 rounded-lg cursor-pointer">
                                more{' '}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Donation
