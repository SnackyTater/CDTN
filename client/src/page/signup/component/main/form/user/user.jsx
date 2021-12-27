import _ from 'lodash/fp';
import { useEffect, useState } from 'react';
import { getPassion } from '../../../../../../api/common/passion';
import { TextInput, GenderPicker, PassionPicker, ImageCardList, TextAreaInput, DatePicker } from '../../../../../../component';
import { userAction } from '../../../../../../store';
import { getLocation } from '../../../../../../utils/utils';

import './user.scss'

export default function User({state, dispatch, setLoading}) {
    const [passions, setPassion] = useState([]);
    const { SET_USER_INFO, SET_USER_IMAGE, SET_USER_PASSION } = userAction;

    useEffect(() => {
        Promise.all([getPassion(), getLocation()]).then((data) => {
            const passionList = data[0];
            const { coords } = data[1];

            setPassion(passionList);
            dispatch({
                type: SET_USER_INFO,
                payload: {
                    name: 'coordinates',
                    value: [coords.longitude, coords.latitude]
                }
            })
            setLoading(false);
        })
    }, [])

    const changeHanlder = (e) => {
        // e.preventDefault();
        const {name, value} = e.target;
        dispatch({
            type: SET_USER_INFO,
            
            payload: {
                name: name,
                value: value,
                validate: true,
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
                <div style={{margin: ' 0 0'}}>
                    
                    <h3>full name</h3>
                    <TextInput 
                        name={'fullName'}
                        onChange={changeHanlder}
                        error={state?.error?.fullName}
                    />

                    <h3>gender</h3>
                    <GenderPicker
                        name={'gender'}
                        onClick={changeHanlder}
                        error={state?.error?.gender}
                    />

                    <h3>interest in</h3>
                    <GenderPicker
                        name={'interestIn'}
                        onClick={changeHanlder}
                        genderArray={['male', 'female', 'both']}
                        error={state?.error?.interestIn}
                    />

                    <h3>select passion</h3>
                    <PassionPicker 
                        passions={passions}
                        selectPassion={passionChangeHandler}
                        selectedPassion={state.user.info.passions}
                        error={state.error.passions}
                    />

                    <h3>date of birth</h3>
                    <DatePicker 
                        label={'date of birth'}
                        name={'DateOfBirth'}
                        onChange={changeHanlder}
                        error={state?.error?.DateOfBirth}
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
                        error={state?.error?.profileImage}
                    />
                </div>
            </div>
        </div>
    )
}
