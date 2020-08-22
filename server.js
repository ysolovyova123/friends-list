const express = require('express');
const path = require('path')
const app = express()
const morgan = require("morgan");
const bodyParser = require('body-parser');
const { Friends, db, syncAndSeed } = require('./models');

// logging and body-parsing
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve the index.html file in ./public as a homepage
//app.use(express.static('public'))
//app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/api/friends', async(req, res, next)=> {
  try {
    const friends = await Friends.findAll({ order: [['ranking', 'desc']]});
    res.json(friends)
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/friends/:id', async(req, res, next)=> {
  try {
    const friend = await Friends.findByPk(req.params.id)
    await friend.destroy()
    res.sendStatus(204)
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/friends/:id', async(req,res,next) => {
  try {
    const friend = await Friends.findByPk(req.params.id)
    await friend.update(req.body)
    res.send(friend)
  }
  catch(ex){
    next(ex)
  }
})

app.post('/api/friends', async(req,res,next) => {
  try {
    const newFriend = await Friends.create(req.body)
    res.send(newFriend)
  }
  catch(ex) {
    next(ex)
  }
})

// app.get('/api/friends', async(req, res, next) => {
//   try {
//     const friends = await Friends.findAll({
//       attributes: ['name', 'ranking'],
//     });
//     res.json(friends);
//   } catch (err) {
//     next(err);
//   }
// });

const PORT = 1337
const init = async function() {
  await syncAndSeed()
  console.log('seeded and synced')
  app.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}!`);
  });
}

init();


// app.listen(port, () => {
//   db.syncAndSeed();
//   console.log(`listening on ${port}`)
// })
