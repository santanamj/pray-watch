const Address = require('./../model/address.js');
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
const User = require('../model/user');
const Bairro = require('./../model/bairro.js')

exports.newAddress = (req, res) => {
   const address = new Address({
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        bairro: req.body.bairro,
        complemento: req.body.complemento,
        userAddress: req.body.userAddress,
        bairroAdress: req.body.bairroAdress,
        cost: req.body.cost
    });
    address.save((err, address) => {
        if (err) {           
            res.json({ success: false, message: err })
        } else {
            res.json({ success: true, message: 'created address' });
        }
    })
}
exports.getmyAddress = (req, res, next) => {
    Address.find({}).populate().exec((err, addresses) => {
        if (err) {
            res.send({ success: false, message: err })
        } else {          
            User.findOne({ _id: req.decoded.userId }).then((user) => {
                const myId = user._id;
                const results = addresses.filter(address => String(address.userAddress) === String(myId));           
                return res.json({ success: results }), console.log({ addresses: results });
            })       
        }
    })
}
exports.getAddress = (req, res, next) => {
    Address.find({}).populate('bairro').exec((err, addresses, bairro) => {
        if (err) {
            res.send({ success: false, message: err })
        } else {
            console.log(bairro)
            const myresult = addresses.filter(address => String(address.retirar) == String(true));
            User.findOne({ _id: req.decoded.userId }).then((user) => {
                const myId = user._id;
                const results = addresses.filter(address => String(address.userAddress) === String(myId));
                const myaddress = myresult.concat(results)
                console.log('my result', myresult)
                return res.json({ success: myaddress }), console.log({ addresses: myaddress });
            })
        }
    })
}
exports.oneAddresses = (req, res) => {
    var addressId = req.params.id;
    Address.findById(addressId).populate('products').exec((err, addresses) => {
        console.log("addresses:", addresses);
        res.send({ success: addresses });
    });
};


