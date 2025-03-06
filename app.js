// app.js

const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.json()); // Middleware to parse JSON requests

app.get('/', (req, res) => {
  const options = {
    root: path.join(__dirname)
  }

  const fileName = 'front.html';
  res.sendFile(fileName, options, function (err){
    if (err) {
        console.error('Error sending file:', err);
    } else {
        console.log('Sent:', fileName)
    }
  })
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });


const users = [
{ id: 1, name: 'Name1' },
{ id: 2, name: 'Name2' },
];

app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  });
  
  app.post('/users', (req, res) => {
    const newUser = {
      id: Date.now(),
      name: req.body.name,
    };
    users.push(newUser)
    // Normally, you would save this user to a database
    res.status(201).json(newUser);
  });

  app.put('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (user) {
      user.name = req.body.name;
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  });

  app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
      users.splice(userIndex, 1); // Remove the user from the array
      res.send('User deleted');
    } else {
      res.status(404).send('User not found');
    }
  });
  