import Constants from '../../../Constants'
import create2Darray from './create2Darray'
import extractObject from './extractObject'

describe('Functions Testing', () => {
    test('should return a 2DArray', () => {
        expect(true).toBe(true)
        const returnValue = create2Darray({
            red: [1, 1, 1, 1],
            green: [1, 1, 1, 1],
            yellow: [1, 1, 1, 1],
            blue: [1, 1, 1, 1],
            dice: 1,
        })

        expect(returnValue.length).toBe(169)
    })

    test('extract to object', () => {
        const fen = 'r0r0r0r0/g0g0g0g0/y0y0y0y0/b0b0b0b0 r 4'
        const returnValue = extractObject(fen)

        expect(returnValue).toEqual(
            expect.objectContaining({
                red: expect.any(Array),
                green: expect.any(Array),
                yellow: expect.any(Array),
                blue: expect.any(Array),
                currentPlayer: expect.any(String),
            })
        )
    })
})
