//css
import './signup.scss';

import UserForm from './component/main/form/user/user';
import AccountForm from './component/main/form/account/account';

export default function Signup(){

    return (
        <div className='signup'>
            <header className='signup__header'>
                <div className='navbar'></div>
            </header>
            <div className='signup__content'>
                <UserForm />
                <p>account</p>
                <AccountForm />
            </div>
        </div>
    )
}