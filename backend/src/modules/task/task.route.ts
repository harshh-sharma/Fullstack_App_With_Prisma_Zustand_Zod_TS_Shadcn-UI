import {Router} from "express";
import { authenticate, isAdmin, isOwnerOrAdmin, validateRequest } from "../../middlewares/validateRequest";
import { createTask, deleteAllTaskRelatedToUser, deleteTaskById, getAllTasks, getSpecificTask, getTasks, updateTaskById, updateTaskStatus } from "./task.controller";
import { createTaskSchema } from "./task.validate";

const router = Router();

router.route('/')
                .post(authenticate,validateRequest(createTaskSchema), createTask)
                .get(authenticate, getTasks)
                .delete(authenticate, deleteAllTaskRelatedToUser)

router.route('/admin').get(authenticate,isAdmin, getAllTasks);

router.route('/:id')
                    .put(authenticate,isOwnerOrAdmin, updateTaskById)
                    .delete(authenticate ,isOwnerOrAdmin, deleteTaskById)
                    .get(authenticate, getSpecificTask)
                    .patch(authenticate, updateTaskStatus)


export default router;
