import {ImageCard } from '../index';
import './image-card-list.scss'

export default function ImageCardList({column, row, onChange, inputImageList, error}) {
    let index = 0;

    return (
        <div className='image-card-list'>
            {row.map((time) => <div key={time} style={{"display": 'flex'}}>
                {column.map((time) => {
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
            {!error.status && <p className='image-card-list-error'>{error.message}</p>}
        </div>
    )
}
