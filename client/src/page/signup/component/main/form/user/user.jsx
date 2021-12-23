import { values } from 'lodash';
import { useReducer, useEffect, useState } from 'react';
import { getPassion } from '../../../../../../api/common/passion';
import { TextInput, GenderPicker, PassionPicker } from '../../../../../../component';
import { userAction, userInitialState, userReducer } from '../../../../../../store';

export default function User() {
    const [passions, setPassion] = useState([]);
    const [state, dispatch] = useReducer(userReducer, userInitialState);
    const { SET_USER_INFO, SET_USER_IMAGE, SET_USER_PASSION } = userAction;

    useEffect(() => {
        console.log(userAction)
        getPassion().then((list) => {
            console.log(list)
            setPassion(list);
        })

    }, [])

    const changeHanlder = (e) => {
        e.preventDefault();

        const {name, value} = e.target;
        dispatch({
            type: SET_USER_INFO,
            payload: {
                name: name,
                value: value
            }
        })
    }

    const passionChangeHandler = (e) => {
        console.log(e);
        const {value, name} = e.target;
        console.log(value, name);
    }

    return (
        <div>
            <TextInput 
                name={'fullName'}
                label={'full name'}
                onChange={changeHanlder}
            />
            <GenderPicker 
                onClick={changeHanlder}
            />
            <PassionPicker 
                passions={passions}
                selectPassion={passionChangeHandler}
                selectedPassion={state.user.info.passions}
            />
        </div>
    )
}
