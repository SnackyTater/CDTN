import React from 'react';

import ImageCard from '../../common/component/image-card/image-card';

import './image-card-list.css'

export default function ImageCardList({limit, onChange}) {

    return (
        <div className='image-card-list'>
            {
                limit.map((time) => 
                    <ImageCard onChange={onChange}/>
                )
            }
        </div>
    )
}
