import { useRef, useState, useEffect } from 'react';
import { IconButton } from '@mui/material'
import { Add, Remove } from '@mui/icons-material';
import { addImage, deleteImage } from '../../../api/common/media';

import './image-card.scss';

export default function ImageCard({onChange: updateUserImage, inputImage}) {
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);

    const filePickRef = useRef(null);

    useEffect(() => {
        if(inputImage){
            setImage(inputImage);
            setPreview(inputImage.imageURL);
        } 
        
    }, [inputImage])

    const filePickHandler = (e) => {
        filePickRef.current.click();
    }

    const uploadHandler = async(e) => {
        e.preventDefault();
        try{
            const {public_id, secure_url} = await addImage({image: e.target.files[0]});

            updateUserImage({
                imageURL: secure_url,
                imagePublicID: public_id
            })

            setImage({
                imageURL: secure_url,
                imagePublicID: public_id
            })

            setPreview(URL.createObjectURL(e.target.files[0]));
        } catch(err) {
            console.log(err);
        }
    }

    const deleteHandler = async(e) => {
        e.preventDefault();
        
        try{
            const data = await deleteImage({id:  image.imagePublicID});

            setImage(null);
            setPreview(null);

            updateUserImage({
                imageURL: image.imageURL,
                imagePublicID: image.imagePublicID
            })
        } catch(err) {
            console.log(err)
        }   
    }

    return (
        <div className="image-card">
            {
                (!preview) ? (
                    <div className="image-card__content" />
                ) : (
                    <img className="image-card__content" src={preview} alt=''/>
                )
                            
            }
            <div className='image-card__button'>
                {
                    (preview) ? (
                        <IconButton
                            onClick={deleteHandler}
                            sx={{
                                "&.MuiButtonBase-root": {
                                    border: '1px solid rgba(0, 0, 0, 0.3)',
                                    bgcolor: 'white',
                                    padding: '8px'
                                }
                            }}
                        >
                            <Remove 
                                sx={{color: '#db2a2a'}}
                            />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={filePickHandler}
                            sx={{
                                "&.MuiButtonBase-root": {
                                    border: '1px solid rgba(0, 0, 0, 0.3)',
                                    backgroundImage: 'linear-gradient(45deg,#fd267a,#ff7854)',
                                    padding: '8px'
                                }
                            }}
                        >
                            <Add
                                sx={{color: 'white'}}
                            />
                        </IconButton>
                    )
                }
            </div>
            <input type="file" style={{display: 'none'}} ref={filePickRef} onChange={uploadHandler}/>
        </div>
    )
}
