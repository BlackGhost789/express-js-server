const express = require('express');
const User = require('../database/schema/User')
const router = express.Router();
const cryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')


//Login

router.get('/login', async (req, res) => {
    const uname = req.query.username;
    const pwd =  cryptoJS.SHA256(req.query.password+"passkey").toString();

    const userdb = await User.findOne({'username' : uname, 'password' : pwd})
            console.log('hii')

 
        if(userdb){
            console.log(userdb)

            const accessToken = jwt.sign({
                id: userdb._id,
                isAdmin : userdb.isadmin,
            },
            "passkey",
            {expiresIn: "4d"});
            const {...data} = userdb._doc;
            res.status(200).json({...data, accessToken})
        }else{
            res.send({ msg : 'invalid informations'})
        }



})



//registering

router.post('/register', async (req, res) => {

    req.body.password = cryptoJS.SHA256(req.body.password+process.env.PWD_KEY).toString();

    const userdb = await User.findOne({'username' : req.body.username})
    try {
        if(userdb){
            res.json({ msg : 'user exists'})
        }else{
            const newUser = await User.create(req.body);
            newUser.save()
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.send(error)
    }


})

module.exports = router
