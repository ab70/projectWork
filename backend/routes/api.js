
const authRoute = require('./authRoute/authRoute')

function initRoutes(app){
    app.use('/api/auth', authRoute)
}

module.exports = initRoutes