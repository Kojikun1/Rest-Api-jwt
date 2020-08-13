const express = require('express');
const multer = require("multer");

const routes = express.Router();

const multerConfig = require('./config/multer');
// ----------controllers -----////
const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const PostController = require('./controllers/PostController');
const TodoController = require('./controllers/TodoController');
// ----------Validators -----////

const UserValidators = require("./validators/UserValidators");
const SessionValidators = require("./validators/SessionValidators");


const authMiddleware = require('./middlewares/auth');

routes.get('/user/list',authMiddleware, UserController.index);
routes.post('/user/register',UserValidators.create, UserController.store);
routes.put('/user/update',authMiddleware, UserValidators.update, UserController.update);

routes.post('/user/session',SessionValidators.create, SessionController.store);

routes.get("/todos", authMiddleware, TodoController.index);
routes.post('/todos', authMiddleware, TodoController.store);
routes.put('/todos/:todo_id', authMiddleware, TodoController.update);
routes.delete('/todos/:todo_id', authMiddleware, TodoController.delete);

routes.post('/posts',authMiddleware, multer(multerConfig).single('file'),PostController.store);


module.exports = routes;
