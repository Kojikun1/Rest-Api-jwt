import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

class SessionController {

    async store(req: Request ,res: Response){

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

           user.password = '';

           const token = jwt.sign({userId: user._id},process.env.APP_SECRET as string,{
            expiresIn: '7d'
           });

           return res.status(200).json({user, token});

      } catch (error) {
           console.log(error);
           
           return res.status(400).json({message: "Failure to create User"});
      }
    }
}

export default SessionController;