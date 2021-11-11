import { eventChannel, END } from 'redux-saga'
import { game_end, update_current } from '../../user'
import { roll_dice_res } from '../../dice'
import { update_recieved } from '../../move'

export const suscribe = (socket) => {
    console.log('suscribe')
    return eventChannel((emit) => {
        console.log('eventChannel')

        socket.on('dice_rolled', ({ face }) => {
            console.info('dice rolled socket signal')
            emit(roll_dice_res({ face }))
        })

        socket.on('update_current', ({ current }) => {
            emit(update_current({ current }))
        })

        socket.on('piece_moved', (data) => {
            console.info('piece move socket signal')
            emit(update_recieved({ ...data }))
        })

        socket.on('game_end', (data) => {
            emit(game_end({ ...data }))
        })

        socket.on('alert', (data) => {
            emit()
        })

        // socket.on('disconnect', (reason) => {
        //     console.log(`Socket disconnected because: ${reason}`)
        //     emit(disconnect_socket())
        // })

        return () => {
            emit(END)
        }
    })
}
