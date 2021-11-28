const express = require('express');
const router = express.Router();

const {addPassion, updatePassion, deletePassion, getPassionList, getOnePassion} = require('../controller/passion');

router.get('/', async   (req, res) => {
    try{
        const passionList = await getPassionList();
        res.status(200).json(passionList);
    } catch(err) {
        res.json(err);
    }
})

router.get('/:id', async   (req, res) => {
    try{
        const passion = await getOnePassion(req.params.id);
        if(passion != null) res.status(200).json(passion);
        else res.status(404).json({message: "no passion was found with given ID"});
    } catch(err) {
        res.json(err);
    }
})

router.post('/', async (req, res) => {
    try{
        const passion = await addPassion(req.body);
        res.status(200).json(passion);
    }catch(err){
        res.json(err);
    }
})

router.put('/:id', async   (req, res) => {
    try{
        const passion = await updatePassion(req.params.id, req.body);
        res.status(200).json({query: passion, message: 'updated successfully'})
    } catch(err) {
        res.json(err);
    }
})

router.delete('/:id', async   (req, res) => {
    try{
        const passion = await deletePassion(req.params.id);
        res.status(200).json({query: passion, message: "delete passion successfully"})
    } catch(err) {
        res.json(err);
    }
})


module.exports = router;