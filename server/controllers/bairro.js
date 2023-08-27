const Bairro = require ('./../model/bairro.js');
const config = require ('./../config/database');



exports.newBairro = (req, res, nex)=>{
   
    const bairro = new Bairro ({
        title: req.body.title,
        cost: req.body.cost
    });
    bairro.save((err)=>{
        if(err){
            res.json({success: false, message: err})
        }else{
            res.json({success: true, message: 'created bairro'});
        }
    })
    
}
exports.getBairro = (req, res, next)=>{
    Bairro.find({}, (err, bairros)=>{
        if(err){
            res.json({success: false, message: err})
        }else{
        res.send(bairros);
        }
    })
}
exports.oneBairros = (req, res) =>{
    var bairroId = req.params.id;
      Bairro.findById(bairroId).populate('products').exec((err, bairros) => {
        console.log("bairros:", bairros);
        res.send({success: bairros});
      });
  };


