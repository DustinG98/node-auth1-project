const db = require('../data/dbConfig')


//GET ALL USERS
function getAllUsers() {
    return db('users').select('id', 'username')
}

//GET USER BY ID
function getUserById(id) {
    return db('users').where({ id }).select('id', 'username')
}

//ADD USER
function addUser(user) {
    return db('users').insert(user)
        .then(ids => {
            return getUserById(ids[0])
        })
}

//FIND BY USERNAME
function findUsername(username) {   
    return db('users').where({ username: username })
}

module.exports = {
    getUserById,
    addUser,
    findUsername,
    getAllUsers
}