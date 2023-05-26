import * as apiHandler from "./services/apiHandler.js"
import TaskList from "./components/taskList.js"

async function initializeApp () {
    try {

        const taskNameInput = document.getElementById("task-name")
        const addButton = document.getElementById("add-task")
        
        addButton.addEventListener("click", async () => {
            await apiHandler.addTask(taskNameInput.value)
        }) 
          
        const taskList = new TaskList()
        
        apiHandler.fetchTasks()
         .then(tasks => {
             taskList.renderTasks(tasks)
         })
         .catch(error => {
             console.log(error)
         });
                    
    } catch (error) {
        console.log(error)
    }
}

initializeApp()
