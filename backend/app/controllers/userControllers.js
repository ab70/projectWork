function userControllers(){
    return {
        //Add product by user
        async addNewProductUser(req, res) {
            try {
                // await ProductSchema.deleteMany()
                console.log(req.body);
                if (!req.files) {
                    console.log("Files not found");
                }
                else {
                    console.log("Files found");
                }
                let databody = new ProductSchema(req.body)
                databody.userId = '6398732316bd7468e63fa39a'

                let i = 0
                req.files.forEach(e => {
                    databody.productImgs.push({ img: e.filename, longImg: req.body.productImg[i].longImg })
                });
                console.log(databody);
                const postproduct = await databody.save()
                if (postproduct) {
                    res.status(200).json({ success: true, message: "Product Saved", data: databody })
                }
                else {
                    res.status(401).json({ success: false, message: "Product couldn't save", })
                }

            }
            catch (err) {
                console.log(err);
                res.status(404).json({ success: false, message: err, })
            }
        },

        //Edit product by user
        async editproductUser(req, res) {
            try {
                if (!req.files) {
                    let id = req.body.id
                    let databody = req.body
                    delete databody.id
                    databody.acceptDescription='reject'
                    let editedData = await FeatureSchema.findOneAndUpdate({ "_id": id }, databody)
                    editedData ? res.status(200).json({ success: true, message: "Edited done data" })
                    :
                    res.status(401).json({ success: false, message: "Edited not successful." })
                }
                else {
                    let id = req.body.id
                    let databody = req.body
                    delete databody.id
                    if((databody.editDescription!=="") && (databody.acceptDescription==='accept')){
                        databody.description = databody.editDescription
                    }
                    let i = 0
                    req.files.forEach(e => {
                        databody.productImgs.push({ img: e.filename, longImg: req.body.productImg[i].longImg })
                    });
                    let editedData = await FeatureSchema.findOneAndUpdate({ "_id": id }, databody)
                    editedData ? res.status(200).json({ success: true, message: "Data updated with image" })
                    :
                    res.status(401).json({ success: false, message: "Data update failed" })
                }
            }
            catch (err) {
                res.status(404).json({ success: false, message: err })
            }
        },

        
    }
}