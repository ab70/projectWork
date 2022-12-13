const adminRoute = require('../routes/adminRoute/adminRoute')
const authRoute = require('./authRoute/authRoute')

function initRoutes(app){
    app.use('/api/auth', authRoute)
    app.use('/api/admin', adminRoute)
}

module.exports = initRoutes