const { Router } = require('express');
const { authenticateToken } = require('../authorization/auth');
const router = Router();

const {getChatList, getChatByRoomID} = require('../db/controller/chatLog');

router.get('/', authenticateToken, async (req, res) => {
    const list = await getChatList(req.tokenInfo._id)
    res.status(200).json(list);
})

router.get('/:id', authenticateToken, async(req, res) => {
    const chatLog = await getChatByRoomID(req.params.id);
    if(chatLog != null) res.status(200).json(chatLog)
    if(chat == null) res.status(404).send('no conversation was found with given id');
})

module.exports = router;