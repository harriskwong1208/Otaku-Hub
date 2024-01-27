const express = require("express");
const {getAllUsers,addUser,updateUser,deleteUser,getUser} = require("../controller/user-controller");



const UserRouter = express.Router();

UserRouter.get('/', getAllUsers);
UserRouter.post('/', addUser);
UserRouter.put('/:id', updateUser);
UserRouter.delete('/:id', deleteUser);
UserRouter.get('/:id', getUser);

module.exports = UserRouter;
