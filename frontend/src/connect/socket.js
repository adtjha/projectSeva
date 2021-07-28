import socketio from 'socket.io-client'
import Constants from '../components/Constants'
import React from 'react'

export const socket = socketio.connect(Constants.BASE_API)
export const SocketContext = React.createContext()
