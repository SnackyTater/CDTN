import {useState} from 'react';

import './genderPicker.css';

import Button from '../../common/component/button/button';
import {gender} from '../../const/gender';

export default function GenderPicker({onClick}) {
    const [hightlight, setHighlight] = useState('');

    const clickHandler = (gender) => {
        setHighlight(gender);
        onClick(gender);
    }

    return (
        <div className='gender-picker'>
            {
                gender.map((gender) => 
                    <Button key={gender} className={(hightlight === gender) ? 'button active-button' : 'button'} content={gender} onClick={() => {clickHandler(gender)}}/>
                )
            }
        </div>
    )
}
