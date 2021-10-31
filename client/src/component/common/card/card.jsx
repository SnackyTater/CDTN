import React, {useState, useEffect} from 'react';
import {ageCalulator} from '../../../common/utils/utils';

import './card.css'

export default function Card() {
    const [card, setCard] = useState({
            profileImage: [`${process.env.PUBLIC_URL}/assets/testcard/1.PNG`, `${process.env.PUBLIC_URL}/assets/testcard/2.PNG`, `${process.env.PUBLIC_URL}/assets/testcard/3.png`],
            gender: "unknown",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam congue mi nulla, at eleifend mi consectetur ultrices. Sed eleifend congue scelerisque. In ac ex est. Donec efficitur suscipit sapien, ac varius odio aliquam vitae. Aenean vitae lobortis risus, ut sodales sem. Etiam fermentum sem eget purus eleifend sagittis. Sed quam lorem, faucibus at tortor vitae, sagittis aliquet nulla. Cras elementum velit sit amet aliquam sodales. ",
            fullName: "tater",
            DateOfBirth: "1998-07-15T17:00:00.000Z"
        })
    
    useEffect(() => {
        console.log(card)
    }, [])

    return (
        <>
            <div className="card-upper-holder">
                <div className="card-upper-content">
                    <img className="card-upper-content__image" src={card.profileImage[1]} alt="" />
                    <div className="card-upper-content__info-holder">
                        <div>
                            <p className="card-info__username" style={{fontSize: '3rem'}}>{card.fullName}</p>
                            <p className="card-info__age" style={{fontSize: '3rem'}}>{ageCalulator(card.DateOfBirth)}</p>
                        </div>
                        <div>
                            <p className="card-info__description" style={{fontSize: '1rem'}}>{card.description}</p>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="card-lower-holder-outer">
                <div className="card-button-holder-inner">
                    <button className="card__button">
                        <div className="card-logo-holder">
                            <img src={process.env.PUBLIC_URL + '/assets/no.png'} alt="" className="button__logo"/>
                        </div>
                    </button>
                </div>
                <div className="card-button-holder-inner">
                    <button className="card__button">
                        <div className="card-logo-holder">
                            <img src={process.env.PUBLIC_URL + '/assets/undo.png'} alt="" className="button__logo"/>
                        </div>
                    </button>
                </div>
                <div className="card-button-holder-inner">
                    <button className="card__button">
                        <div className="card-logo-holder">
                            <img src={process.env.PUBLIC_URL + '/assets/yes.png'} alt="" className="button__logo"/>
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}
