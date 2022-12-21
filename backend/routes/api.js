const adminRoute = require('../routes/adminRoute/adminRoute')
const authRoute = require('./authRoute/authRoute')
const productRoute = require('./productRoute/productRoute')
const testRoute = require('./testRoute/testRoute')

function initRoutes(app){
    app.use('/api/auth', authRoute)
    app.use('/api/admin', adminRoute)
    app.use('/api/product', productRoute)
    app.use('/api/test', testRoute)
}

module.exports = initRoutes