const Products = require('../models/product') 


const getAllProductStatic = async (req,res) => {
     const products  = await Products 
        .find({})
        .sort('name')
        .select('name company')
        .skip(1) 
        .limit(4)
              //sort,select,limit,skip methods should be chained to find
    res.status(200).json({products,nbHits: products.length});
}
const getAllProduct = async (req,res) => {

    const {featured, company,name,numericFilters,sort,field} = req.query;
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
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx = /\b(>|>=|=|<|<=)/g;
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`) //price>40 become price-$gt-40
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-') 
            if(options.includes(field)){
                queryObj[field] = {[operator]:Number(value) }
            }
        })
    }
    
    
    let result =  Products.find(queryObj)

    //sort
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }

    //select - only shows selected field or records
    if(field){
        const fieldList = field.split(',').join(' ')
        result = result.select(fieldList)
    }


    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1 ) * limit ; //logic

    if(skip){
        result = result.skip(skip)
    }
    if(limit){
        result = result.limit(limit)
    }

    const products = await result
    res.status(200).json({nbHits: products.length,products});
}

module.exports = {getAllProduct,getAllProductStatic}