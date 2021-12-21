import {fetcher} from '../api';

const getUserInfo = ({token}) => {
    return fetcher.get({
        url: 'user',
        token: token
    });
}

const updateUserInfo = ({token, body}) => {
    console.log(token);
    return fetcher.put({
        url: 'user',
        token: token,
        body: body
    })
}

export {getUserInfo, updateUserInfo}