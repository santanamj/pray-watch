const User = require('../model/user'); // Import User Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

exports.register = (req, res, next) => { 
  
    // Check if phone was provided
    if (!req.body.phone) {
      res.json({ success: false, message: 'You must provide a phone' }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({ success: false, message: 'You must provide a password' }); // Return error
      } else {
        // Create new user object and apply user input       
        let user = new User({          
          phone: req.body.phone,
          password: req.body.password,
          name: req.body.name,
          role: req.body.role,
          igreja: req.body.igreja
        });
       
        // Save user to database
        user.save((err, user) => {
          
          // Check if error occured
          if (err) {
            // Check if error is an error indicating duplicate account
            if (err.code === 11000) {
              res.json({ success: false, message: 'usuário ou e-mail já existe' }); // Return error
            } else {
              // Check if error is a validation rror
              if (err.errors) {
                // Check if validation error is in the email field
                if (err.errors.phone) {
                  res.json({ success: false, message: err.errors.phone.message }); // Return error
                } else {
                    // Check if validation error is in the password field
                    if (err.errors.password) {
                      res.json({ success: false, message: err.errors.password.message }); // Return error
                    } else {
                      res.json({ success: false, message: err }); // Return any other error not already covered
                    }
                  }
                
              } else {
                res.json({ success: false, message: 'Não foi possível criar o usuário: ', err }); // Return error if not related to validation
              }
            }
          } else {
         
           
            res.json({ success: true, message: 'Usuário registrado com sucesso!' }); // Return success
          }
        });
      }    
  }
}

exports.login = (req, res, next) => {
  // Check if phone was provided
    
  if (!req.body.phone) {
    res.json({ success: false, message: 'No phone was provided' }); // Return error
  } else {
    // Check if password was provided
    if (!req.body.password) {
      res.json({ success: false, message: 'No password was provided.' }); // Return error
    } else {
      // Check if phone exists in database
      User.findOne({ phone: req.body.phone}, (err, user) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: err }); // Return error
        } else {
          // Check if phone was found
          if (!user) {
            res.json({ success: false, message: 'phone not found.' }); // Return error
          } else {
            const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
            // Check if password is a match
            if (!validPassword) {
              res.json({ success: false, message: 'Password invalid' }); // Return error
            } else {
              const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
             
              res.json({
                success: true,
                message: 'Success!',
                token: token,
                user: {
                  phone: user.phone,
                  _id: user._id,
                  name: user.name

                }
              }); // Return success and token to frontend
            }
          }
        }
      });
    }
  }
}

exports.roleAuthorization = (roles) => {

  return function (req, res, next) {

    var user = req.user;

    User.findById({ _id: req.decoded.userId }, function (err, foundUser) {

      if (err) {
        res.status(422).json({ error: 'Usuario não encontrado.' });
        return next(err);
      }
      if (roles.indexOf(foundUser.role) > -1) {
        return next();
      }
      res.status(401).json({ error: 'Não está autorizado para acessar o conteúdo.' });
      return next('Unauthorized');
    });
  }

}
exports.token = (req, res, next) => {
  const token = req.headers['authorization']; // Create token found in headers
  // Check if token was found in headers
  if (!token) {
    res.json({ success: false, message: 'No token provided' }); // Return error
  } else {
    // Verify the token is valid
    jwt.verify(token, config.secret, (err, decoded) => {
      // Check if error is expired or invalid
      if (err) {
        res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
      } else {
        req.decoded = decoded; // Create global variable to use in any request beyond
        next(); // Exit middleware
      }
    });
  }
}
exports.use = (req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['authorization'];
  
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.status(201).json({ success: false, message: 'Authenticate token expired, please login again.', errcode: 'exp-token' });
      } else {
       // console.log(decoded)
        req.decoded = decoded;
        next();
      }
    });
  } else {
  
    return res.status(201).json({
      success: false,
      message: 'Fatal error, Authenticate token not available.',
      errcode: 'no-token'

    });

  }
}

exports.checkPhone = (req, res, next) => {
  // Check if email was provided in paramaters
  if (!req.params.phone) {
    res.json({ success: false, message: 'E-mail was not provided' }); // Return error
  } else {
    // Search for user's e-mail in database;
    User.findOne({ phone: req.params.phone }, (err, user) => {
      if (err) {
        
        res.json({ success: false, message: err }); // Return connection error
      } else {
        // Check if user's e-mail is taken
        if (user) {
          console.log(user)
          res.json({ success: false, message: 'Telefone já cadastrado' }); // Return as taken e-mail
        } else {
          console.log('usuário disponível')
          res.json({ success: true, message: 'Telefone disponível' }); // Return as available e-mail
        }
      }
    });
  }
}

exports.checkphone = (req, res, next) => {
  // Check if phone was provided in paramaters
  console.log(req.params)
  if (!req.params.phone) {
    res.json({ success: false, message: 'phone was not provided' }); // Return error
  } else {
    // Look for phone in database
    User.findOne({ phone: req.params.phone }, (err, user) => { // Check if connection error was found
      if (err) {
        res.json({ success: false, message: err }); // Return connection error
      } else {
        // Check if user's phone was found
        if (user) {
          res.json({ success: false, message: 'Usuário já existe' }); // Return as taken phone
        } else {
          res.json({ success: true, message: 'Usuário disponível' }); // Return as vailable phone
        }
      }
    });
  }
}

exports.profile = (req, res) => {
  // Search for user in database
  User.findOne({ _id: req.decoded.userId }).exec((err, user) => {
    console.log('user', user)
    // Check if error connecting
    if (err) {
      res.json({ success: false, message: err }); // Return error
    } else {
      // Check if user was found in database
      if (!user) {
        res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
      } else {
        res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
      
      }
    }
  });
};
exports.updateHorarioStatus = (req,res)=>{
  console.log(req.body)
     
     User.findOneAndUpdate({_id: req.body._id}, { $set: { "horario": true } }, (err, user)=>{
        if(err){
          res.json({ success: false, message: 'Falhar no cadastro do horário, entre em contato com o lider do horário' })
        }else{ 
      res.json({ success: true, user, message: 'Horário confirmado com sucesso!' })
         console.log(user)
        }  
 })
 }
 exports.updateHorarioStatusChange = (req,res)=>{
  console.log(req.body)
     
     User.findOneAndUpdate({_id: req.body.userId}, { $set: { "pedido": false } }, (err, user)=>{
        if(err){
          res.json({ success: false, message: 'Falhar no cadastro do horário, entre em contato com o lider do horário' })
        }else{ 
      res.json({ success: true, user, message: 'Horário confirmado com sucesso!' })
         console.log(user)
        }  
 })
 }
 exports.updatePedido = (req,res)=>{
  console.log(req.body)
     
     User.findOneAndUpdate({_id: req.body._id}, { $set: { "pedido": req.body.pedido } }, (err, user)=>{
        if(err){
          res.json({ success: false, message: 'Falhar ao enviar pedido' })
        }else{ 
          console.log(user)
      res.json({ success: true, user, message: 'Pedido Enviado com sucesso' })
         
        }  
 })
 }
 





