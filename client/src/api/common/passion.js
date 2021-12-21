import {fetcher} from '../api';

const getPassion = () => {
    return fetcher.get({
        url: 'passion'
    })
}

export {getPassion}