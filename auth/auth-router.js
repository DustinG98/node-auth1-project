const express = require('express')

const Users = require('./auth-model')

const router = express.Router();

const bcrypt = require('bcryptjs') 

//REGISTER

router.post('/register', (req, res) => {
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 14)

    credentials.password = hash;

    Users.addUser(credentials)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.json({ message: "There was an error adding the user." })
        })
})


//LOGIN
router.post('/login', (req, res) => {
    const { username } = req.body;
    Users.findUsername(username)
        .then(user => {
            if(user[0] && bcrypt.compareSync(req.body.password, user[0].password)) {
                req.session.username = user[0].username
                res.status(200).json({ message: `Welcome ${user[0].username}!` })
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(error => {
            res.status(500).json({message: "error", error})
        })
})

//LOGOUT

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.send('error logging out')
            } else {
                res.send('good bye')
            }
        })
    }
})

module.exports = router;
