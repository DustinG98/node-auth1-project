const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const UsersRouter = require('./users/users-router')
const AuthRouter = require('./auth/auth-router')
const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session)

const protected = require('./auth/restricted-middleware')


const server = express()


server.use(express.json())
server.use(helmet())
server.use(cors())

server.use(
    session({
      name: 'notsession', // default is connect.sid
      secret: 'nobody tosses a dwarf!',
      cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false, 
      },
      httpOnly: true, 
      resave: false,
      saveUninitialized: false,
      store: new knexSessionStore(
          {
              knex: require('./data/dbConfig'),
              tablename: "sessions",
              sidfieldname: "sid",
              createtable: true,
              clearInterval: 3600 * 1000
          }
      )
    })
  );

server.get('/', (req, res) => {
    res.json({ message: "Server is connected." })
})

server.get('/greet', (req, res) => {
    res.send('Hello' + req.session.name)
})


server.use('/api', AuthRouter)
server.use('/api/users', protected ,UsersRouter)

module.exports = server;