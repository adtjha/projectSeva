import _ from 'lodash'

export default function extractObject(fen) {
    var colorsArr = ['red', 'green', 'yellow', 'blue']
    var colors = {}
    fen.split('/').forEach((e) => {
        const color = colorsArr.find((c) => c.split('')[0] === e.split('')[0])
        colors[color] = e
    })

    _.forIn(colors, (v, k) => {
        colors[k] = v.split(k.split('')[0])
    })

    Object.values(colors).forEach((e) => {
        e.shift()
    })

    Object.values(colors).forEach((e) => {
        e = Object.assign(
            e,
            e.map((p) => parseInt(p))
        )
    })

    console.log(colors)

    _.forIn(colors, (v, k) => {
        colors[k] = v.map((e) => {
            return `${k.split('')[0]}${e}`
        })
    })

    console.log(colors)

    return colors
}
