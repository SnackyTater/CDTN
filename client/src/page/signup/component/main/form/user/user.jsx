import _ from 'lodash/fp';
import { useReducer, useEffect, useState } from 'react';
import { getPassion } from '../../../../../../api/common/passion';
import { TextInput, GenderPicker, PassionPicker, ImageCardList, TextAreaInput, DatePicker } from '../../../../../../component';
import { userAction, userInitialState, userReducer } from '../../../../../../store';

import './user.scss'

export default function User() {
    const [passions, setPassion] = useState([]);
    const [state, dispatch] = useReducer(userReducer, userInitialState);
    const { SET_USER_INFO, SET_USER_IMAGE, SET_USER_PASSION } = userAction;

    useEffect(() => {
        getPassion().then((list) => {
            console.log(list)
            setPassion(list);
        }).catch((err) => {
            console.log(err);
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
        e.preventDefault();
        const {value} = e.target;
        console.log(value);
        dispatch({
            type: SET_USER_PASSION,
            payload: {
                value: value
            }
        })
    }

    const imageChangeHandler = ({imagePublicID, imageURL}) => {
        console.log(imagePublicID, imageURL);
        dispatch({
            type: SET_USER_IMAGE,
            payload: {
                value: {
                    imagePublicID,
                    imageURL
                }
            }
        })
    }

    return (
        <div className='user-form'>
            <div className='user-form__content'>
                <div style={{margin: ' 0 auto'}}>
                    
                    <TextInput 
                        name={'fullName'}
                        label={'full name'}
                        onChange={changeHanlder}
                    />

                    <h3>gender</h3>
                    <GenderPicker 
                        onClick={changeHanlder}
                    />

                    <h3>select passion</h3>
                    <PassionPicker 
                        passions={passions}
                        selectPassion={passionChangeHandler}
                        selectedPassion={state.user.info.passions}
                    />

                    <h3>date of birth</h3>
                    <DatePicker 
                        label={'date of birth'}
                        name={'DateOfBirth'}
                        onChange={changeHanlder}
                    />

                    <h3>tell us about yourself</h3>
                    <TextAreaInput 
                        name={'description'}
                        onChange={changeHanlder}
                    />
                </div>
            </div>
            <div className='user-form__content'>
                <div style={{margin: ' 0 auto'}}>
                    <h3>Profile image</h3>
                    <ImageCardList
                        row={[1,2]}
                        column={[1,2,3]}
                        onChange={imageChangeHandler}
                    />
                </div>
            </div>
        </div>
    )
}
