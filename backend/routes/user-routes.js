import express from 'express';
import { getAllUsers, addUser, updateUser, deleteUser, getUser } from '../controller/user-controller.js';

const UserRouter = express.Router();

UserRouter.get('/', getAllUsers);
UserRouter.post('/', addUser);
UserRouter.put('/:id', updateUser);
UserRouter.delete('/:id', deleteUser);
UserRouter.get('/:id', getUser);

export default UserRouter;
