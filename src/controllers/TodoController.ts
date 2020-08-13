import Todo from '../models/Todo';
import User from '../models/User';
import { Request, Response } from 'express';


class TodoController {
    async index(req: Request ,res: Response){
        const userId = req.userId;

        const todos = await Todo.find({user: userId});
        
        return res.status(200).json(todos);
    }
    async store(req: Request ,res: Response ){
        const { content, completed = false } = req.body;
        const userId = req.userId;

        try {
            const todo = await Todo.create({
                content,
                completed,
                user: userId
            })
             
            const user = await User.findByIdAndUpdate(userId, {
                $push: { todo_list: todo._id }
            }, {new: true})

            return res.status(200).json({user, todo});

        } catch (error) {
             console.log(error);
             return res.status(400).json({message: "Failure to create Todo"});
        }
    }
    async update(req: Request ,res: Response ){
        const { todo_id } = req.params;

        const { completed } = req.body;

        try {
            const todo = await Todo.findByIdAndUpdate(todo_id, {
                 $set: { completed: completed }
            }, { new: true});

            return res.status(200).json({todo, message: "Successful updated"});
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Failure to update todo"});
        }
    }
    async delete(req: Request ,res: Response ){
        const { todo_id } = req.params;

        const userId = req.userId;

        try {
            await Todo.findByIdAndDelete(todo_id);
            const user = await User.findByIdAndUpdate(userId, {
                // @ts-ignore
                $pull: { todo_list: todo_id }
            }, {new: true})

            return res.status(200).json({user, message: "successful deleted"});
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "Failure to remove Todo"});
        }
    }
}

export default TodoController;