import {useState} from 'react';

import { SimpleButton } from '../../';
import { gender } from '../../../const/gender';

import './genderPicker.scss'

export default function GenderPicker({genderArray, onClick, selected}) {
    const [hightlight, setHighlight] = useState('');

    const clickHandler = (e) => {
        setHighlight(e.target.value);
        onClick(e.target.value);
    }

    const options = genderArray || gender;

    return (
        <div className='gender-picker'>
            {
                options.map((gender, index) => 
                    <SimpleButton 
                        key={index}
                        name={'gender'}
                        className={(hightlight === gender || selected === gender) ? 'simple-button--active' : 'simple-button'} 
                        content={gender} 
                        onClick={clickHandler}
                    />
                )
            }
        </div>
    )
}
