const router = require('express').Router();
const {verifyToken, verifyTokenAuthorization, verifyTokenAdmin} = require('./jwt')
const User = require('../database/schema/User')

//Get all users : authorized only admin

router.get('/all', verifyTokenAdmin, async (req, res) => {
    try {
        const users =  await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})


//update user : authorized for the user it self

router.get('/update/:id', verifyTokenAuthorization, async (req, res) => {
    try {
        await User.updateOne({'_id' : req.params.id}, req.body)
        res.status(201).send('user updated')
    } catch (error) {
        res.status(500).send(error)
    }
})


//delete user : authorized only for amdin
router.get('/delete/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const user = User.findOne({'_id': req.params.id});
        if(!user) res.status(404).send('user not found')
        await User.deleteOne({'_id' : req.params.id}, {$exists : false})
        res.status(200).send('user deleted')
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router;