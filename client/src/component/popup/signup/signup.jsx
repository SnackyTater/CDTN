import './signup.scss';

//import component
import { DefaultBackdrop, TextInput } from '../../';

export default function Signup({isOpen, closeSignupForm}) {

    if(!isOpen) return null
    return (
        <>
            <DefaultBackdrop/>
            <div className="form-signup">
                aaaaaa
            </div>
        </>
    )
}

