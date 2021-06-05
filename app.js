const express = require('express')
const app = express()
const hbshelpers = require('handlebars-helpers')();
const port = 3000

const exphbs = require('express-handlebars')
const generateTrashTalk = require('./generate_trash_talk')

app.engine('hbs', exphbs({ default: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(express.urlencoded({ extended: true }))

// setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const character = req.body.character
  const rubbish = generateTrashTalk(character)
  res.render('index', { character, rubbish })
})

// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})
