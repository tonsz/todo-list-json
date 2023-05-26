const resourceUrl = "http://localhost:3000/"

async function fetchTasks () {
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

async function deleteTask(taskID) {
    await fetch(resourceUrl + taskID, {
        method: "DELETE"
    })  
}

async function editTaskStatus(taskID) {
    await fetch(resourceUrl + taskID, {
        method: "PUT"
    })  
}

export { 
    fetchTasks,
    addTask,
    deleteTask,
    editTaskStatus
}