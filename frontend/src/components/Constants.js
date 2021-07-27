const path = 6,
    safe = 5,
    red = {
        id: 1,
        begin: 11,
        final: 12,
        end: 13,
    },
    green = {
        id: 2,
        begin: 21,
        final: 22,
        end: 23,
    },
    yellow = {
        id: 3,
        begin: 31,
        final: 32,
        end: 33,
    },
    blue = {
        id: 4,
        begin: 41,
        final: 42,
        end: 43,
    }

const colorNames = {
    r: 'red',
    g: 'green',
    y: 'yellow',
    b: 'blue',
}

// prettier-ignore
const DEFAULT_BOARD_LAYOUT = [
  '0',  '0', '0',  '0', '0', '6', '6', '6', '0',  '0', '0',  '0', '0',
  '0', 'r1', '0', 'r2', '0', '6', '2', '2', '0', 'g1', '0', 'g2', '0',
  '0',  '0', '0',  '0', '0', '5', '2', '6', '0',  '0', '0',  '0', '0',
  '0', 'r3', '0', 'r4', '0', '6', '2', '6', '0', 'g3', '0', 'g4', '0',
  '0',  '0', '0',  '0', '0', '6', '2', '6', '0',  '0', '0',  '0', '0',
  '6',  '1', '6',  '6', '6', '0', '2', '0', '6',  '6', '5',  '6', '6',
  '6',  '1', '1',  '1', '1', '1', '0', '4', '4',  '4', '4',  '4', '6',
  '6',  '6', '5',  '6', '6', '0', '3', '0', '6',  '6', '6',  '4', '6',
  '0',  '0', '0',  '0', '0', '6', '3', '6', '0',  '0', '0',  '0', '0',
  '0', 'y1', '0', 'y2', '0', '6', '3', '6', '0', 'b1', '0', 'b3', '0',
  '0',  '0', '0',  '0', '0', '6', '3', '5', '0',  '0', '0',  '0', '0',
  '0', 'y3', '0', 'y4', '0', '3', '3', '6', '0', 'b3', '0', 'b4', '0',
  '0',  '0', '0',  '0', '0', '6', '6', '6', '0',  '0', '0',  '0', '0',
]

/*
  0 -> null | 1 -> red 
*/
// prettier-ignore
const DEFAULT_CELL_LAYOUT = [
   '0',  '0',  '0',  '0',  '0',  '6',  '6',  '6',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '6', '22', '21',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '5', '22',  '6',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '6', '22',  '6',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '6', '22',  '6',  '0',  '0',  '0',  '0', '0',
   '6', '11',  '6',  '6',  '6',  '0', '23',  '0',  '6',  '6',  '5',  '6', '6',
   '6', '12', '12', '12', '12', '13',  '0', '43', '42', '42', '42', '42', '6',
   '6',  '6',  '5',  '6',  '6',  '0', '33',  '0',  '6',  '6',  '6', '41', '6',
   '0',  '0',  '0',  '0',  '0',  '6', '32',  '6',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '6', '32',  '6',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '6', '32',  '5',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0', '31', '32',  '6',  '0',  '0',  '0',  '0', '0',
   '0',  '0',  '0',  '0',  '0',  '6',  '6',  '6',  '0',  '0',  '0',  '0', '0',
]

// prettier-ignore
const LOCATION_BOARD_LAYOUT =  [
  'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj', 'ak', 'al', 'am',
  'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bk', 'bl', 'bm',
  'ca', 'cb', 'cc', 'cd', 'ce', 'cf', 'cg', 'ch', 'ci', 'cj', 'ck', 'cl', 'cm',
  'da', 'db', 'dc', 'dd', 'de', 'df', 'dg', 'dh', 'di', 'dj', 'dk', 'dl', 'dm',
  'ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'eg', 'eh', 'ei', 'ej', 'ek', 'el', 'em',
  'fa', 'fb', 'fc', 'fd', 'fe', 'ff', 'fg', 'fh', 'fi', 'fj', 'fk', 'fl', 'fm',
  'ga', 'gb', 'gc', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gj', 'gk', 'gl', 'gm',
  'ha', 'hb', 'hc', 'hd', 'he', 'hf', 'hg', 'hh', 'hi', 'hj', 'hk', 'hl', 'hm',
  'ia', 'ib', 'ic', 'id', 'ie', 'if', 'ig', 'ih', 'ii', 'ij', 'ik', 'il', 'im',
  'ja', 'jb', 'jc', 'jd', 'je', 'jf', 'jg', 'jh', 'ji', 'jj', 'jk', 'jl', 'jm',
  'ka', 'kb', 'kc', 'kd', 'ke', 'kf', 'kg', 'kh', 'ki', 'kj', 'kk', 'kl', 'km',
  'la', 'lb', 'lc', 'ld', 'le', 'lf', 'lg', 'lh', 'li', 'lj', 'lk', 'll', 'lm',
  'ma', 'mb', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mi', 'mj', 'mk', 'ml', 'mm'
]

