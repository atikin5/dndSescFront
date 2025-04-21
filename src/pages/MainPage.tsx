import React from "react";
import {Link} from "react-router-dom";

export function MainPage() {


    return (
        <div style={{
            width: "370px",
            height: "52px",
            position: "absolute",
            top: "40vh",
            left: "40vw",
            border: "2px black solid",
            borderRadius: "5px"
        }}
        className="bg-yellow-300">
            <div >
                <input/>
                <Link to={`/campaign`}>Зайти как мастер</Link>
            </div>
            <div>
                <input/>
                <Link to={`/player/campaign/1/location/1`}>Подключиться по коду</Link>
            </div>


        </div>
    )
}