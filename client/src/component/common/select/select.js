import {useState, useEffect} from 'react';
import './select.css';

export default function Select({name, type, onChange}) {
    const [gender] = useState([
        {value: 'gender', disabled: true, selected: true, hidden: true, name: 'gender'},
        {value: 'unknown', disabled: false, selected: false, hidden: false, name: 'prefer not saying'},
        {value: 'male', disabled: false, selected: false, hidden: false, name: 'male'},
        {value: 'female', disabled: false, selected: false, hidden: false, name: 'female'},
    ]);

    const [optionArray, setOptionArray]=useState([]);

    useEffect(()=> {
        if(type === 'gender') setOptionArray(gender);
    }, [optionArray])

    return (
        <select name={name} onChange={onChange}>
            {
                optionArray?.map((option) => {
                    return <option value={option?.value} disabled={option?.disabled} selected={option.selected} hidden={option.hidden}>{option?.name}</option>
                })
            }
        </select>
    )
}
