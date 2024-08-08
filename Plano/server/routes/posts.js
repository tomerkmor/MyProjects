import express from 'express';
import {changeEmail , changePassword , changeExpD , addItem, createUser, login, getList, deleteItem, getItemData} from '../controller/posts.js'

const router = express.Router();


router.post("/user/create",createUser);
router.patch("/user/addItem",addItem);
router.post("/user/login",login);
router.get("/user/list",getList); 
router.patch("/user/deleteItem",deleteItem);

router.get("/item",getItemData);

router.post("/user/changeEmail",changeEmail);
router.post("/user/changePassword",changePassword);
router.post("/user/changeExpD",changeExpD);


export default router;
