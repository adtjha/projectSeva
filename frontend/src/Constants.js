// const BASE_API = 'https://morning-plains-74021.herokuapp.com'
const BASE_API = 'https://04a0-117-203-183-218.ngrok.io'
const WEB_APP_URL = BASE_API

const path = 6,
    safe = 5,
    red = {
        id: 1,
        begin: 11,
        final: 12,
        end: 13,
        arrow: 14,
    },
    green = {
        id: 2,
        begin: 21,
        final: 22,
        end: 23,
        arrow: 24,
    },
    yellow = {
        id: 3,
        begin: 31,
        final: 32,
        end: 33,
        arrow: 34,
    },
    blue = {
        id: 4,
        begin: 41,
        final: 42,
        end: 43,
        arrow: 44,
    }

const colorNames = {
    r: 'red',
    g: 'green',
    y: 'yellow',
    b: 'blue',
}

// prettier-ignore
const DEFAULT_BOARD_LAYOUT = [
  '0',  '0', '0',  '0', '0', '0', '6', '6', '6', '0', '0',  '0', '0',  '0', '0',
  '0',  '0', '0',  '0', '0', '0', '6', '2', '2', '0', '0',  '0', '0',  '0', '0',
  '0',  '0', '0',  '0', '0', '0', '5', '2', '6', '0', '0',  '0', '0',  '0', '0',
  '0',  '0', '0',  '0', '0', '0', '6', '2', '6', '0', '0',  '0', '0',  '0', '0',
  '0',  '0', '0',  '0', '0', '0', '6', '2', '6', '0', '0',  '0', '0',  '0', '0',
  '0',  '0', '0',  '0', '0', '0', '6', '2', '6', '0', '0',  '0', '0',  '0', '0',
  '6',  '1', '6',  '6', '6', '6', '0', '2', '0', '6', '6',  '6', '5',  '6', '6',
  '6',  '1', '1',  '1', '1', '1', '1', '0', '4', '4', '4',  '4', '4',  '4', '6',
  '6',  '6', '5',  '6', '6', '6', '0', '3', '0', '6', '6',  '6', '6',  '4', '6',
  '0',  '0', '0',  '0', '0', '0', '6', '3', '6', '0', '0',  '0', '0',  '0', '0',
  '0',  '0', '0',  '0', '0', '0', '6', '3', '6', '0', '0',  '0', '0',  '0', '0',
  '0',  '0', '0',  '0', '0', '0', '6', '3', '6', '0', '0',  '0', '0',  '0', '0',
  '0',  '0', '0',  '0', '0', '0', '6', '3', '5', '0', '0',  '0', '0',  '0', '0',
  '0',  '0', '0',  '0', '0', '0', '3', '3', '6', '0', '0',  '0', '0',  '0', '0',
  '0',  '0', '0',  '0', '0', '0', '6', '6', '6', '0', '0',  '0', '0',  '0', '0',
]

/*
  0 -> null | 1 -> red 
*/
// prettier-ignore
const DEFAULT_CELL_LAYOUT = [
   '0',  '0',  '0',  '0',  '0',  '0',  '6',  '6',  '6',  '0',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '0',  '6', '22', '21',  '0',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '0',  '5', '22',  '6',  '0',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '0',  '6', '22',  '6',  '0',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '0',  '6', '22',  '6',  '0',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '0',  '6', '22',  '6',  '0',  '0',  '0',  '0',  '0', '0',
   '6', '11',  '6',  '6',  '6',  '6', '14', '23', '24',  '6',  '6',  '6',  '5',  '6', '6',
   '6', '12', '12', '12', '12', '12', '13',  '0', '43', '42', '42', '42', '42', '42', '6',
   '6',  '6',  '5',  '6',  '6',  '6', '34', '33', '44',  '6',  '6',  '6',  '6', '41', '6',
   '0',  '0',  '0',  '0',  '0',  '0',  '6', '32',  '6',  '0',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '0',  '6', '32',  '6',  '0',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '0',  '6', '32',  '6',  '0',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '0',  '6', '32',  '5',  '0',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '0', '31', '32',  '6',  '0',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '0',  '6',  '6',  '6',  '0',  '0',  '0',  '0',  '0', '0',
]

