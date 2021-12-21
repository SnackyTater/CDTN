import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';

//load component
import LoadingButton from '../../../common/component/button/loading-button/loading-button';
import CustomTextInput from '../../../common/component/input/text/input';

//load module
import ImageCardList from '../../../modules/image-card-list/image-card-list';
import GenderPicker from '../../../modules/gender-picker/genderPicker';
import PassionPicker from '../../../modules/passions-picker/passion-picker';

//load hooks
import userHook from '../../../common/hooks/userInfo/user';

import {getUserInfo, updateUserInfo} from '../../../api/common/user';
import {getPassion} from '../../../api/common/passion';

export default function FormProfile({setLoading, setSnackbar, setImage, setName}) {
    const {user, error, SetUser, setUser, SetPassions, SetImage, userSubmitHandler} = userHook();
    const [cookies] = useCookies('jwt');

    const [passions, setPassion] = useState([]);
    
    useEffect(() => {
        setLoading(true);
        getUserInfo({token: cookies.jwt}).then((data) => {
            setName(data.info.fullName);
            setImage(data.info.profileImage[0]);
            setUser(data);
            getPassion().then((passionList) => {
                setPassion(passionList);
                setLoading(false);
            }) 
        }).catch((error) => {
            setSnackbar({
                severity: 'error',
                message: `cant load user info due to ${error.message}`
            })
        })
    }, []);

    const userChangeHandler = (e) => {
        SetUser(e, true);
    }

    const userPassionsChangeHandler = (e) => {
        SetPassions(e);
    }

    const userImageChangeHandler = (imageInfo) => {
        SetImage(imageInfo);
    }

    const userInfoSaveHandler = async(e) => {
        e.preventDefault();
        const checker = userSubmitHandler();
        if(checker){
            const status = updateUserInfo({token: cookies.jwt, body: user});
            const {modifiedCount, matchedCount} = status;
            if(modifiedCount && matchedCount) setSnackbar({
                severity: 'success',
                message: 'config updated successfully'
            })
            else setSnackbar({
                severity: 'info',
                message: 'config hasnt been changed'
            })
        }
    }

    const inputFormList = [
        {
            name: 'fullName',
            label: 'full name',
        },{
            name: 'DateOfBirth',
            label: 'date of birth',
            type: 'date'
        },{
            name: 'description',
            label: 'tell us about yourself'
        }
    ]

    return (
        <div className='profile__form__container'>
            <div className='profile__form__content'>
                <h2 className="form__field-name">image</h2>
                <ImageCardList 
                    row={[1,2,3]}
                    column={[1,2,3]} 
                    onChange={(imageInfo) => {userImageChangeHandler(imageInfo)}}
                    inputImageList={user.info.profileImage}
                />

                <h2 className="form__field-name">gender</h2>
                <GenderPicker 
                    onClick={(gender) => {
                        userChangeHandler({target: {name: 'gender', value: gender}});
                    }} 
                    selected={user.info.gender}
                />

                <h2 className="form__field-name">passions</h2>
                <PassionPicker 
                    passions={passions} 
                    selectPassion={(passion) => {userPassionsChangeHandler(passion)}}
                    selectedPassion={user.info.passions}
                />
                
                {
                    inputFormList.map((item) => <CustomTextInput 
                        label={item?.label}
                        name={item?.name}
                        type={item?.type}
                        placeholder={user?.info[item.name]}
                        onChange={userChangeHandler}
                        error={error[item?.name]}
                        key={item?.name}
                    />)
                }

                <div className='profile__form__button'>
                    <LoadingButton onClick={userInfoSaveHandler} placeholder={'save'} width={'200px'}/>
                </div>
            </div>
            
            
        </div>
    )
}
