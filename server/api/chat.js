const { Router } = require('express');
const { authenticateToken } = require('../authorization/auth');
const router = Router();

const {getChatList, getChatByRoomID} = require('../controller/chat');

router.get('/', authenticateToken, async (req, res) => {
    try{
        const list = await getChatList(req.tokenInfo.UID);

        res.status(200).json(list);
    } catch(err) {
        res.status(400).send(err.message);
    }
    
})

router.get('/:id', authenticateToken, async(req, res) => {
    try{
        const chatLog = await getChatByRoomID(req.params.id);
        if(chatLog != null) res.status(200).json(chatLog);
        if(chatLog == null) res.status(404).send('no conversation was found with given id');
    } catch(err) {
        res.status(400).send(err.message);
    }
})

module.exports = router;