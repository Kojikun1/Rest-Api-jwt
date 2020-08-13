import express from 'express';
import multer from "multer";

const routes = express.Router();

import multerConfig from './config/multer';
// ----------controllers -----////
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";
import PostController from './controllers/PostController';
import TodoController from './controllers/TodoController';

const userController = new UserController();
const sessionController = new SessionController();
const postController = new PostController();
const todoController = new TodoController();

// ----------Validators -----////
import UserValidators from "./validators/UserValidators";
import SessionValidators from "./validators/SessionValidators";
;

import authMiddleware from './middlewares/auth';

routes.get('/user/list',authMiddleware, userController.index);
routes.post('/user/register',UserValidators.create, userController.store);
routes.put('/user/update',authMiddleware, UserValidators.update, userController.update);

routes.post('/user/session',SessionValidators.create, sessionController.store);

routes.get("/todos", authMiddleware, todoController.index);
routes.post('/todos', authMiddleware, todoController.store);
routes.put('/todos/:todo_id', authMiddleware, todoController.update);
routes.delete('/todos/:todo_id', authMiddleware, todoController.delete);

routes.post('/posts',authMiddleware, multer(multerConfig).single('file'),postController.store);


export default routes;
