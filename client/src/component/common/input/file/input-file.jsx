import {useRef} from 'react';
import './input-file.css';

export default function Inputfile({onChange}) {
    const filePickRef = useRef(null);

    const filePickHandler = (e) => {
        filePickRef.current.click();
    }

    return (
        <div className="file">
            <button className="file__pick-button" onClick={filePickHandler}>
                <p className="file__pick-button-content">+</p>
            </button>
            <input type="file" style={{display: 'none'}} ref={filePickRef} onChange={onChange}/>
        </div>
    )
}
