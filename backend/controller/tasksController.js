import { promisify } from 'util'
import { readFile as _readFile, writeFile as _writeFile } from "fs";

const readFile = promisify(_readFile)
const writeFile = promisify(_writeFile)

async function readTasks () {
    const data = await readFile("./backend/tasks.json", "utf-8")
    return JSON.parse(data)
}

async function writeTask (newTask) {
    const tasksBufferObj = await readTasks()
    let tasks =  tasksBufferObj.tasks
    let lastTaskID = tasks[tasks.length - 1].id
    
    tasks.push({
        "id": lastTaskID + 1,
        "name": newTask                         
    })
    
    writeFile("./backend/tasks.json", JSON.stringify({ tasks }))
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

async function addTasks (req, res) {
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
        console.log("deleting " + taskID)
        res.send({message: "received"})
        // call a function that will delete the task 
    } catch (error) {
        console.error(error)
        res.send({error})
        // make an error handler function >:()
    }
}

export { 
    getTasks,
    addTasks,
    deleteTask
}