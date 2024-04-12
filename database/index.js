const mongo = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

mongo.connect(process.env.MONGO_URI)
.then(()=> {console.log('connected to database')})
.catch((err)=> {console.log(`error ${err}`)})

