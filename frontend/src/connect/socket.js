import socketio from 'socket.io-client'
import Constants from '../Constants'
import React from 'react'

export const socket = socketio.connect(Constants.BASE_API)
export const SocketContext = React.createContext()
