import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import image from '../../images/logo/android-chrome-512x512.png'
import { ReactComponent as GoogleIcon } from '../../images/icons/google.svg'
import { ReactComponent as XIcon } from '../../images/icons/x.svg'
import { signInWithGoogle } from '../../firebase'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const UserId = ({ isPhone, setIsPhone, phone, setPhone, email, setEmail }) => {
    return isPhone ? (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="phone"
                layoutId="userId"
                layout
                className="relative mx-auto mt-2 flex flex-col content-around items-stretch"
            >
                <div>
                    <label
                        htmlFor="phone"
                        className="text-blueGray-400 text-base"
                    >
                        phone
                    </label>
                    <input
                        className="rounded-lg border-transparent flex-1 appearance-none border border-blueGray-300 w-full py-2 px-4 bg-white text-blueGray-700 placeholder-blueGray-400 shadow-sm text-2xl focus:outline-none focus:ring-2 focus:ring-blueGray-900 focus:border-transparent"
                        id="phone"
                        name="phone"
                        placeholder="xxxx-xxx-xxx"
                        type="text"
                        pattern="^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <span
                    onClick={() => setIsPhone(!isPhone)}
                    className="text-right text-blueGray-400 text-base hover:underline cursor-pointer"
                >
                    use email instead?
                </span>
            </motion.div>
        </>
    ) : (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="email"
                layoutId="userId"
                className="relative mx-auto mt-2 flex flex-col content-around items-stretch"
            >
                <div>
                    <label
                        htmlFor="email"
                        className="text-blueGray-400 text-base"
                    >
                        email
                    </label>
                    <input
                        className="rounded-lg border-transparent flex-1 appearance-none border border-blueGray-300 w-full py-2 px-4 bg-white text-blueGray-700 placeholder-blueGray-400 shadow-sm text-2xl focus:outline-none focus:ring-2 focus:ring-blueGray-900 focus:border-transparent"
                        id="email"
                        name="email"
                        placeholder="abc@xyz.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <span
                    onClick={() => setIsPhone(!isPhone)}
                    className="text-right text-blueGray-400 text-base hover:underline cursor-pointer"
                >
                    use phone instead?
                </span>
            </motion.div>
        </>
    )
}

const LoginForm = ({ open, setOpen, layout_id }) => {
    const [email, setEmail] = useState('stuart@little.com')
    const [phone, setPhone] = useState('9156518821')
    const [isPhone, setIsPhone] = useState(false)
    const [pass, setPass] = useState('hemeshe')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
    }
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layout
            layoutId="form"
        >
            <form autoComplete="on" onSubmit={handleSubmit}>
                <div
                    onClick={() => setOpen(!open)}
                    className="relative mx-auto mr-0 mt-0 w-min text-blueGray-400 cursor-pointer hover:text-blueGray-600"
                >
                    <XIcon />
                </div>
                <UserId
                    isPhone={isPhone}
                    setIsPhone={setIsPhone}
                    phone={phone}
                    setPhone={setPhone}
                    email={email}
                    setEmail={setEmail}
                />
                <div className="relative mx-auto mt-2 flex flex-col content-around items-stretch">
                    <label
                        htmlFor="password"
                        className="text-blueGray-400 text-base "
                    >
                        password
                    </label>
                    <input
                        className="rounded-lg border-transparent flex-1 appearance-none border border-blueGray-300 w-full py-2 px-4 bg-white text-blueGray-700 placeholder-blueGray-400 shadow-sm text-2xl focus:outline-none focus:ring-2 focus:ring-blueGray-900 focus:border-transparent"
                        type="password"
                        placeholder="******"
                        id="password"
                        name="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <a
                        href={'/'}
                        className="text-right text-blueGray-400 text-base hover:underline"
                    >
                        forgot password?
                    </a>
                </div>
                <div className="relative w-min mx-auto mt-8">
                    <input
                        type="submit"
                        value="Login"
                        className="py-2 px-8 bg-blueGray-600 hover:bg-blueGray-700 focus:ring-blueGray-500 focus:ring-offset-blueGray-200 text-blueGray-100 w-full transition ease-in duration-200 text-center text-xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    ></input>
                </div>
            </form>
        </motion.div>
    )
}

const Login = () => {
    const [open, setOpen] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()

    const login = () => {
        signInWithGoogle()
            .then((user) => {
                dispatch(login({...user}))
                history.replace('/')
            })
            .catch((e) => alert(e))
    }

    return (
        <div className="h-screen w-screen lg:grid lg:grid-flow-row lg:grid-cols-2 lg:grid-rows-1">
            <Link to="/" className="hidden h-screen w-full lg:flex">
                <motion.div
                    whileHover={{
                        scale: 1.2,
                        rotate: 90,
                        cursor: 'pointer',
                    }}
                    whileTap={{
                        scale: 0.8,
                        rotate: 0,
                        borderRadius: '100%',
                        transitionDuration: '300ms',
                    }}
                    className="w-max m-auto p-6 rounded-2xl shadow-lg flex flex-row items-center bg-blueGray-200"
                >
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-24 w-24 mr-4"
                        src={image}
                        alt="logo"
                    />
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-8xl font-bold text-blueGray-600"
                    >
                        dedo
                    </motion.h1>
                </motion.div>
            </Link>
            <div className="bg-blueGray-50 w-full h-full flex flex-col flex-wrap justify-center items-center m-auto">
                <div className="p-4">
                    <h1 className="text-center font-bold text-6xl tracking-wide text-blueGray-400">
                        Sign in
                    </h1>
                </div>
                <AnimatePresence initial={false}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-84 h-auto bg-white shadow-xl rounded-2xl p-8"
                    >
                        {open ? (
                            <LoginForm open={open} setOpen={setOpen} />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                layout
                                layoutId="form"
                            >
                                <motion.button
                                    layout
                                    whileTap={{ scale: 0.98 }}
                                    className="disabled:opacity-50 relative hover:bg-blueGray-100 mx-auto my-4 rounded-lg border-transparent flex flex-row items-center justify-center appearance-none border border-blueGray-300 hover:border-blueGray-600 cursor-pointer w-full py-2 px-4 bg-white text-blueGray-700 hover:shadow-sm text-base text-center"
                                    onClick={login}
                                >
                                    <div className="w-6 h-6 mr-2">
                                        <GoogleIcon />
                                    </div>
                                    <span className="">
                                        Sign in with Google
                                    </span>
                                </motion.button>
                                <motion.button
                                    disabled
                                    layout
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setOpen(!open)}
                                    className="disabled:opacity-50 relative hover:bg-blueGray-100 mx-auto my-4 rounded-lg border-transparent flex flex-row items-center justify-center appearance-none border border-blueGray-300 hover:border-blueGray-600 cursor-pointer w-full py-2 px-4 bg-white text-blueGray-700 hover:shadow-sm text-base text-center"
                                >
                                    <span className="">
                                        Sign in with phone or email
                                    </span>
                                </motion.button>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
                <div className="-mb-8 p-8">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-blueGray-400 lg:text-base text-lg"
                    >
                        Don't have an account yet?{' '}
                        <motion.a
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="font-semibold hover:underline"
                        >
                            <Link to="/signup">Sign Up</Link>
                        </motion.a>
                    </motion.h1>
                </div>
            </div>
        </div>
    )
}

export default Login
