import {useRef, useState} from 'react';
import axios from 'axios';

import './image-card.css';

export default function ImageCard({onChange: updateUserImage}) {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const filePickRef = useRef(null);

    const clickHandler = () => {
        if(!image) filePickRef.current.click();
    }

    const changeHandler = async(e) => {
        const fd = new FormData();
        fd.append('image', e.target.files[0]);

        const uploadStatus = await axios.post('http://localhost:5000/media', fd, {
            headers: { 'Accept': 'multipart/form-data' }
        })

        console.log(uploadStatus.data);
        updateUserImage(uploadStatus.data);
        setImage(uploadStatus.data);
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    const deleteImage = async(e) => {
        const uploadStatus = await axios.delete(`http://localhost:5000/media/${image.public_id}`);
        updateUserImage(image);
        setPreview(null);
        setImage(null);
        console.log(uploadStatus)
    }

    return (
        <div className='image-card__container'>
            <button className='image-card__button' onClick={clickHandler}>
                <div className='image-card__image-container'>
                {(preview) 
                    ?   <>
                            <img className='image-card__image' src={preview} alt='profile image'/>
                            <button className='image-card__delete-button' onClick={deleteImage}>x</button>
                        </>
                    : <button className='image-card__delete-button'>+</button>
                }
                </div>
            </button>
            <input className='image-card__input' type="file" ref={filePickRef} onChange={changeHandler}/>
        </div>
    )
}
