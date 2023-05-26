import { Router } from "express" 
import { getTasks, addTask, deleteTask, editTaskStatus} from "../controller/tasksController.js"

const router = Router() 

router.get("/", getTasks)
router.post("/", addTask)
router.delete("/:id", deleteTask)
router.put("/:id", editTaskStatus)
export default router
