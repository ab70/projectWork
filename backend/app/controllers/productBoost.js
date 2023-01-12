const {Packageschema,Vatschema,Bonusschema} = require('../models/Package')
const BoostedProduct = require('../models/BoostedProduct')
const Sortschema = require('../models/Sorting')

function productBoost(){
    return{
        //get subcategory wise price
        async getPrice(req,res){
            try{
                let datas = await Packageschema.findOne({"single.subcategories":req.params.id})
                datas ? res.status(200).json({success:true,message:"Found",data:datas})
                :
                res.status(401).json({success:false,message:"can't find"})

            }
            catch(err){
                res.status(500).json({success:false,message:"can't find"})
            }
        },
        //add boosted product
        async addBoostedProduct(req,res){
            try{
                let productBody = new BoostedProduct(req.body)
                const saveBoostedProduct = await productBody.save()
                saveBoostedProduct ? res.status(200).json({success:true,message:"Saved"})
                :
                res.status(401).json({success:false, message: "Can't save product"})
            }
            catch(err){
                res.status(500).json({success:false, message: err.message})
            }
        }
    }
}

module.exports = productBoost