import {useState} from 'react';

import './genderPicker.css';

import Button from '../../common/component/button/button';
import {gender} from '../../const/gender';

export default function GenderPicker({genderArray, onClick, selected}) {
    const [hightlight, setHighlight] = useState('');

    const clickHandler = (gender) => {
        setHighlight(gender);
        onClick(gender);
    }

    const options = genderArray || gender;

    return (
        <div className='gender-picker'>
            {
                options.map((gender) => 
                    <Button 
                        key={gender} 
                        className={(hightlight === gender || selected === gender) ? 'button active-button' : 'button'} 
                        content={gender} 
                        onClick={() => {clickHandler(gender)}}
                    />
                )
            }
        </div>
    )
}
