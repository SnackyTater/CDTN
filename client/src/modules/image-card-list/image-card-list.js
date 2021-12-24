import React from 'react';

import ImageCard from '../../common/component/image-card/image-card';

import './image-card-list.css'

export default function ImageCardList({column, row, onChange, inputImageList}) {
    let index = 0;

    return (
        <div className='image-card-list'>
            {row.map((time) => <div key={time} style={{"display": 'flex'}}>
                {column.map((time, index) => {
                    const display = <ImageCard
                        key={index}
                        onChange={onChange} 
                        inputImage={inputImageList && inputImageList[index]}
                    />
                    index ++;

                    return display

                })}
            </div>)}
        </div>
    )
}
