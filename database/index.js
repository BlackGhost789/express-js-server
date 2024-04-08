const mongo = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

mongo.connect(process.env.MONGO_URL)
.then(()=> {console.log('connected to database')})
.catch((err)=> {console.log(`error ${err}`)})

