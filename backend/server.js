import express, { json } from "express";
import cors from 'cors';
import router from "./routes/tasks.js";

const app = express()
const port = 3000

app.use(cors());
app.use(json())
app.use("/", router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

