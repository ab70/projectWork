const adminRoute = require('../routes/adminRoute/adminRoute')
const authRoute = require('./authRoute/authRoute')
const productRoute = require('./productRoute/productRoute')

function initRoutes(app){
    app.use('/api/auth', authRoute)
    app.use('/api/admin', adminRoute)
    app.use('/api/product', productRoute)
}

module.exports = initRoutes