// prettier-ignore
const LOCATION_BOARD_LAYOUT =  [
  'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj', 'ak', 'al', 'am', 'an', 'ao',
  'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bk', 'bl', 'bm', 'bn', 'bo',
  'ca', 'cb', 'cc', 'cd', 'ce', 'cf', 'cg', 'ch', 'ci', 'cj', 'ck', 'cl', 'cm', 'cn', 'co',
  'da', 'db', 'dc', 'dd', 'de', 'df', 'dg', 'dh', 'di', 'dj', 'dk', 'dl', 'dm', 'dn', 'do',
  'ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'eg', 'eh', 'ei', 'ej', 'ek', 'el', 'em', 'en', 'eo',
  'fa', 'fb', 'fc', 'fd', 'fe', 'ff', 'fg', 'fh', 'fi', 'fj', 'fk', 'fl', 'fm', 'fn', 'fo',
  'ga', 'gb', 'gc', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gj', 'gk', 'gl', 'gm', 'gn', 'go',
  'ha', 'hb', 'hc', 'hd', 'he', 'hf', 'hg', 'hh', 'hi', 'hj', 'hk', 'hl', 'hm', 'hn', 'ho',
  'ia', 'ib', 'ic', 'id', 'ie', 'if', 'ig', 'ih', 'ii', 'ij', 'ik', 'il', 'im', 'in', 'io',
  'ja', 'jb', 'jc', 'jd', 'je', 'jf', 'jg', 'jh', 'ji', 'jj', 'jk', 'jl', 'jm', 'jn', 'jo',
  'ka', 'kb', 'kc', 'kd', 'ke', 'kf', 'kg', 'kh', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko',
  'la', 'lb', 'lc', 'ld', 'le', 'lf', 'lg', 'lh', 'li', 'lj', 'lk', 'll', 'lm', 'ln', 'lo',
  'ma', 'mb', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mi', 'mj', 'mk', 'ml', 'mm', 'mn', 'mo',
  'na', 'nb', 'nc', 'nd', 'ne', 'nf', 'ng', 'nh', 'ni', 'nj', 'nk', 'nl', 'nm', 'nn', 'no',
  'oa', 'ob', 'oc', 'od', 'oe', 'of', 'og', 'oh', 'oi', 'oj', 'ok', 'ol', 'om', 'on', 'oo',
]

// prettier-ignore
const RED_PATH = [
  null, null, null, null, null, null,   11,   12,   13, null, null, null, null, null, null,
  null, null, null, null, null, null,   10, null,   14, null, null, null, null, null, null,
  null, null, null, null, null, null,    9, null,   15, null, null, null, null, null, null,
  null, null, null, null, null, null,    8, null,   16, null, null, null, null, null, null,
  null, null, null, null, null, null,    7, null,   17, null, null, null, null, null, null,
  null, 'r1', 'r2', 'r3', 'r4', null,    6, null,   18, null, null, null, null, null, null,
  null,    1,    2,    3,    4,    5, null, null, null,   19,   20,   21,   22,   23,   24,
    51,   52,   53,   54,   55,   56,   57, null, null, null, null, null, null, null,   25,
    50,   49,   48,   47,   46,   45, null, null, null,   31,   30,   29,   28,   27,   26,
  null, null, null, null, null, null,   44, null,   32, null, null, null, null, null, null,
  null, null, null, null, null, null,   43, null,   33, null, null, null, null, null, null,
  null, null, null, null, null, null,   42, null,   34, null, null, null, null, null, null,
  null, null, null, null, null, null,   41, null,   35, null, null, null, null, null, null,
  null, null, null, null, null, null,   40, null,   36, null, null, null, null, null, null,
  null, null, null, null, null, null,   39,   38,   37, null, null, null, null, null, null,
];

//

