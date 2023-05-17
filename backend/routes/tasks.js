import { Router } from "express" 
import { getTasks, addTasks, deleteTask } from "../controller/tasksController.js"

const router = Router() 

router.get("/", getTasks)
router.post("/", addTasks)
router.delete("/:id", deleteTask)
export default router
