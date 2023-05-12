const express = require("express")
const cors = require('cors');
const fs = require("fs");
const util = require("util")

const app = express()
const port = 3000

app.use(cors());
app.use(express.json())

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

async function readTasks () {
    try {
        const data = await readFile("./backend/tasks.json", "utf-8")
        return JSON.parse(data)
    } catch (error) {
        console.error(error)
        return null
    }
}

async function writeTask (newTask) {
    tasksBuffer = await readTasks()
    let tasks =  tasksBuffer.tasks

    let lastTaskID = tasks[tasks.length - 1].id

    const newTaskObject = {
        "id": lastTaskID + 1,
        "name": newTask                         
    }
    tasks.push(newTaskObject)

    const jsonObj = {
        tasks: tasks
    }
    const json = JSON.stringify(jsonObj)
    
    writeFile("./backend/tasks.json", json)

}
async function addTasks (req, res) {
    task = req.body.name
    await writeTask(task)
    res.status(201).send({
        message: "Task created successfully",
    })
}

async function getTasks (req, res) {
    const data = await readTasks()
    console.log(data)
    res.send(data)
}


app.get("/", getTasks)
app.post("/", addTasks)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

