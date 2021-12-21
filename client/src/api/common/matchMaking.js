import {fetcher} from '../api';

const toggleLikeUser = ({token, targetID}) => {
    return fetcher.post({
        url: 'matchMaking/like',
        token: token,
        body: {
            targetID: targetID
        }
    })
}

const toggleNopeUser = ({token, targetID}) => {
    return fetcher.post({
        url: 'matchMaking/nope',
        token: token,
        body: {
            targetID: targetID
        }
    })
}

const getRecommend = ({token}) => {
    return fetcher.get({
        url: 'matchMaking/recs',
        token: token
    })
}

const unmatchUser = ({token, targetID}) => {
    return fetcher.post({
        url: 'matchMaking/unmatch',
        token: token
    })
}

const getMatches = ({token}) => {
    return fetcher.get({
        url: 'matchMaking/get-matches',
        token: token
    })
}

export { toggleLikeUser, toggleNopeUser, getRecommend, unmatchUser, getMatches }