// prettier-ignore
const RED_PATH = [
  null, null, null, null, null,    9,   10,   11, null, null, null, null, null,
  null, null, null, null, null,    8, null,   12, null, null, null, null, null,
  null, null, null, null, null,    7, null,   13, null, null, null, null, null,
  null, null, null, null, null,    6, null,   14, null, null, null, null, null,
  null, 'r1', 'r2', 'r3', 'r4',    5, null,   15, null, null, null, null, null,
  null,    1,    2,    3,    4, null, null, null,   16,   17,   18,   19,   20,
    43,   44,   45,   46,   47,   48, null, null, null, null, null, null,   21,
    42,   41,   40,   39,   38, null, null, null,   26,   25,   24,   23,   22,
  null, null, null, null, null,   37, null,   27, null, null, null, null, null,
  null, null, null, null, null,   36, null,   28, null, null, null, null, null,
  null, null, null, null, null,   35, null,   29, null, null, null, null, null,
  null, null, null, null, null,   34, null,   30, null, null, null, null, null,
  null, null, null, null, null,   33,   32,   31, null, null, null, null, null,
];

// prettier-ignore
const GREEN_PATH = [
  null, null, null, null, null,   42,   43, null, null, null, null, null, null,
  null, null, null, null, null,   41,   44,    1, 'g1', null, null, null, null,
  null, null, null, null, null,   40,   45,    2, 'g2', null, null, null, null,
  null, null, null, null, null,   39,   46,    3, 'g3', null, null, null, null,
  null, null, null, null, null,   38,   47,    4, 'g4', null, null, null, null,
    33,   34,   35,   36,   37, null,   48, null,    5,    6,    7,    8,    9,
    32, null, null, null, null, null, null, null, null, null, null, null,   10,
    31,   30,   29,   28,   27, null, null, null,   15,   14,   13,   12,   11,
  null, null, null, null, null,   26, null,   16, null, null, null, null, null,
  null, null, null, null, null,   25, null,   17, null, null, null, null, null,
  null, null, null, null, null,   24, null,   18, null, null, null, null, null,
  null, null, null, null, null,   23, null,   19, null, null, null, null, null,
  null, null, null, null, null,   22,   21,   20, null, null, null, null, null, 
];

// prettier-ignore
const YELLOW_PATH = [
  null, null, null, null, null,   20,   21,   22, null, null, null, null, null,
  null, null, null, null, null,   19, null,   23, null, null, null, null, null,
  null, null, null, null, null,   18, null,   24, null, null, null, null, null,
  null, null, null, null, null,   17, null,   25, null, null, null, null, null,
  null, null, null, null, null,   16, null,   26, null, null, null, null, null,
    11,   12,   13,   14,   15, null, null, null,   27,   28,   29,   30,   31,
    10, null, null, null, null, null, null, null, null, null, null, null,   32,
    9,    8,    7,    6,    5,  null,   48, null,   37,   36,   35,   34,   33,
  null, null, null, null, 'y4',    4,   47,   38, null, null, null, null, null,
  null, null, null, null, 'y3',    3,   46,   39, null, null, null, null, null,
  null, null, null, null, 'y2',    2,   45,   40, null, null, null, null, null,
  null, null, null, null, 'y1',    1,   44,   41, null, null, null, null, null,
  null, null, null, null, null, null,   43,   42, null, null, null, null, null, 
];

