import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import one from '../images/dice/1.svg'
import two from '../images/dice/2.svg'
import three from '../images/dice/3.svg'
import four from '../images/dice/4.svg'
import five from '../images/dice/5.svg'
import six from '../images/dice/6.svg'
import {
    getShowing,
    rolled,
    set_dice,
    set_rolled,
    set_showing,
} from '../store/dice'

const Dice = (props) => {
    let isShowing = useSelector(getShowing)
    let hasRolled = useSelector(rolled)

    const srcList = [one, two, three, four, five, six]

    const dispatch = useDispatch()

    const handleClick = () => {
        if (!hasRolled) {
            dispatch(set_showing(false))
            setTimeout(() => {
                dispatch(set_dice())
                dispatch(set_rolled(true))
                dispatch(set_showing(true))
            }, 500)
        } else {
            console.log('PLAY MOVE, DICE ROLLED ONCE', hasRolled)
        }
    }

    return (
        <div className="flex flex-col items-center py-8">
            <div className="w-32 h-32">
                <Transition
                    as={Fragment}
                    show={isShowing}
                    enter="transform transition duration-300"
                    enterFrom="opacity-0 -rotate-180 scale-50"
                    enterTo="opacity-100 rotate-0 scale-100"
                    leave="transform duration-200 transition ease-in-out"
                    leaveFrom="opacity-100 rotate-0 scale-100 "
                    leaveTo="opacity-0 scale-95 "
                >
                    <div
                        className="w-16 font-mono text-4xl m-auto text-center p-0 text-gray-400"
                        onClick={handleClick}
                    >
                        <img src={srcList[props.num - 1]} alt={props.num}></img>
                    </div>
                </Transition>
            </div>
        </div>
    )
}

export default Dice
