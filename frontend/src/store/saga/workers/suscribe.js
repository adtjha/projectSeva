import { eventChannel, END } from 'redux-saga'
import { connect_socket, disconnect_socket, set_config, update_current } from 'store/user'
import { roll_dice_res } from 'store/dice'
import { update_arr, update_recieved } from 'store/move'

export const suscribe = (socket) => {
    console.log('suscribe')
    return eventChannel((emit) => {
        console.log('eventChannel')

        socket.on('config_data', (data) => {
            emit(
                set_config({
                    id: data.user.id,
                    game_id: data.id,
                    current: data.current,
                    color: data.user.color,
                })
            )
        })

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

        socket.on('auto_move_resp', ({ color, new_pos, index }) => {
            emit(update_arr({ color, index, new_pos }))
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
