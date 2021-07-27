import React from 'react'
import Piece from './Piece'
import Constant from './Constants'

const Cell = (props) => {
    let styles, piece

    styles = props.data.style
    if (props.data.has) {
        if (props.data.has.length > 1) {
            piece = props.data.has.map((e) => {
                return (
                    <Piece
                        key={e}
                        cell_data={props.data}
                        name={e}
                        size={0}
                        multiple={props.data.has.length}
                    />
                )
            })
        } else {
            piece = props.data.has.map((e) => {
                return (
                    <Piece
                        key={e}
                        cell_data={props.data}
                        name={e}
                        size={0}
                        multiple={1}
                    />
                )
            })
        }
        styles += ' flex justify-center items-center flex-wrap '
    }
    if (styles) {
        Constant.cellsNotToDraw.forEach((e) => {
            if (props.data.id === e) {
                styles = undefined
            }
        })
    }

    const handleClick = () => {
        // console.log(props.data)
    }

    return (
        <React.Fragment>
            {styles ? (
                <div className={styles} onClick={handleClick}>
                    {piece}
                </div>
            ) : null}
        </React.Fragment>
    )
}

export default Cell
