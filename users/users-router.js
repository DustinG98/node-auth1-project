const express = require('express')

const Users = require('./users-model')

const router = express.Router();

const bcrypt = require('bcryptjs') 


//GET ALL USERS - PROTECTED

router.get('/', (req, res) => {
    Users.getAllUsers()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.json({ message: "error", err })
        })
})


module.exports = router