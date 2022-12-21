


function testControllers(){
    return{
        async showData(req,res){
            try{
                console.log(req.body)
                let datas = {
                    a: req.body.h,
                    
                    c: req.body.o
                }
                res.status(202).json({message: "Data was  found", data: datas,})
            }
            catch(err){
                res.status(404).json({message: err})
            }
        }        
    }
}

module.exports = testControllers