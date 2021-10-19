import { motion } from 'framer-motion'
import { useState } from 'react'
import image from '../../images/logo/android-chrome-512x512.png'
import { ReactComponent as GoogleIcon } from '../../images/icons/google.svg'
import { ReactComponent as XIcon } from '../../images/icons/x.svg'

const SignUpForm = ({ open, setOpen }) => {
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
        >
            <form autoComplete="on" onSubmit={handleSubmit}>
                <div
                    onClick={() => setOpen(!open)}
                    className="relative mx-auto mr-0 my-4 mt-0 w-min text-blueGray-400 cursor-pointer hover:text-blueGray-600"
                >
                    <XIcon />
                </div>
                {isPhone ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative mx-auto my-4 flex flex-col content-around items-stretch"
                    >
                        <motion.div>
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
                        </motion.div>
                        <span
                            onClick={() => setIsPhone(!isPhone)}
                            className="text-right text-blueGray-400 text-base hover:underline cursor-pointer"
                        >
                            use email instead?
                        </span>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative mx-auto my-4 flex flex-col content-around items-stretch"
                    >
                        <motion.div>
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
                        </motion.div>
                        <span
                            onClick={() => setIsPhone(!isPhone)}
                            className="text-right text-blueGray-400 text-base hover:underline cursor-pointer"
                        >
                            use phone instead?
                        </span>
                    </motion.div>
                )}
                <div className="relative mx-auto my-4 flex flex-col content-around items-stretch">
                    <label
                        htmlFor="password"
                        className="text-blueGray-400 text-base "
                    >
                        new password
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
                </div>
                <div className="relative w-min mx-auto my-4 mt-8">
                    <input
                        type="submit"
                        value="Login"
                        className="cursor-pointer py-2 px-8 bg-blueGray-600 hover:bg-blueGray-700 focus:ring-blueGray-500 focus:ring-offset-blueGray-200 text-blueGray-100 w-full transition ease-in duration-200 text-center text-xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    ></input>
                </div>
            </form>
        </motion.div>
    )
}

const Signup = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className="h-screen w-screen lg:grid lg:grid-flow-row lg:grid-cols-2 lg:grid-rows-1">
            <div className="hidden h-screen w-full lg:flex">
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
            </div>
            <div className="bg-blueGray-50 w-full h-full flex flex-col flex-wrap justify-center items-center m-auto">
                <div className="p-4">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center font-bold text-6xl tracking-wide text-blueGray-400"
                    >
                        Sign up
                    </motion.h1>
                </div>
                <div className="w-84 h-auto bg-white shadow-xl rounded-2xl p-8">
                    {open ? (
                        <SignUpForm open={open} setOpen={setOpen} />
                    ) : (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative hover:bg-blueGray-100 mx-auto my-4 rounded-lg border-transparent flex flex-row items-center justify-center appearance-none border border-blueGray-300 hover:border-blueGray-600 cursor-pointer w-full py-2 px-4 bg-white text-blueGray-700 hover:shadow-sm text-base text-center"
                            >
                                <div className="w-6 h-6 mr-2">
                                    <GoogleIcon />
                                </div>
                                <span className="">Sign up with Google</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setOpen(!open)}
                                className="relative hover:bg-blueGray-100 mx-auto my-4 rounded-lg border-transparent flex flex-row items-center justify-center appearance-none border border-blueGray-300 hover:border-blueGray-600 cursor-pointer w-full py-2 px-4 bg-white text-blueGray-700 hover:shadow-sm text-base text-center"
                            >
                                <span className="">
                                    Sign up with phone or email
                                </span>
                            </motion.div>
                        </>
                    )}
                </div>
                <div className="-mb-8 p-8">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-blueGray-400 lg:text-base text-lg"
                    >
                        Have an account already?{' '}
                        <motion.a
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            href={'/login'}
                            className="font-semibold hover:underline"
                        >
                            Sign in
                        </motion.a>
                    </motion.h1>
                </div>
            </div>
        </div>
    )
}

export default Signup
