import React from 'react';
import { DefaultBackdrop, Avatar } from '../../../../component';
import './popup.scss';

export default function popup({isOpen, info, closeForm}) {
    const {info: userInfo} = info;
    return (
        <>
            {
                <DefaultBackdrop
                    isOpen={isOpen}
                    closeForm={closeForm}
                >
                    <div className='home__popup__content'>
                        <div className='home__popup__content__avatar'>
                            <Avatar 
                                image={userInfo.profileImage[0].imageURL}
                                
                            />
                        </div>
                        <div className='home__popup__content__info'>
                            <p>{`name: ${userInfo.fullName}`}</p>
                            <p>{`gender: ${userInfo.gender}`}</p>
                            <p>{`age: ${userInfo.gender}`}</p>
                            <p>{`passions: ${userInfo.gender}`}</p>
                            <p>{`description: ${userInfo.description}`}</p>
                        </div>
                    </div>
                </DefaultBackdrop>
            }
        </>
    )
}
