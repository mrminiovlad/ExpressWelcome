import express from "express"
const app = express();
const port = 3000;


app.use(express.json());


let tasks = [];


app.get('/tasks', (req, res) => {
    res.json(tasks);
});


app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
});


app.post('/tasks', (req, res) => {
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
    };

    tasks.push(newTask);
    res.status(201).json(newTask); 
});


app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
    
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks[taskIndex] = {
        id: taskId,
        title: req.body.title,
        description: req.body.description,
    };

    res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
