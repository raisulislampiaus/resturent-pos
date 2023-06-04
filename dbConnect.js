const mongoose = require('mongoose')

const URL = 'mongodb+srv://raisulislam714:newpos123@cluster0.svjz6yw.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(URL)

let connectionObj = mongoose.connection

connectionObj.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull')
})

connectionObj.on('error' , ()=>{
    console.log('Mongo DB Connection Failed')
})

