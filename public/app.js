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
    console.log(JSON.stringify(data))
    const r = await response.json()
    console.log(r.message)
}

async function init () {
    
    const addButton = document.getElementById("add-task")
    const taskNameInput = document.getElementById("task-name")

    addButton.addEventListener("click", () => {
        addTask(taskNameInput.value)
    })

    try {
        const tasks = await getTasks()
        const taskList = document.querySelector(".task-list")
        for(let i = 0; i < tasks.length; i++) {

            taskList.innerHTML += '<div>' + tasks[i].name + '</div>'
        }
    } catch (error) {
        console.log(error)
    }
}

init()