import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useEffectOnce } from 'react-use'
import { connect_socket, getGameId } from '../store/user'
import Board from './Game/Board'
import { Choice } from './Choice'

export const Game = ({ user }) => {
    const dispatch = useDispatch()
    const [room, setRoom] = useState('')
    const { channelId } = useParams()

    useEffectOnce(() => {
        console.log(channelId)
    })

    const handleSubmit = () =>
        dispatch(
            connect_socket({
                channelId,
                roomId: room || null,
                userId: user.uid,
            })
        )

    const gameId = useSelector(getGameId)

    return gameId ? (
        <Board userId={user.uid} />
    ) : (
        <React.Fragment>
            {Choice({ user, room, setRoom, handleSubmit })}
        </React.Fragment>
    )
}
