const Arquivo = require ('./../model/arquivo');
const rp = require('request-promise-native');
const fs = require ('fs');
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
    allowedFormats: ["jpg", "png", "pdf"]
    });
   
exports.addArquivo = (req, res, next) => {
    console.log(req.body);
    const upload = multer({ storage: storage }).array('files[]', 12);
    upload(req, res, function (err) {
        if (err) {
            console.log(err, 'erro no upload')
        }
        console.log("before", req.files)
        files = req.files;
    const arquivo = new Arquivo ({
        url: files,
        title: req.body.title,       
        dataArquivo: req.body.dataArquivo
    });
    arquivo.save((err)=>{
        if(err){
            res.json({success: false, message: err})
        }else{
            res.json({success: true, message: 'created arquivo'});
        }
    })
    })
};

exports.getArquivos = (req, res, next)=>{
    Arquivo.find({}, (err, arquivos)=>{
        console.log(arquivos)
        if(err){
            res.json({success:false, err} )
        }else{
            res.send(arquivos)
            console.log(arquivos)
        }
    }).sort({ '_id': -1 }); // Sort orders from newest to oldest
}
exports.getArquivo = (req, res, next)=>{
    console.log(req.params.id)
    const arquivoId = req.params.id;
    Arquivo.findById(arquivoId).populate().exec((err, arquivo)=>{
        console.log('meu', arquivo)
        if(err){
            res.status(500).send({message: 'Erro na solicitação'})
        }else{
            if(!arquivo){
            res.status(404).send({message:'Pedido não existe'})
        }else{
            res.status(200).send({arquivo}), console.log('SubArquivo', arquivo);
        }
    }
    })
}
