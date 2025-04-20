import React from "react";
import {Link} from "react-router-dom";

export function MainPage() {


    return (
        <div style={{

        }}>
            <div >
                <input style={{

                }}/>
                <Link to={`/campaign`}>Зайти как мастер</Link>
            </div>
            <div>
                <input style={{
                    left: '-50vw',
                    top: '-50vw'
                }}/>
                <Link to={`/player/campaign/1/location/1`}>Подключиться по коду</Link>
            </div>


        </div>
    )
}