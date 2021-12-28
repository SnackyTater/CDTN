import React from 'react';
import { DefaultBackdrop, Avatar, Tag } from '../../../../component';
import { ageCalulator } from '../../../../utils/utils';
import './popup.scss';

export default function popup({isOpen, info, closeForm}) {
    const {info: userInfo} = info;

    const formList = [
        {header: 'name', content: userInfo?.fullName},
        {header: 'gender', content: userInfo?.gender},
        {header: 'age', content: ageCalulator(userInfo?.DateOfBirth)},
        {header: 'passion', content: userInfo?.passions.map((passion) => <Tag onClick={() => {}} isActive={true} content={passion.name}/>)},
        {header: 'description', content: userInfo?.description},
    ]

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
                                image={userInfo?.profileImage[0]?.imageURL}
                                config={{
                                    width: '150px',
                                    height: '150px',
                                    border: '1px solid black'
                                }}
                            />
                        </div>
                        <div className='home__popup__content__info'>
                                {
                                    formList.map((item, index) => <div key={index} style={{display: 'flex'}}>
                                        <div className='home__popup__content__info__header'>
                                            {item.header}
                                        </div>
                                        <div className='home__popup__content__info__main'>
                                            {item.content}
                                        </div>
                                    </div>)
                                }
                        </div>
                    </div>
                </DefaultBackdrop>
            }
        </>
    )
}
