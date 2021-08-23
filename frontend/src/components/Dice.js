import { Transition } from '@headlessui/react'
import { Fragment, useCallback, useContext, useEffect, useRef } from 'react'
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
import { SocketContext } from '../connect/socket'
import { getColor, getGameCurrentPlayer, getGameId } from 'store/user'
import { useLogger } from 'react-use'

const Dice = (props) => {
    let isShowing = useSelector(getShowing)
    let hasRolled = useSelector(rolled)
    const mounted = useRef(true)

    const socket = useRef(useContext(SocketContext))
    const gameId = useSelector(getGameId)
    const userColor = useSelector(getColor)
    const currentColor = useSelector(getGameCurrentPlayer)
    const isChance = userColor === currentColor

    const srcList = [one, two, three, four, five, six]

    const dispatch = useDispatch()

    const handleClick = useCallback(() => {
        if (!hasRolled && isChance) {
            socket.current.emit('roll_dice', { gameId })
            dispatch(set_rolled(true))
        } else {
            console.log(
                'PLAY MOVE, DICE ROLLED ONCE',
                { hasRolled },
                { isChance }
            )
        }
    }, [hasRolled, socket, gameId, dispatch, isChance])

    useEffect(() => {
        socket.current.on('dice_rolled', ({ face, noPieceOut }) => {
            if (mounted.current) {
                dispatch(set_showing(false))
                console.log('------------------------YAY-------------------')
                if (noPieceOut && face !== 6) {
                    dispatch(set_rolled(false))
                    socket.current.emit('change', { game_id: gameId })
                }
                setTimeout(() => {
                    dispatch(set_dice(face))
                    dispatch(set_showing(true))
                }, 500)
            }
        })

        return () => {
            mounted.current = false
            console.log('why here')
        }
    }, [dispatch, gameId])

    useLogger('Dice', props, mounted)

    return (
        <div className="w-min mx-auto my-8 p-2">
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
    )
}

export default Dice
