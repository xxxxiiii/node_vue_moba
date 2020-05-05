const express = require('express')

const app = express()

app.use(express.json())
app.use(require('cors')())
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web')) //将web静态文件托管到根路径
app.use('/uploads', express.static(__dirname + '/uploads'))

app.set('secret', 'jidsonncs92nkd')

require('./routes/admin')(app)
require('./plugins/db')(app)
require('./routes/web')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000/')
})