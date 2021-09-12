import { eventChannel, END } from 'redux-saga'
import { disconnect_socket, set_config, update_current } from 'store/user'
import { roll_dice_res } from 'store/dice'
import { update_recieved } from 'store/move'

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

        socket.on(
            'piece_moved',
            ({ color, posArr, new_pos, index, pieceId }) => {
                console.info('piece move socket signal')
                emit(
                    update_recieved({ color, posArr, new_pos, index, pieceId })
                )
            }
        )

        socket.on('disconnect', (reason) => {
            console.log(`Socket disconnected because: ${reason}`)
            emit(disconnect_socket())
        })

        return () => {
            emit(END)
        }
    })
}
