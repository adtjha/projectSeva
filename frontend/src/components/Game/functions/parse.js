const parse = (n) => {
    var rounded = Math.round(n)
    var value = rounded.toString()
    var number = []
    var c = 1
    var num = ''
    const reve = (n) => {
        var str = ''
        for (let i = n.length - 1; i >= 0; i--) {
            if (i === n.length - 1 && n.charAt(i) === ',') {
                continue
            }
            str += n.charAt(i)
        }
        return str
    }

    for (let i = 0; i < value.length; i++) {
        number[i] = value.charAt(i)
    }
    for (let i = number.length - 1; i >= 0; i--) {
        num += number[i]
        if (i === number.length - 3) {
            num += ','
        }
        if (i <= number.length - 4) {
            c++
            if (c % 2 === 0) {
            } else num += ','
        }
    }
    num = reve(num)
    return num
}

export default parse
