import { InputAdornment } from '@mui/material';
import { Mail, PhoneAndroid, Person, Password } from '@mui/icons-material';

import { TextInput } from '../../../../../../component';
import { acccountAction } from '../../../../../../store';

export default function AccountForm({state, dispatch}) {
    const { SET_ACCOUNT_INFO } = acccountAction;

    const changeHanlder = (e) => {
        const {value, name} = e.target;
        dispatch({
            type: SET_ACCOUNT_INFO,
            payload: {
                name: name,
                value:  value,
                validate: true
            }
        })
    }

    const formList = [
        {
            name: 'username',
            iconStart: <Person/>
        },
        {
            name: 'email',
            iconStart: <Mail/>
        },
        {
            name: 'mobile',
            iconStart: <PhoneAndroid/>
        },
        {
            name: 'password',
            type: 'password',
            iconStart: <Password />
        },
        {
            name: 'password2',
            label: 're-enter password',
            type: 'password',
            iconStart: <Password />
        }
    ]

    return (
        <div className='account-form'>
            <div className='account-content'>
                {   
                    formList.map((item, index) => <div
                        key={index}
                    >
                        <h3>{item.label || item.name}</h3>

                        <TextInput
                            placeholder={state.account[item.name]}
                            name={item.name}
                            type={item.type}
                            error={state.error[item?.name]}
                            onChange={changeHanlder}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        {item?.iconStart}
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                        )
                }
            </div>
        </div>
    )
}
