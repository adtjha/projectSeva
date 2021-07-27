import { useSelector } from "react-redux";
import Cell from "./Cell";
import create2Darray from "./functions/create2Darray";
import { videoChat } from "./videoChat";
import Dice from "./Dice";
import React from "react";
// import { io } from 'socket.io-client'
import { getBlue, getGreen, getRed, getYellow } from "../store/move";
import { getDice } from "../store/dice";
// import { useGeolocation } from "react-use";

// const socket = io('http://localhost:8888')
// socket.on('connection', () => {console.log("Connected to backend")})

const Board = (props) => {
  
  const data = {
    red: useSelector(getRed),
    green: useSelector(getGreen),
    yellow: useSelector(getYellow),
    blue: useSelector(getBlue),
    dice: useSelector(getDice),
  };

  const pos = [...create2Darray(data)];

  return (
      <React.Fragment>
          <div className="board block lg:w-max lg:h-max lg:max-w-full  lg:p-4 m-auto p-1 border-2 border-solid rounded-2xl shadow-md">
              <div className="relative z-20 lg:w-max lg:max-w-full grid grid-cols-sm13 lg:grid-cols-13 grid-rows-sm13 lg:grid-rows-13 md:gap-1 lg:gap-2 justify-items-stretch">
                  {pos.map((cell) => (
                      <Cell key={cell.id} data={cell} />
                      ))}
                    {videoChat}
              </div>
          </div>
          <Dice num={data.dice} />
      </React.Fragment>
  )
};

export default Board;