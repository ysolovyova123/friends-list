const Sequelize = require('sequelize')
const { AsyncParallelBailHook } = require('tapable')
const db = new Sequelize('postgres://localhost:5432/friendslistapp')

const Friends = db.define('friends', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ranking: {
    type: Sequelize.INTEGER
  }
})

// Friends.create({
//   name: 'Nathalie',
//   ranking: 3
// })

// Friends.create({
//   name: 'April',
//   ranking: 2
// })

// Friends.create({
//   name: 'Stephanie',
//   ranking: 1
// })


const syncAndSeed = async()=> {
  try {
    await db.sync({ force: true }); //
    Friends.create({
      name: 'Stephanie',
      ranking: '1'
    })
    Friends.create({
      name: 'April',
      ranking: '2'
    })
    Friends.create({
      name: 'Nathalie',
      ranking: '3'
    })
  }
  catch (err) {
    console.error(err)
  }
};

module.exports = {
  db,
  Friends,
  syncAndSeed
}

  // models: {
  //   User
  // }
