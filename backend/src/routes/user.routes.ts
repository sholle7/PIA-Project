import express from 'express'
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)
userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)
userRouter.route('/usernameExists').post(
    (req, res)=>new UserController().usernameExists(req, res)
)
userRouter.route('/emailExists').post(
    (req, res)=>new UserController().emailExists(req, res)
)
userRouter.route('/changePassword').post(
    (req, res)=>new UserController().changePassword(req, res)
)
userRouter.route('/adminLogin').post(
    (req, res)=>new UserController().adminLogin(req, res)
)
userRouter.route('/getAllUsers').get(
    (req, res)=>new UserController().getAllUsers(req, res)
)
userRouter.route('/acceptUser').post(
    (req, res)=>new UserController().acceptUser(req, res)
)
userRouter.route('/deleteUser').post(
    (req, res)=>new UserController().deleteUser(req, res)
)
userRouter.route('/changeUser').post(
    (req, res)=>new UserController().changeUser(req, res)
)
userRouter.route('/rejectUser').post(
    (req, res)=>new UserController().rejectUser(req, res)
)

userRouter.route('/upgradeUser').post(
    (req, res)=>new UserController().upgradeUser(req, res)
)

userRouter.route('/downGradeUser').post(
    (req, res)=>new UserController().downGradeUser(req, res)
)

userRouter.route('/blockUser').post(
    (req, res)=>new UserController().blockUser(req, res)
)

userRouter.route('/unblockUser').post(
    (req, res)=>new UserController().unblockUser(req, res)
)


export default userRouter;