// prettier-ignore
const GREEN_PATH = [
  null, null, null, null, null, null,   50,   51, null, null, null, null, null, null, null,
  null, null, null, null, null, null,   49,   52,    1, 'g1', null, null, null, null, null,
  null, null, null, null, null, null,   48,   53,    2, 'g2', null, null, null, null, null,
  null, null, null, null, null, null,   47,   54,    3, 'g3', null, null, null, null, null,
  null, null, null, null, null, null,   46,   55,    4, 'g4', null, null, null, null, null,
  null, null, null, null, null, null,   45,   56,    5, null, null, null, null, null, null,
    39,   40,   41,   42,   43,   44, null,   57, null,    6,    7,    8,    9,   10,   11,
    38, null, null, null, null, null, null, null, null, null, null, null, null, null,   12,
    37,   36,   35,   34,   33,   32, null, null, null,   18,   17,   16,   15,   14,   13,
  null, null, null, null, null, null,   31, null,   19, null, null, null, null, null, null,
  null, null, null, null, null, null,   30, null,   20, null, null, null, null, null, null,
  null, null, null, null, null, null,   29, null,   21, null, null, null, null, null, null,
  null, null, null, null, null, null,   28, null,   22, null, null, null, null, null, null,
  null, null, null, null, null, null,   27, null,   23, null, null, null, null, null, null,
  null, null, null, null, null, null,   26,   25,   24, null, null, null, null, null, null, 
];

// prettier-ignore
const YELLOW_PATH =  [
  null, null, null, null, null, null,   24,   25,   26, null, null, null, null, null, null,
  null, null, null, null, null, null,   23, null,   27, null, null, null, null, null, null,
  null, null, null, null, null, null,   22, null,   28, null, null, null, null, null, null,
  null, null, null, null, null, null,   21, null,   29, null, null, null, null, null, null,
  null, null, null, null, null, null,   20, null,   30, null, null, null, null, null, null,
  null, null, null, null, null, null,   19, null,   31, null, null, null, null, null, null,
    13,   14,   15,   16,   17,   18, null, null, null,   32,   33,   34,   35,   36,   37,
    12, null, null, null, null, null, null, null, null, null, null, null, null, null,   38,
    11,   10,    9,    8,    7,    6, null,   57, null,   44,   43,   42,   41,   40,   39,
  null, null, null, null, null, null,    5,   56,   45, null, null, null, null, null, null,
  null, null, null, null, null, 'y4',    4,   55,   46, null, null, null, null, null, null,
  null, null, null, null, null, 'y3',    3,   54,   47, null, null, null, null, null, null,
  null, null, null, null, null, 'y2',    2,   53,   48, null, null, null, null, null, null,
  null, null, null, null, null, 'y1',    1,   52,   49, null, null, null, null, null, null,
  null, null, null, null, null, null, null,   51,   50, null, null, null, null, null, null, 
];

// prettier-ignore
const BLUE_PATH = [
  null, null, null, null, null, null,   37,   38,   39, null, null, null, null, null, null,
  null, null, null, null, null, null,   36, null,   40, null, null, null, null, null, null,
  null, null, null, null, null, null,   35, null,   41, null, null, null, null, null, null,
  null, null, null, null, null, null,   34, null,   42, null, null, null, null, null, null,
  null, null, null, null, null, null,   33, null,   43, null, null, null, null, null, null,
  null, null, null, null, null, null,   32, null,   44, null, null, null, null, null, null,
    26,   27,   28,   29,   30,   31, null, null, null,   45,   46,   47,   48,   49,   50,
    25, null, null, null, null, null, null, null,   57,   56,   55,   54,   53,   52,   51,
    24,   23,   22,   21,   20,   19, null, null, null,    5,    4,    3,    2,    1, null,
  null, null, null, null, null, null,   18, null,    6, null, 'b4', 'b3', 'b2', 'b1', null,
  null, null, null, null, null, null,   17, null,    7, null, null, null, null, null, null,
  null, null, null, null, null, null,   16, null,    8, null, null, null, null, null, null,
  null, null, null, null, null, null,   15, null,    9, null, null, null, null, null, null,
  null, null, null, null, null, null,   14, null,   10, null, null, null, null, null, null,
  null, null, null, null, null, null,   13,   12,   11, null, null, null, null, null, null, 
];

