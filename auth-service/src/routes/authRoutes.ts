import express from "express"
import verifyToken from "../middlewares/authMiddleware";
const router=express.Router();

router.post("/login",)
router.post("/register")
router.get("/me",verifyToken)
router.patch('/update/:id',verifyToken)
router.get("/find-username/:query")




export default router;