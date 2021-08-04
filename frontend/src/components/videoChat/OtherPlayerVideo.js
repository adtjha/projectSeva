import red from '../../images/red.gif'
import green from '../../images/green.gif'
import yellow from '../../images/yellow.gif'
import blue from '../../images/blue.gif'
import React from 'react'

export const OtherPlayerVideo = (props) => {
    let vidsrc =
        props.color === 'red'
            ? red
            : props.color === 'green'
            ? green
            : props.color === 'yellow'
            ? yellow
            : blue
    return (
        <img
            className="relative transform scale-150 object-fill object-bottom"
            src={vidsrc}
            alt={props.color}
        ></img>
    )
}
