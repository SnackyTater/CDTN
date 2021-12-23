import {fetcher} from '../api';

const login = ({username, password}) => {
    return fetcher.post({
        url: 'account/login',
        body: {
            identityVerification: username,
            password: password
        }
    })
};
const sendEmail = ({email}) => {
    return fetcher.post({
        url: 'account/email-verificate',
        body: {
            email: email
        }
    })
}
const getAccountInfo = ({token}) => {
    return fetcher.get({
        url: 'account',
        token: token
    })
}
const createAccount = ({accountInfo, userInfo}) => {
    return fetcher.post({
        url: 'account',
        body: { accountInfo, userInfo }
    })
}
const updateAccount = ({body}) => {
    return fetcher.put({
        url: 'account',
        body: body
    })
}
const deleteAccount = ({token}) => {
    return fetcher.delete({
        url: 'account',
        token: token
    })
}

export {login, getAccountInfo, createAccount, updateAccount, deleteAccount, sendEmail}