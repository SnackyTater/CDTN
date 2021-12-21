import {fetcher} from '../api';

const getChatList = ({token}) => {
    return fetcher.get({
        url: 'chat',
        token: token
    })
}

const getChatContent = ({token, chatID}) => {
    return fetcher.get({
        url: `chat/${chatID}`,
        token: token
    })
}

export { getChatList, getChatContent }