import express from "express"
import { verifyUserToken } from "../middlewares/authMiddleware";
const router=express.Router();

router.post("/login",)
router.post("/register")
router.get("/me",verifyUserToken)
router.patch('/update/:id',verifyUserToken)
router.get("/find-username/:query")




export default router;