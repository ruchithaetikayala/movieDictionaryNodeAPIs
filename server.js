const mongoose = require('mongoose')
require('dotenv').config();

//uncaugh exception -Synchronous code like undefined varibles used in code
process.on('uncaughtException',err=>{
    console.log('Uncaught Exception...Shutting Down....')
    console.log(err.name,err.message)
    //shutdown immediately
    process.exit(1)

})

const app = require('./app')

const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD)
mongoose.connect(DB)
    .then(()=>console.log('DB connection successful')) 
    //.catch(err => console.log('DB connection failure',err))

const port = process.env.PORT || 3000;
const server = app.listen(port,()=>{
    console.log(`App running on port ${port}...`)
})

//to handle unhandled errors -> like DB down
process.on('unhandledRejection',err =>{
    console.log('Unhandled rejection...Shutting Down....')
    console.log(err.name,err.message)
    //gracefull shutting down
    server.close(()=>{
        process.exit(1)
    }) 
})

