import { collection, query, where } from '@firebase/firestore'
import { db } from '../firebase'
import React, { useState } from 'react'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useEffectOnce } from 'react-use'
import { connect_socket, getGameId } from '../store/user'
import Board from './Game/Board'
import { guid } from './Game/functions/guid'
import { Choice } from './Choice'

export const Game = ({ user }) => {
    const dispatch = useDispatch()
    const [room, setRoom] = useState('')
    const [values, loading, error] = useCollectionDataOnce(
        query(collection(db, 'users'), where('email', '==', user.email))
    )
    const { id } = useParams()

    useEffectOnce(() => {
        console.log(id)
        if (id !== undefined) {
            dispatch(connect_socket(id))
        } else {
            const uid = guid()
            setRoom(uid)
        }
        if (values) {
            console.log(values)
        } else {
            error ? console.error(error) : console.log(loading)
        }
    })

    const handleSubmit = () => dispatch(connect_socket(room))

    const gameId = useSelector(getGameId)

    return gameId ? (
        <Board />
    ) : (
        <React.Fragment>
            {Choice({ values, room, setRoom, handleSubmit })}
        </React.Fragment>
    )
}