// prettier-ignore
const cellsNotToDraw = [
  'aa', 'ab', 'ac', 'ad', 'ae', 'af', null, null, null, 'aj', 'ak', 'al', 'am', 'an', 'ao',
  'ba', 'bb', 'bc', 'bd', 'be', 'bf', null, null, null, null, 'bk', 'bl', 'bm', 'bn', 'bo',
  'ca', 'cb', 'cc', 'cd', 'ce', 'cf', null, null, null, null, 'ck', 'cl', 'cm', 'cn', 'co',
  'da', 'db', 'dc', 'dd', 'de', 'df', null, null, null, null, 'dk', 'dl', 'dm', 'dn', 'do',
  'ea', 'eb', 'ec', 'ed', 'ee', 'ef', null, null, null, null, 'ek', 'el', 'em', 'en', 'eo',
  'fa', null, null, null, null, 'ff', null, null, null, 'fj', 'fk', 'fl', 'fm', 'fn', 'fo',
  null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
  'ja', 'jb', 'jc', 'jd', 'je', 'jf', null, null, null, 'jj', null, null, null, null, 'jo',
  'ka', 'kb', 'kc', 'kd', 'ke', null, null, null, null, 'kj', 'kk', 'kl', 'km', 'kn', 'ko',
  'la', 'lb', 'lc', 'ld', 'le', null, null, null, null, 'lj', 'lk', 'll', 'lm', 'ln', 'lo',
  'ma', 'mb', 'mc', 'md', 'me', null, null, null, null, 'mj', 'mk', 'ml', 'mm', 'mn', 'mo',
  'na', 'nb', 'nc', 'nd', 'ne', null, null, null, null, 'nj', 'nk', 'nl', 'nm', 'nn', 'no',
  'oa', 'ob', 'oc', 'od', 'oe', 'of', null, null, null, 'oj', 'ok', 'ol', 'om', 'on', 'oo',
]

const path_types = {
    home: ['p1', 'p2', 'p3', 'p4'],
    begin: [1],
    final: [52, 53, 54, 55, 56],
    end: [57],
}

/*
where[0] -> begin
where[1] -> final
where[2] -> end
*/
const cell = 'cell w-6 h-6 p-0.5 shadow-md lg:w-8 lg:h-8 lg:p-1'

const directional_cell_obj = {
    where: [false, false, false],
    safe: false,
    style: cell + ' text-center shadow-none bg-center bg-contain ',
    has: [],
    pos: {},
}

const directional_cell_red = 'bg-arrow-red-cell'
const directional_cell_green = 'bg-arrow-green-cell'
const directional_cell_blue = 'bg-arrow-blue-cell'
const directional_cell_yellow = 'bg-arrow-yellow-cell'

const empty_cell_obj = {
    where: [false, false, false],
    safe: false,
    style:
        cell +
        ' text-center shadow-none border lg:border-2 border-dashed rounded ',
    has: [],
    pos: {},
}

const cell_obj = {
    where: [false, false, false],
    safe: false,
    style:
        cell +
        ' text-center rounded lg:shadow-md border lg:border-2 border-white bg-white ',
    has: [],
    pos: {},
}

const safe_cell_obj = {
    where: [false, false, false],
    safe: true,
    style:
        cell +
        ' text-center rounded lg:shadow-md border lg:border-2 border-white bg-white bg-safe-cell bg-center bg-contain ',
    has: [],
    pos: {},
}

const begin_cell_obj = {
    where: [true, false, false],
    safe: false,
    style: cell + ' text-center rounded lg:shadow-md bg-center bg-contain ',
    has: [],
    pos: {},
}

const begin_cell_red =
    ' bg-red-200 border lg:border-2 border-red-400 bg-start-red-cell '
const begin_cell_green =
    ' bg-green-200 border lg:border-2 border-green-400 bg-start-green-cell '
const begin_cell_blue =
    ' bg-blue-200 border lg:border-2 border-blue-400 bg-start-blue-cell '
const begin_cell_yellow =
    ' bg-yellow-200 border lg:border-2 border-yellow-400 bg-start-yellow-cell '

const final_cell_red =
    ' bg-red-200 border lg:border-2 border-red-400 bg-final-red-cell '
