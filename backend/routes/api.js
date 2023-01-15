const adminRoute = require('../routes/adminRoute/adminRoute')
const authRoute = require('./authRoute/authRoute')
const packageRoute = require('./productRoute/packageRoute')
const productRoute = require('./productRoute/productRoute')
const blogRoute = require('./blogRoute/blogRoute')
const productBoostRoute = require('./productBoostRoute/productBoostRoute')
const countRoute = require('./countRoute/countRoute')
const testRoute = require('./testRoute/testRoute')


function initRoutes(app){
    app.use('/api/auth', authRoute)
    app.use('/api/admin', adminRoute)
    app.use('/api/product', productRoute)
    app.use('/api/package', packageRoute)
    app.use('/api/productboost',productBoostRoute)
    app.use('/api/count',countRoute)
    app.use('/api/blog', blogRoute)
    app.use('/api/test', testRoute)
}

module.exports = initRoutes