import { Request, Response} from 'express';
import Post from '../models/Post';
import User from '../models/User';

class PostController{
    async index(req: Request, res: Response){
        const { user_id }  = req.params

        console.log(req.params);

        const posts = await Post.findOne({user: user_id});

        return res.json(posts);

    }
    async list(req: Request, res: Response){
        
        const posts = await Post.find();

        return res.json(posts);

    }
    async store(req: Request , res: Response) {
       try{
        const { originalname: name, size, key, location: url } = req.file;

        const userId = req.userId;

        let post = await Post.findOne({user: userId});

        if(post){
            await Post.findByIdAndRemove(post._id);
        }
   
        post = await new Post({
            name,
            size,
            key,
            url,
            user: userId
        })
        post.save();

        console.log(req.file);

        const updatedUser = await User.findByIdAndUpdate(userId,
            {$set: {avatar_url: post.url}},
            {new: true}
        )
    
        return res.status(200).json({updatedUser, message: "Successful Updated"});


       }catch(error){
           console.log(error);
           return res.status(400).json({message: "failure to add Image"});
       }
       
    }
    async delete(req: Request, res: Response){
        const { avatar_id }  = req.params;

        try{
             
            const post  = await Post.findById(avatar_id);

            if(!post){
               return res.status(404).json({message: "post do not exist"});
            }

            await post.deleteOne();

        }catch(err){

            console.log(err);
            return res.json({ message: "Failure to delete post"});
        }

        return res.json({ message: "successful Deleted"});
    }
}

export default  PostController;