const final_cell_green =
    ' bg-green-200 border lg:border-2 border-green-400 bg-final-green-cell '
const final_cell_blue =
    ' bg-blue-200 border lg:border-2 border-blue-400 bg-final-blue-cell '
const final_cell_yellow =
    ' bg-yellow-200 border lg:border-2 border-yellow-400 bg-final-yellow-cell '

const end_cell_red =
    ' bg-red-200 border lg:border-2 border-red-400 bg-end-red-cell '
const end_cell_green =
    ' bg-green-200 border lg:border-2 border-green-400 bg-end-green-cell '
const end_cell_blue =
    ' bg-blue-200 border lg:border-2 border-blue-400 bg-end-blue-cell '
const end_cell_yellow =
    ' bg-yellow-200 border lg:border-2 border-yellow-400 bg-end-yellow-cell '

const final_cell_obj = {
    where: [false, true, false],
    safe: false,
    style: cell + ' text-center rounded lg:shadow-md bg-center bg-contain ',
    has: [],
    pos: {},
}

const end_cell_obj = {
    where: [false, false, true],
    safe: false,
    style: cell + ' text-center rounded lg:shadow-md bg-center bg-contain ',
    has: [],
    pos: {},
}

const generateTranslate = (start, end, lg) => {
    const x = end[0] - start[0],
        y = end[1] - start[1]

    let space = lg ? 10 : 7

    console.log(lg, space)

    let x_m = x * space,
        y_m = y * space,
        x_s = remCal(x_m),
        y_s = remCal(y_m)

    console.log({
        transitionProperty: 'transform',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms',
        translateX: x_s,
        translateY: y_s,
    })

    return {
        transitionProperty: 'transform',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms',
        transform: `translateX(${x_s}) translateY(${y_s})`,
    }
}

const num_to_rem = {
    0: '0rem',
    7: '1.75rem',
    14: '3.5rem',
    21: '5.25rem',
    28: '7rem',
    35: '8.75rem',
    42: '10.5rem',
    49: '12.25rem',
    56: '14rem',
    63: '15.75rem',
    70: '17.5rem',
    74: '18.5rem',
    77: '19.25rem',
    84: '21rem',
    91: '22.75rem',
    98: '24.5rem',
    105: '26.25rem',
    10: '2.5rem',
    20: '5rem',
    30: '7.5rem',
    40: '10rem',
    50: '12.5rem',
    60: '15rem',
    80: '20rem',
    90: '22.5rem',
    100: '25rem',
    104: '26rem',
    107: '26.75rem',
    110: '27.5rem',
    120: '30rem',
    130: '32.5rem',
    140: '35rem',
    148: '37rem',
    150: '37.5rem',
    157: '39.25rem',
}

const remCal = (c) => {
    if (c !== 0) {
        return `${c/4}rem`
    } else {
        return `0rem`
    }
}

const xy = (arr, e) => {
    const pos = arr.findIndex((i) => i === e)
    return [pos % 15, Math.ceil(pos / 15) - 1]
}

const Constants = {
    DEFAULT_BOARD_LAYOUT,
    DEFAULT_CELL_LAYOUT,
    LOCATION_BOARD_LAYOUT,
    RED_PATH,
    GREEN_PATH,
    YELLOW_PATH,
    BLUE_PATH,
    cellsNotToDraw,
    path,
    safe,
    red,
    green,
    yellow,
    blue,
    colorNames,
    path_types,
    empty_cell_obj,
    cell_obj,
    safe_cell_obj,
    begin_cell_obj,
    final_cell_obj,
    end_cell_obj,
    begin_cell_red,
    begin_cell_green,
    begin_cell_yellow,
    begin_cell_blue,
    final_cell_red,
    final_cell_green,
    final_cell_yellow,
    final_cell_blue,
    end_cell_red,
    end_cell_green,
    end_cell_blue,
    end_cell_yellow,
    directional_cell_obj,
    directional_cell_red,
    directional_cell_green,
    directional_cell_blue,
    directional_cell_yellow,
    generateTranslate,
    xy,
    BASE_API,
    WEB_APP_URL,
}

export default Constants
