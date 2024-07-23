import express from "express"
const app = express();
const port = 3000;

import { Task } from './task.model.js';

app.use(express.json());


app.get('/tasks', async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});


app.get('/tasks/:id', async (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = await Task.findByPk(taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
});


app.post('/tasks', async (req, res) => {
    const newTask = await Task.create({
        title: req.body.title,
        description: req.body.description,
    });

    res.status(201).json(newTask); 
});


app.put('/tasks/:id', async (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = await Task.findByPk(taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    await task.update({
        title: req.body.title,
        description: req.body.description,
    });

    res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = await Task.findByPk(taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
