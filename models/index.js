const dbConfig = require('../config/dbConfig.js');
const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config()

const sequelizeDb = new Sequelize(
	dbConfig.DB,
	dbConfig.USER,
	process.env.MYSQL_PASSWORD, {
			host: dbConfig.HOST,
			dialect: dbConfig.dialect,
			operatorsAliases: false,

			pool: {
					max: dbConfig.pool.max,
					min: dbConfig.pool.min,
					acquire: dbConfig.pool.acquire,
					idle: dbConfig.pool.idle

			}
	}
)

sequelizeDb.authenticate()
.then(() => {
    console.log(`connected to DB: ${dbConfig.DB}`)
})
.catch(err => {
    console.error(`error connecting to DB: ${err}`)
})



const dataBase = {}

dataBase.Sequelize = Sequelize
dataBase.sequelizeDb = sequelizeDb

dataBase.users = require('../models/users')(sequelizeDb, DataTypes)
dataBase.paths = require('../models/paths')(sequelizeDb, DataTypes)
dataBase.concepts = require('../models/concepts')(sequelizeDb, DataTypes)
dataBase.contents = require('../models/content')(sequelizeDb, DataTypes)

dataBase.sequelizeDb.sync({ force: true })
.then(() => {
    console.log('yes re-sync done!')
})


dataBase.users.hasMany(dataBase.paths, {
    as: 'path',
    foreignKey: 'userId',
    onDelete: 'cascade',
    hooks: true
    
})

dataBase.paths.belongsTo(dataBase.users, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'cascade',
    hooks: true
    
})

dataBase.paths.hasMany(dataBase.concepts, {
    as: 'concept',
    foreignKey: 'userId',
    onDelete: 'cascade',
    hooks: true
})

dataBase.concepts.belongsTo(dataBase.paths, {
    foreignKey: 'pathId',
    as: 'path',
    onDelete: 'cascade',
    hooks: true
})

dataBase.concepts.hasMany(dataBase.contents, {
    as: 'content',
    foreignKey: 'userId',
    onDelete: 'cascade',
    hooks: true
})

dataBase.contents.belongsTo(dataBase.concepts, {
    foreignKey: 'conceptId',
    as: 'concept',
    onDelete: 'cascade',
    hooks: true
})


module.exports = dataBase