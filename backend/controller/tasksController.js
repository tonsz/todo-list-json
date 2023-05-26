import { promisify } from 'util'
import { readFile as _readFile, writeFile as _writeFile } from "fs";

const readFile = promisify(_readFile)
const writeFile = promisify(_writeFile)
const tasksFilePath = "./backend/tasks.json"

async function readTasks () {
    const data = await readFile(tasksFilePath, "utf-8")
    return JSON.parse(data)
}

async function writeTask (newTask) {
    const tasksBufferObj = await readTasks()
    let tasks =  tasksBufferObj.tasks
    let lastTaskID = 0

    if(tasks.length > 0) {
        lastTaskID = tasks[tasks.length - 1].id
    }
    
    tasks.push({
        "id": lastTaskID + 1,
        "status": 0,
        "name": newTask                         
    })
    
    writeFile(tasksFilePath, JSON.stringify({ tasks }))
}

async function extractTask (taskIDToDelete) {
    const taskFile = await readTasks() 
    const tasks = taskFile.tasks

    const taskToDeleteIndex = tasks.findIndex(task => task.id == taskIDToDelete)

    if (taskToDeleteIndex !== -1) {
        tasks.splice(taskToDeleteIndex, 1)
    }

    writeFile(tasksFilePath, JSON.stringify({ tasks }))
}

async function markTaskAsDone (taskID) {
    const taskFile = await readTasks() 
    const tasks = taskFile.tasks 

    const taskToChange = tasks.findIndex(task => task.id == taskID)

    if (taskToChange !== -1) {
        tasks[taskToChange].status = 1
    }

    writeFile(tasksFilePath, JSON.stringify({ tasks }))
}

async function getTasks (req, res) {
    try {
        const data = await readTasks()
        res.status(200).send(data)
    } catch (error) {
        console.error(error)
        res.send({error})
    }
}

async function addTask (req, res) {
    try {
        const task = req.body.name
        await writeTask(task)
        res.status(201).send({
            message: "Task created successfully",
        })
    } catch (error) {
        console.error(error)
        res.send({error})
    }
}

async function deleteTask (req, res) {
    try {
        const taskID = req.params.id
        await extractTask(taskID)
        res.send({message: "received"})
    } catch (error) {
        console.error(error)
        res.send({error})
    }
}

async function editTaskStatus (req, res) {
    try {
        const taskID = req.params.id
        await markTaskAsDone(taskID)
        res.send({message: "received"})
    } catch (error) {
        res.send({error})
    }
}

export { 
    getTasks,
    addTask,
    deleteTask, 
    editTaskStatus
}

    // make an error handler function >:()