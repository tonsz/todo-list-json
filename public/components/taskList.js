import * as apiHandler from "../services/apiHandler.js"

class TaskList {
    constructor() {
        this.tasks = []
        this.taskListElement = document.querySelector(".task-list")
    }
    // this function long AFFFFFF
    renderTasks(tasks) {
        this.tasks = tasks
        
        for(const task of this.tasks) {
            const taskElement = document.createElement('div')
            taskElement.className = 'task'
            
            const taskName = document.createElement('p')
            taskName.className = 'task-name'
            taskName.textContent = task.name 

            
            const controlsElement = document.createElement('div')
            
            const taskDoneBtn = document.createElement('button')
            taskDoneBtn.className = 'task-done-button'
            taskDoneBtn.id = task.id
            taskDoneBtn.innerHTML = '✔️'
            
            const taskDeleteBtn = document.createElement('button')
            taskDeleteBtn.className = 'task-delete-button'
            taskDeleteBtn.id = task.id
            taskDeleteBtn.innerHTML = '🗑️'
            
            if(this.isDone(task.status)) {
                taskName.classList.add('strikethrough');
                taskDoneBtn.style.display = 'none';
                taskDoneBtn.disabled = true;
            }

            taskDeleteBtn.addEventListener('click',  async (e) => {
                await apiHandler.deleteTask(e.target.id) 
            })

            taskDoneBtn.addEventListener('click', async (e) => {
                await apiHandler.editTaskStatus(e.target.id)
            })

            controlsElement.append(taskDoneBtn, taskDeleteBtn)

            taskElement.append(taskName, controlsElement)
            this.taskListElement.appendChild(taskElement)
        }
    }

    isDone(status) {
        if (status === 1) {
            return true
        } else {
            return false
        }
    }

}

export default TaskList