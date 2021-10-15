import {useRef} from 'react';
import './input-file.css';

export default function Inputfile({onChange, preview, image}) {
    const filePickRef = useRef(null);

    const filePickHandler = (e) => {
        filePickRef.current.click();
    }

    return (
        <div className="file">
            <button className="file__pick-button" onClick={filePickHandler}>
                {
                    (image) ? (<div className="file__pick-button__image-holder"><img className="file__pick-button__image" src={preview} alt=""/></div>) : (<p className="file__pick-button__content">+</p>)
                }
            </button>
            <input type="file" style={{display: 'none'}} ref={filePickRef} onChange={onChange}/>
        </div>
    )
}
