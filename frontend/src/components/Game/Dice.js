import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import one from '../../images/dice/1.svg'
import two from '../../images/dice/2.svg'
import three from '../../images/dice/3.svg'
import four from '../../images/dice/4.svg'
import five from '../../images/dice/5.svg'
import six from '../../images/dice/6.svg'
import { fetch_dice, getShowing, rolled } from '../../store/dice'
import { getColor, getGameCurrentPlayer, getGameId } from '../../store/user'

const Dice = (props) => {
    let isShowing = useSelector(getShowing)
    let hasRolled = useSelector(rolled)

    const gameId = useSelector(getGameId)
    const userColor = useSelector(getColor)
    const currentColor = useSelector(getGameCurrentPlayer)
    const isChance = userColor === currentColor

    const srcList = [one, two, three, four, five, six]

    const dispatch = useDispatch()

    const handleClick = () => {
        if (!hasRolled && isChance) {
            dispatch(fetch_dice({ gameId, userColor }))
        } else if (isChance) {
            console.log(
                'PLAY MOVE, DICE ROLLED ONCE',
                { hasRolled },
                { isChance }
            )
        } else {
            console.log('Not Your Chance', { isChance })
        }
    }

    // useLogger(
    //     'Dice',
    //     rendersCount,
    //     { isShowing },
    //     { hasRolled },
    //     { isChance },
    //     props.num
    // )

    return (
        <div className="w-16 h-16 mx-auto my-8 lg:my-auto">
            <Transition
                as={Fragment}
                show={isShowing}
                enter="transform transition duration-500"
                enterFrom="opacity-0 -rotate-360 scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-500 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 scale-95 "
            >
                <div
                    className="w-16 h-16 font-mono text-4xl m-auto text-center p-0 text-gray-400"
                    onClick={handleClick}
                >
                    <img src={srcList[props.num - 1]} alt={props.num}></img>
                </div>
            </Transition>
         </div>
    )
}

export default Dice
