const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index')
const session = require('express-session')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(routes)
app.listen(port, (req, res) =>{
    console.log('port', port)
})