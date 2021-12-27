import { useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';
import { LoadingButton, GenderPicker, AgeSlider, RangeSlider, Switch } from '../../../../../../component';

//import hooks
import { userInitialState, userReducer, userAction } from '../../../../../../store';

//import fetcher
import { getUserInfo, updateUserInfo } from '../../../../../../api/common/user';

export default function Config({setLoading, setSnackbar}) {
    const [state, dispatch] = useReducer(userReducer, userInitialState);
    const [cookies] = useCookies(['jwt']);
    const { SET_USER_CONFIG, SET_USER } = userAction;

    useEffect(() => {
        setLoading(true);
        getUserInfo({token: cookies.jwt}).then((data) => {
            dispatch({
                type: SET_USER,
                payload: data
            })
            setLoading(false);

        }).catch((err) => {
            setSnackbar({
                isOpen: true,
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
                body: state.user,
            })

            setLoading(false);

            const {modifiedCount, matchedCount} = status;
            if(modifiedCount && matchedCount) setSnackbar({
                isOpen: true,
                severity: 'success',
                message: 'config updated successfully'
            })
            else setSnackbar({
                isOpen: true,
                severity: 'info',
                message: 'config hasnt been changed'
            })
        } catch(err) {
            setSnackbar({
                isOpen: true,
                severity: 'error',
                message: `cant save config info due to ${err.message}`
            })
        }
    }

    const changeHanlder = (e) => {    
        const {name, value} = e.target;
        console.log(name,value, SET_USER_CONFIG)
        dispatch({
            type: SET_USER_CONFIG,
            payload: { name, value}
        })
        // console.log('aaa')
    }

    return (
        <div className='profile__form__container'>
            <div className='profile__form__content' style={{"width": '300px'}}>
                <h2 className='profile__form__content__title'>age preference</h2>
                <AgeSlider
                    name={'age'}
                    age={[state.user.matchMaking.config.age.from, state.user.matchMaking.config.age.to]}
                    setAge={changeHanlder}
                />

                <h2 className='profile__form__content__title'>distance preference</h2>
                <RangeSlider
                    name={'diameter'}
                    inputRange={state.user.matchMaking.config.zoneLimit.diameter/10000}
                    onChange={changeHanlder}
                />

                <span>only show people in this range</span>
                <Switch
                    checked={state.user.matchMaking.config.gender}
                    name={'disableDiameter'}
                    onChange={(e) => changeHanlder(e)}
                />

                <h2 className='profile__form__content__title'>looking for</h2>
                <GenderPicker
                    genderArray={['male', 'female', 'both']}
                    name={'gender'}
                    selected={state.user.matchMaking.config.gender}
                    onClick={changeHanlder}
                />

                <div className='profile__content__form__button'>
                    <LoadingButton onClick={saveConfigHandler} placeholder={'save'} width={'200px'}/>
                </div>
            </div>
        </div>
    )
}
