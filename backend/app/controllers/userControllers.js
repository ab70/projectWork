function userControllers(){
    return {
        //Add product by user

        async addNewProduct(req, res) {
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
        //Edit product by 
    }
}