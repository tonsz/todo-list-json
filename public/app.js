const resourceUrl = "http://localhost:3000/"
 
async function getTasks () {
    const response = await fetch(resourceUrl)
    const data = await response.json()
    return data.tasks
} 

async function addTask (newTask) {
    const data = {
        "name" : newTask
    }
    const response = await fetch(resourceUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

async function init () {
    try {

        const taskNameInput = document.getElementById("task-name")
        const addButton = document.getElementById("add-task")

        addButton.addEventListener("click", async () => {
            await addTask(taskNameInput.value)

        }) 

        const tasks = await getTasks()
        const taskList = document.querySelector(".task-list")
        for(let i = 0; i < tasks.length; i++) {
            taskList.innerHTML += `
            <button id="${tasks[i].id}">${tasks[i].name}</button>
            `
        }
        
        const taskDeleteButtons = document.querySelectorAll(".task-list button")
        taskDeleteButtons.forEach(taskDeleteButtons => taskDeleteButtons.addEventListener("click", async (e) => {
            const taskID = e.target.id
            await fetch(resourceUrl + taskID, {
                method: "DELETE"

            })        
            // send e.target.id to endpoint 
            // use fetch api again 

        }));

    } catch (error) {
        console.log(error)
    }
}

init()

