
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.6sujrau.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log('connected')
})
.catch((e=>console.log('error',e)))