// prettier-ignore
const BLUE_PATH = [
  null, null, null, null, null,   31,   32,   33, null, null, null, null, null,
  null, null, null, null, null,   30, null,   34, null, null, null, null, null,
  null, null, null, null, null,   29, null,   35, null, null, null, null, null,
  null, null, null, null, null,   28, null,   36, null, null, null, null, null,
  null, null, null, null, null,   27, null,   37, null, null, null, null, null,
    22,   23,   24,   25,   26, null, null, null,   38,   39,   40,   41,   42,
    21, null, null, null, null, null, null,   48,   47,   46,   45,   44,   43,
    20,   19,   18,   17,   16, null, null, null,    4,    3,    2,    1, null,
  null, null, null, null, null,   15, null,    5, 'b4', 'b3', 'b2', 'b1', null,
  null, null, null, null, null,   14, null,    6, null, null, null, null, null,
  null, null, null, null, null,   13, null,    7, null, null, null, null, null,
  null, null, null, null, null,   12, null,    8, null, null, null, null, null,
  null, null, null, null, null,   11,   10,    9, null, null, null, null, null, 
];

// prettier-ignore
const cellsNotToDraw = [
  'aa', 'ab', 'ac', 'ad', 'ae', "ai", 'aj', 'ak', 'al', 'am',
  'ba', 'bb', 'bc', 'bd', 'be', 'bj', 'bk', 'bl', 'bm',
  'ca', 'cb', 'cc', 'cd', 'ce', 'cj', 'ck', 'cl', 'cm',
  'da', 'db', 'dc', 'dd', 'de', 'dj', 'dk', 'dl', 'dm',
  'ea', 'ej', 'ek', 'el', 'em', 'ff', 'fh', 'gg', 'hf', 'hh',
  'ia', 'ib', 'ic', 'id', 'im',
  'ja', 'jb', 'jc', 'jd', 'ji', 'jj', 'jk', 'jl', 'jm',
  'ka', 'kb', 'kc', 'kd', 'ki', 'kj', 'kk', 'kl', 'km',
  'la', 'lb', 'lc', 'ld', 'li', 'lj', 'lk', 'll', 'lm',
  'ma', 'mb', 'mc', 'md', 'me', 'mi', 'mk', 'mj', 'ml', 'mm',
]

const path_types = {
    home: ['p1', 'p2', 'p3', 'p4'],
    begin: [1],
    final: [44, 45, 46, 47],
    end: [48],
}

/*
where[0] -> begin
where[1] -> final
where[2] -> end
*/
const cell = 'cell lg:w-8 lg:h-8 p-0.5 lg:p-1'

const empty_cell_obj = {
    where: [false, false, false],
    safe: false,
    style: cell + ' text-center border-2 border-dashed rounded',
    has: [],
    pos: {},
}

const cell_obj = {
    where: [false, false, false],
    safe: false,
    style:
        cell +
        ' text-center border-2 border-gray-200 lg:border-0 rounded lg:shadow-md bg-white ',
    has: [],
    pos: {},
}

const safe_cell_obj = {
    where: [false, false, false],
    safe: true,
    style:
        cell +
        ' text-center border-2 border-gray-200 lg:border-0 rounded lg:shadow-md bg-white bg-safe-cell bg-center bg-contain',
    has: [],
    pos: {},
}

const begin_cell_obj = {
    where: [true, false, false],
    safe: false,
    style:
        cell +
        ' text-center border-2 border-gray-200 lg:border-0 rounded lg:shadow-md ',
    has: [],
    pos: {},
}

const final_cell_obj = {
    where: [false, true, false],
    safe: false,
    style:
        cell +
        ' text-center border-2 border-gray-200 lg:border-0 rounded lg:shadow-md ',
    has: [],
    pos: {},
}

const end_cell_obj = {
    where: [false, false, true],
    safe: false,
    style:
        cell +
        ' text-center border-2 border-gray-200 lg:border-0 rounded lg:shadow-md ',
    has: [],
    pos: {},
}

const generateTranslate = (start, end) => {
    const x = end[0] - start[0],
        y = end[1] - start[1]

    let x_m = x * 9,
        y_m = y * 9,
        x_s,
        y_s

    if (x_m >= 0) {
        x_s = x_s === 0 ? '' : ' translate-x-' + x_m
    } else {
        x_s = ' -translate-x-' + -1 * x_m
    }

    if (y_m >= 0) {
        y_s = y_s === 0 ? '' : ' translate-y-' + y_m
    } else {
        y_s = ' -translate-y-' + -1 * y_m
    }

    return ' transition-transform duration-300 transform ' + x_s + y_s
}

const xy = (arr, e) => {
    const pos = arr.findIndex((i) => i === e)
    return [pos % 13, Math.ceil(pos / 13) - 1]
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
    generateTranslate,
    xy,
}

export default Constants
