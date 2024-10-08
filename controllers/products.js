
const getAllProductStatic = async (req,res) => {
    throw new Error('Static Error')
    res.status(200).json({msg: 'testing route'});
}
const getAllProduct = async (req,res) => {
    res.status(200).json({msg: 'products route'});
}

module.exports = {getAllProduct,getAllProductStatic}