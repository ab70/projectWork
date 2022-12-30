
const ProductSchema = require('../models/Product')

function testControllers(){
    return{
        async showData(req,res){
            try{
                
                let datas  = await ProductSchema.find().count() + 1
                
                console.log(datas);
                res.status(202).json({message: "Data was  found", data: datas,})
            }
            catch(err){
                res.status(404).json({message: err})
            }
        }        
    }
}

module.exports = testControllers