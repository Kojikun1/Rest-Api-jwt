const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class SessionController {

    async store(req,res){

        const { email, password } = req.body;

        let isCorrectPass = false;

      try {
            const user = await User.findOne({email}).select('+password');

            if(!user){
                return res.status(400).json({message: "User Not Found"});   
            }
            
           isCorrectPass = await bcrypt.compare(password,user.password);

           if(!isCorrectPass){
               return res.status(400).json({message: "Wrong password"});
           }

           user.password = undefined;

           const token = jwt.sign({userId: user._id},process.env.APP_SECRET,{
            expiresIn: '7d'
           });

           return res.status(200).json({user, token});

      } catch (error) {
           console.log(error);
           
           return res.status(400).json({message: "Failure to create User"});
      }
    }
}

module.exports = new SessionController();