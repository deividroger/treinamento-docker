const express = require('express')
const restful = require('node-restful')
const server = express()
const bodyparser = require('body-parser')
const cors = require('cors')

const mongoose = restful.mongoose

mongoose.Promise = global.Promise


//Database
mongoose.connect('mongodb://db/mydb')

server.use(bodyparser.urlencoded({extended:true}))
server.use(bodyparser.json())
server.use(cors())

const Client = restful.model('CLient',{
    name: {type: String, require:true}
})

Client.methods(['get','post','put','delete'])
Client.updateOptions({new:true,runValidators:true})

Client.register(server,'/clients')


//Start Server
server.listen(3000)