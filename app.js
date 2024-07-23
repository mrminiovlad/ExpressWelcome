import express from "express";
const app = express();
const port = 3000;

import { Task } from './task.model.js';

app.use(express.json());


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

app.get('/tasks', async (req, res, next) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});

app.get('/tasks/:id', async (req, res, next) => {
    try {
        const taskId = parseInt(req.params.id);
        const task = await Task.findByPk(taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
    } catch (error) {
        next(error);
    }
});

app.post('/tasks', async (req, res, next) => {
    try {
    const newTask = await Task.create({
        title: req.body.title,
        description: req.body.description,
    });

    res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

app.put('/tasks/:id', async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }
});

app.delete('/tasks/:id', async (req, res, next) => {
    try {
        const taskId = parseInt(req.params.id);
        const task = await Task.findByPk(taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

        await task.destroy();
        res.json({ message: 'Task deleted' });
    } catch (error) {
        next(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
