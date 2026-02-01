import express from "express";
import { getFunction,postFunction} from "./controller.js";


const router = express.Router()

router.use((req,res,next)=>{   // router level middle ware
console.log("welcome")
next()
})
router.get("/get",getFunction)
router.post("/postApi",postFunction)










export default router

