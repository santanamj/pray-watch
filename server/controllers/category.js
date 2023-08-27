const Category = require ('./../model/category.js');
const Subproduct = require('./../model/subproducts');
const config = require ('./../config/database');
const multer = require ('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const path = require('path');
cloudinary.config({
    cloud_name: 'djbfmiwlg',
    api_key: '935956179985733',
    api_secret: 'paNLYmeQHHPGXFHSI23PeDkzVqM'
    });
    const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "uploads",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
    });

exports.newCategory = (req, res, nex)=>{
    const upload = multer({ storage: storage }).array('files[]', 12);
    upload(req, res, function (err) {
        if (err) {
            console.log(err, 'erro no upload')
        }
        console.log("before", req.files)
        files = req.files;
    const category = new Category ({
        url: files,
        title: req.body.title,
        description: req.body.description
    });
    category.save((err)=>{
        if(err){
            res.json({success: false, message: err})
        }else{
            res.json({success: true, message: 'created category'});
        }
    })
    })
}
exports.getCategory = (req, res, next)=>{
    Category.find({}, (err, categories)=>{
        if(err){
            res.json({success: false, message: err})
        }else{
           console.log(categories)
        res.send(categories);
        }
    })
}
exports.oneCategories = (req, res) =>{
    var categoryId = req.params.id;
      Category.findById(categoryId).exec((err, category) => {
        Subproduct.find({}, (err, subproducts)=>{
            if(err){
                res.json({success: false})
            }else{
                const prodcat = subproducts.filter(subproduct => String(subproduct.category) == String(categoryId))
                return res.send({ subproducts: prodcat, success: category }), 
                console.log("categories:", subproducts),
                console.log("categories:", category)
            }
        })  
       
      });
  };
exports.ProductCategory = (req, res) =>{
    var categoryId = req.params.id;
    Category.findById(categoryId).populate('products').exec((err, category) => {
        return res.json({ category: category }), console.log('ProductCategory', category);
    });
};

