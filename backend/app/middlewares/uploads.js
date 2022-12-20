const multer = require('multer')
const path = require('path')


const storages = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./backend/public/img')

    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'_'+Date.now()+'_'+file.originalname)
        
    }
})

const uploads = multer({storage: storages})

module.exports = uploads