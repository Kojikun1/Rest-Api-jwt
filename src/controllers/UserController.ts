import User, { IUserSchema } from '../models/User';
import { Request, Response } from 'express';
class UserController {
    async index(req: Request ,res: Response ){

        let users = await User.find();
        
        return res.status(200).json(users);
    }
    async store(req: Request ,res: Response ){

        const { name, email, password } = req.body;

      try {
            
            let user = await User.findOne({ email });

            if(user){
                return res.status(400).json({message: "User with this email already exist"});
            }
            
            user = await new User({name, email, password});

            await user.save();
            user.password = '';

            return res.status(200).json({user, message: "Successful registered"});

      } catch (error) {
           console.log(error);
           
           return res.status(400).json({message: "Failure to create User"});
      }
    }
   async update(req: Request ,res: Response ){
       const userId = req.userId;
       const { name = null , email = null , password = null} = req.body;
       let response: any = {};
        try{
            if(name && email){
            response.user = await User.findByIdAndUpdate(userId,{
                   $set: {name: name, email: email}
               },{new: true});
            }
            if(password){
                await User.findById(userId,(err,doc: IUserSchema)=> {
                    if(err) return err;
                    
                    doc.password = password;
                    doc.save();
                })
                response.password = "Password updated";
                
            }
            response.message = "Successful updated";
            return res.status(200).json(response);

        }catch(error){
            console.log(error);
            return res.status(400).json({message: "failure to update"});
        }
    }
}

export default UserController;