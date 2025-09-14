import {Router} from "express";
import { authenticate, isAdmin, isOwnerOrAdmin, validateRequest } from "../../middlewares/validateRequest";
import { loginUserSchema, registerUserSchema } from "./user.validate";
import { getUserInfo, getUsers, loginUser, registerUser, updateUser } from "./user.controller";

const router = Router();

router.route('/')
                .post(validateRequest(registerUserSchema),registerUser)
                .get(authenticate,isAdmin,getUsers);

router.route('/:id').put(authenticate,updateUser)

router.route('/login').post(validateRequest(loginUserSchema),loginUser);

router.route('/user/info').get(authenticate,getUserInfo);

router.route('/me').get(authenticate,getUserInfo)


export default router;