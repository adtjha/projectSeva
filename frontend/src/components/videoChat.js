import red from "../images/red.gif";
import green from "../images/green.gif";
import yellow from "../images/yellow.gif";
import blue from "../images/blue.gif";
import React from "react";

{/* <div className="absolute bg-transparent z-10 w-max grid grid-cols-13 grid-rows-13 gap-0.5 lg:gap-2 justify-items-stretch"> */}

export const videoChat = (
    <React.Fragment>
        <div className="col-start-1 col-end-6 row-start-1 row-end-5 bg-transparent border-2 border-double border-red-400 rounded-2xl overflow-hidden shadow-md lg:mb-1 lg:mr-1">
            <img
                className="relative transform scale-150 object-fill object-bottom"
                src={red}
                alt="red"
            ></img>
        </div>
        <div className="col-start-10 col-end-14 row-start-1 row-end-6 bg-transparent border-2 border-double border-green-400 rounded-2xl overflow-hidden shadow-md lg:mb-1 lg:mr-1">
            <img
                className="relative transform scale-150 object-fill object-bottom"
                src={green}
                alt="green"
            ></img>
        </div>
        <div className="col-start-1 col-end-5 row-start-9 row-end-14 bg-transparent border-2 border-double border-yellow-400 rounded-2xl overflow-hidden shadow-md lg:mb-1 lg:mr-1">
            <img
                className="relative transform scale-150 object-fill object-bottom"
                src={yellow}
                alt="yellow"
            ></img>
        </div>
        <div className="col-start-9 col-end-14 row-start-10 row-end-14 bg-transparent border-2 border-double border-blue-400 rounded-2xl overflow-hidden shadow-md lg:mb-1 lg:mr-1">
            <img
                className="relative transform scale-150 object-fill object-bottom"
                src={blue}
                alt="blue"
            ></img>
        </div>
    </React.Fragment>
)
