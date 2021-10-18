import React from 'react'

import './card.css'

export default function Card() {

    return (
        <>
            <div className="card-image-holder">
                <img src="" alt="" />
                <div className="card-info">
                    <p className="card-info__username">tater</p>
                    <p className="card-info__age">23</p>
                    <p className="card-info__description">testing 123123</p>
                </div>
            </div>
            <div className="card-button-holder">
                <div className="card-button">
                    <button className="card__button">nope</button>
                </div>
                <div className="card-button">
                    <button className="card__button">undo</button>
                </div>
                <div className="card-button">
                    <button className="card__button">like</button>
                </div>
            </div>
        </>
    )
}
