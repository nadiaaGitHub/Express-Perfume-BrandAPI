const app = require('express')
const router = app.Router()

const { SignUp, Login} = require('./controller')



router.post('/signup', SignUp)
router.post('/login', Login)





module.exports = router