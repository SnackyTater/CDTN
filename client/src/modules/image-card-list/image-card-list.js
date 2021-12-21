import React from 'react';

import ImageCard from '../../common/component/image-card/image-card';

import './image-card-list.css'

export default function ImageCardList({column, row, onChange, inputImageList}) {
    let index = 0;

    return (
        <div className='image-card-list'>
            {column.map((time) => <div key={time} style={{"display": 'flex', "padding": '20px 0px'}}>
                {row.map((time) => {
                    const display = <div key={time}>
                        <ImageCard 
                            onChange={onChange} 
                            inputImage={inputImageList && inputImageList[index]}
                        />
                    </div>
                    index ++;

                    return display

                })}
            </div>)}
        </div>
    )
}
