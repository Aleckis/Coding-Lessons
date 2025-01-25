const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let users = [];
let exercises = [];

app.post('/api/users', (req, res) => {
  users.push({username: req.body.username, _id: uuidv4()});
  res.json({username: req.body.username, _id: users[users.length - 1]._id});
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users/:_id/exercises', (req, res) => {
  const user = users.find(user => user._id == req.params._id);
  if (!user) {
    res.json({error: 'User not found'});
    return;
  }
  const date = req.body.date ? new Date(req.body.date) : new Date();
  exercises.push({
    userId: user._id,
    username: user.username,
    description: req.body.description,
    duration: req.body.duration,
    date: date.toDateString()
  });
  res.json({
    _id: user._id,
    username: user.username,
    date: date.toDateString(),
    duration: parseInt(req.body.duration),
    description: req.body.description
  });
});


app.get('/api/users/:_id/logs', (req, res) => {
  const user = users.find(user => user._id == req.params._id);
  if (!user) {
    res.json({error: 'User not found'});
    return;
  }
  let logs = exercises.filter(exercise => exercise.userId == user._id);
  if (req.query.from) {
    logs = logs.filter(exercise => new Date(exercise.date) >= new Date(req.query.from));
  }
  if (req.query.to) {
    logs = logs.filter(exercise => new Date(exercise.date) <= new Date(req.query.to));
  }
  if (req.query.limit) {
    logs = logs.slice(0, req.query.limit);
  }

  logs.forEach(log => {
    log.duration = parseInt(log.duration);
  });

  res.json({
    _id: user._id,
    username: user.username,
    count: logs.length,
    log: logs
  });
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
