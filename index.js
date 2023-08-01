
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()


const port = process.env.SERVER_PORT  

app.use(express.json())


app.use('/api', require('./api/users/router'))
app.use('/api', require('./api/catagory/router'))



// mongoose.connect(process.env.MONGO_URL)
// .then(() => console.log("DB Conn"))
// .catch((err) => console.log("Something went wrong"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})