const Products = require('../models/product') 


const getAllProductStatic = async (req,res) => {
     const products  = await Products.find({
        featured: true
    })
    res.status(200).json({products,nbHits: products.length});
}
const getAllProduct = async (req,res) => {

    const {featured, company,name,rating} = req.query;
    const queryObj = {};
    if(featured){
        queryObj.featured = featured === 'true'? true : false
    }
    if(company){
        queryObj.company = company;
    }
    if(name){
        queryObj.name = {$regex: name, $options: 'i'};  //option i is for case-insensitive
    }
    if(rating){
        queryObj.rating = {$gt: Number(rating)}
    }
    console.log(queryObj)
    const products = await Products.find(queryObj)
    res.status(200).json({products, nbHits: products.length});
}

module.exports = {getAllProduct,getAllProductStatic}