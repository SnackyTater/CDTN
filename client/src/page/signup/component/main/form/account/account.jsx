import { useReducer } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Mail, PhoneAndroid, Person, Password } from '@mui/icons-material';

import { TextInput } from '../../../../../../component';
import { acccountAction, accountInitialState, accountReducer} from '../../../../../../store';

export default function AccountForm() {
    const [state, dispatch] = useReducer(accountReducer, accountInitialState);
    const { SET_USER_INFO, SET_USER_IMAGE, SET_USER_PASSION } = acccountAction;

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
        <div>
            {   
                formList.map((item) => <TextInput
                    key={item.name}
                    placeholder={state.account[item.name]}
                    label={item?.label ? item?.label : item?.name}
                    name={item.name}
                    type={item.type}
                    error={state.error[item?.name]}
                    onChange={() => {console.log('s')}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                {item?.iconStart}
                            </InputAdornment>
                        )
                    }}
                />)
            }
        </div>
    )
}
