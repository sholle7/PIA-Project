"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/usernameExists').post((req, res) => new user_controller_1.UserController().usernameExists(req, res));
userRouter.route('/emailExists').post((req, res) => new user_controller_1.UserController().emailExists(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route('/adminLogin').post((req, res) => new user_controller_1.UserController().adminLogin(req, res));
userRouter.route('/getAllUsers').get((req, res) => new user_controller_1.UserController().getAllUsers(req, res));
userRouter.route('/acceptUser').post((req, res) => new user_controller_1.UserController().acceptUser(req, res));
userRouter.route('/deleteUser').post((req, res) => new user_controller_1.UserController().deleteUser(req, res));
userRouter.route('/changeUser').post((req, res) => new user_controller_1.UserController().changeUser(req, res));
userRouter.route('/rejectUser').post((req, res) => new user_controller_1.UserController().rejectUser(req, res));
userRouter.route('/upgradeUser').post((req, res) => new user_controller_1.UserController().upgradeUser(req, res));
userRouter.route('/downGradeUser').post((req, res) => new user_controller_1.UserController().downGradeUser(req, res));
userRouter.route('/blockUser').post((req, res) => new user_controller_1.UserController().blockUser(req, res));
userRouter.route('/unblockUser').post((req, res) => new user_controller_1.UserController().unblockUser(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map