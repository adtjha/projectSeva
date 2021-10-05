import { auth, signInWithGoogle, logout } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { useHistory } from 'react-router'

const loadingIcon = (
    <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-blueGray-100"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            class="opacity-25"
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
)

const signOut = (
    <button
        type="button"
        class="inline-flex items-center px-4 py-2 ml-2 border border-transparent text-base leading-6 font-medium rounded-md text-blueGray-100 bg-blueGray-600 hover:bg-blueGray-500 focus:border-rose-700 active:bg-blueGray-700 transition ease-in-out duration-150"
        disabled=""
        onClick={logout}
    >
        Sign Out
    </button>
)

const signIn = (
    <button
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-blueGray-100 bg-blueGray-600 hover:bg-blueGray-500 focus:border-rose-700 active:bg-blueGray-700 transition ease-in-out duration-150"
        disabled=""
        onClick={signInWithGoogle}
    >
        Sign In With Google
    </button>
)

const LandingPage = () => {
    const [user, loading, error] = useAuthState(auth)
    const history = useHistory()

    console.log({user, loading, error})

    useEffect(() => {
        if (loading) {
            return
        }
        if (user) history.replace('/game')
    }, [user, loading, history])

    return (
        <section class="text-blueGray-600 body-font">
            <div class="container h-screen mx-auto flex px-5 py-14 items-center justify-center flex-col">
                <div class="text-center lg:w-2/3 w-full">
                    <h1 class="title-font text-6xl mb-4 font-bold text-blueGray-900">
                        Fundraising made fun.
                    </h1>
                    <p class="mb-8 leading-relaxed tracking-normal capitalize">
                        Meet random people, buy-in table, play ludo to win house
                        money to bankroll your cause.
                    </p>
                    <div class="flex justify-center">
                        {user ? (
                            loading ? (
                                <button
                                    type="button"
                                    class="inline-flex items-center px-4 py-2 ml-2 border border-transparent text-base leading-6 font-medium rounded-md text-blueGray-100 bg-blueGray-600 hover:bg-blueGray-500 focus:border-rose-700 active:bg-blueGray-700 transition ease-in-out duration-150 cursor-not-allowed"
                                    disabled=""
                                >
                                    {loadingIcon} Signing In
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-blueGray-100 bg-blueGray-600 hover:bg-blueGray-500 focus:border-rose-700 active:bg-blueGray-700 transition ease-in-out duration-150"
                                        disabled=""
                                    >
                                        Hi! {user.email}
                                    </button>
                                    {signOut}
                                </>
                            )
                        ) : (
                            signIn
                        )}
                        {error ? (
                            <button
                                type="button"
                                class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-blueGray-100 bg-blueGray-600 hover:bg-blueGray-500 focus:border-rose-700 active:bg-blueGray-700 transition ease-in-out duration-150 cursor-not-allowed"
                                disabled=""
                            >
                                Unable to Sign In
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LandingPage
