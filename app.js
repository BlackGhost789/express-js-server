const express = require("express");
const cors = require('cors')
const auth = require('./routes/auth')
require('./database')
const users = require('./routes/users')


const app = express();

const port = 3000;

app.listen(port, ()=> console.log(`listening in port ${port}`))

app.use(cors({
    origin : '*'
}));

app.use(express.json())

app.use(auth)
app.use('/users',users)


app.get('/',(req, res)=>{
    res.send('server running');
})