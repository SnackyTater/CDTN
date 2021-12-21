import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import AgeSlider from '../../../modules/age-slider/age-slider';
import RangeSlider from '../../../modules/range-slider/range-slider';
import Switch from '../../../common/component/switch/switch';
import GenderPicker from '../../../modules/gender-picker/genderPicker';

import LoadingButton from '../../../common/component/button/loading-button/loading-button';

//import hooks
import userHook from '../../../common/hooks/userInfo/user';

//import fetcher
import {getUserInfo, updateUserInfo} from '../../../api/common/user';

export default function Setting({setLoading, setSnackbar}) {
    const { user, setUser, setRange, toggleRange, setMatchMakingGender, setMatchMakingAge} = userHook();
    const [cookies] = useCookies(['jwt']);

    useEffect(() => {
        setLoading(true);
        getUserInfo({token: cookies.jwt}).then((data) => {
            setUser(data);
            setLoading(false);
        }).catch((err) => {
            setSnackbar({
                severity: 'error',
                message: `cant load config info due to ${err.message}`
            })
        })
    }, [])

    const saveConfigHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const status = await updateUserInfo({
                token: cookies.jwt,
                body: user,
            })

            setLoading(false);

            const {modifiedCount, matchedCount} = status;
            if(modifiedCount && matchedCount) setSnackbar({
                severity: 'success',
                message: 'config updated successfully'
            })
            else setSnackbar({
                severity: 'info',
                message: 'config hasnt been changed'
            })
        } catch(err) {
            setSnackbar({
                severity: 'error',
                message: `cant save config info due to ${err.message}`
            })
        }
    }

    return (
        <div className='profile__form__container'>
            <div className='profile__form__content' style={{"width": '300px'}}>
                <h2 className='profile__form__content__title'>age preference</h2>
                <AgeSlider
                    age={[user.matchMaking.config.age.from, user.matchMaking.config.age.to]}
                    setAge={(age) => {setMatchMakingAge(age)}}
                />

                <h2 className='profile__form__content__title'>distance preference</h2>
                <RangeSlider
                    inputRange={user.matchMaking.config.zoneLimit.diameter/10000}
                    onChange={setRange}
                />

                <span>only show people in this range</span>
                <Switch
                    checked={user.matchMaking.config.gender}
                    onChange={toggleRange}
                />

                <h2 className='profile__form__content__title'>looking for</h2>
                <GenderPicker
                    genderArray={['male', 'female', 'both']}
                    selected={user.matchMaking.config.gender}
                    onClick={(gender) => {setMatchMakingGender(gender)}}
                />

                <div className='profile__form__button'>
                    <LoadingButton onClick={saveConfigHandler} placeholder={'save'} width={'200px'}/>
                </div>
            </div>
        </div>
    )
}
