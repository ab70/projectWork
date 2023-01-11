const {Packageschema,Vatschema,Bonusschema} = require('../models/Package')
const Sortschema = require('../models/Sorting')

function productBoost(){
    return{
        //get subcategory wise price
        async getPrice(req,res){
            try{
                let datas = await Packageschema.findOne({"single.subcategories":req.params.id})
                datas ? res.status(200).json({success:true,message:"Found",data:datas})
                :
                res.status(401).json({success:false,message:"can'tt find"})

            }
            catch(err){
                res.status(500).json({success:false,message:"can'tt find"})
            }
        }
    }
}