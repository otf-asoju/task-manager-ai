const express = require('express');

const app = express();

app.use(express.json());

let tasks = [
  {
    id: 1,
    title: 'Set up project',
    description: 'Initialize the task manager backend.',
    completed: false,
  },
];

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running' });
});

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, description = '', completed = false } = req.body || {};

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Task title is required.' });
  }

  const newTask = {
    id: Date.now(),
    title: title.trim(),
    description,
    completed,
  };

  tasks.push(newTask);

  return res.status(201).json(newTask);
});

if (require.main === module) {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Task Manager API listening on port ${port}`);
  });
}

module.exports = { app, tasks };

