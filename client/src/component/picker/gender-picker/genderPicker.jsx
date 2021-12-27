import {useState} from 'react';

import { SimpleButton } from '../../';
import { gender } from '../../../const/gender';

import './genderPicker.scss'

export default function GenderPicker({genderArray, onClick, selected, name, error}) {
    const [hightlight, setHighlight] = useState('');

    const clickHandler = (e) => {
        setHighlight(e.target.value);
        onClick(e);
    }

    const options = genderArray || gender;

    return (
        <div className='gender-picker'>
            {
                options.map((gender, index) => 
                    <SimpleButton 
                        key={index}
                        name={name}
                        value={gender}
                        className={(hightlight === gender || selected === gender) ? 'simple-button--active' : 'simple-button'} 
                        content={gender} 
                        onClick={clickHandler}
                    />
                )
            }
            {!error?.status && <h3 className='gender-picker-error'>{error?.message}</h3>}
        </div>
    )
}
