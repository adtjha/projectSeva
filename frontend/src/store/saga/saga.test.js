import { cloneableGenerator } from '@redux-saga/testing-utils'
import { onRollDice } from './workers/dice'
import SocketMock from 'socket.io-mock'
import { fetch_dice } from 'store/dice'
import { put } from '@redux-saga/core/effects'

test('fetch_dice', (assert) => {
    const socket = new SocketMock()
    const gen = cloneableGenerator(onRollDice)(socket)

    // socket.socketClient.emit('dice_rolled', { face: 1 })

    assert.test('roll dice request', (a) => {
        const clone = gen.clone()
        a.deepEqual(
            clone.next(
                fetch_dice({ gameId: 'abc24', userColor: 'red' }),
                put(fetch_dice({ gameId: 'abc24', userColor: 'red' })),
                'roll dice request resolved'
            )
        )

        a.equal(clone.next().done, false, 'still some steps left')

        a.end()
    })
})
