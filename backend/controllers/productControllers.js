

const addProduct = async (req, res) => {
    try {

        const {name, price, description, category, choices, bestseller,} = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        console.log(name, price, description, category, choices, bestseller)

        res.json({})

    } catch (error) {
        res.json({success: false, message:error.message})
        console.log(error)        
    }

}

const listProducts = async (req, res) => {
    
}

const removeProduct = async (req, res) => {
    
}

const singleProduct = async (req, res) => {
    
}

export {addProduct, listProducts, removeProduct, singleProduct}