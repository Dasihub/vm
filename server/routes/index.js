const express = require('express')

const checkToken = require('../modules/checkToken')

const app = express()

app.use('/', require('./AuthRoutes'))
app.use('/selectors', require('./SelectorRoute'))
app.use('/jurnal', require('./JurnalRoute'))
app.use('/dekanat', require('./DekanatRoute'))
app.use('/teacher', require('./TeacherRoute'))
app.use('/reports', require('./ReportRoute'))
app.use('/student', require('./StudentRoute'))

module.exports = app
