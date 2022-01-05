import { createContext, useState } from 'react';

export const HomeContext = createContext(null);

export const HomeContextStore = () => {
    const [userInfo, setUserInfo] = useState({});
    const [matchList, setMatchList] = useState([]);
    const [recommendList, setRecommending] = useState([]);
    const [reloadSidebar, setReloadSidebar] = useState(false);
    const [reloadMain, setReloadMain] = useState(false);

    const store = {
        userInfo: [userInfo, setUserInfo],
        matchList: [matchList, setMatchList],
        recommendList: [recommendList, setRecommending],
        reloadMatchList: [reloadSidebar, setReloadSidebar],
        reloadRecommend: [reloadMain, setReloadMain],
    };

    return store;
}
