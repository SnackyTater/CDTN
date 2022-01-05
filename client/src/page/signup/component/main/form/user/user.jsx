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
        let isMounted = true;
        
        Promise.all([getPassion(), getLocation()]).then((data) => {
            const passionList = data[0];
            const { coords } = data[1];

            isMounted && setPassion(passionList);
            isMounted && dispatch({
                type: SET_USER_INFO,
                payload: {
                    name: 'coordinates',
                    value: [coords.longitude, coords.latitude]
                }
            })

            isMounted && setLoading(false);
        }).catch((error) => {
            if(error.message.includes('geolocation'))
                alert('you need to grant access to your location before using this function, please reload the page and allow it');
        })

        return () => {
            isMounted = false;
        } 
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
                    
                    <h3>Full Name</h3>
                    <TextInput 
                        name={'fullName'}
                        onChange={changeHanlder}
                        error={state?.error?.fullName}
                    />

                    <h3>Gender</h3>
                    <GenderPicker
                        name={'gender'}
                        onClick={changeHanlder}
                        error={state?.error?.gender}
                    />

                    <h3>Interest In</h3>
                    <GenderPicker
                        name={'interestIn'}
                        onClick={changeHanlder}
                        genderArray={['male', 'female', 'both']}
                        error={state?.error?.interestIn}
                    />

                    <h3>Select Passion</h3>
                    <PassionPicker 
                        passions={passions}
                        selectPassion={passionChangeHandler}
                        selectedPassion={state.user.info.passions}
                        error={state.error.passions}
                    />

                    <h3>Date of Birth</h3>
                    <DatePicker 
                        
                        name={'DateOfBirth'}
                        value={state.user.info.DateOfBirth}
                        onChange={changeHanlder}
                        error={state?.error?.DateOfBirth}
                    />

                    <h3>Tell Us About Yourself</h3>
                    <TextAreaInput 
                        name={'description'}
                        onChange={changeHanlder}
                    />
                </div>
            </div>
            <div className='user-form__content'>
                <div style={{margin: ' 0 auto'}}>
                    <h3>Profile Image</h3>
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
