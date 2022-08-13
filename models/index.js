const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');
require('dotenv').config();

const sequelizeDb = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  process.env.MYSQL_PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,

    },
  },
);

sequelizeDb.authenticate()
  .then(() => {
    console.log(`connected to DB: ${dbConfig.DB}`);
  })
  .catch((err) => {
    console.error(`error connecting to DB: ${err}`);
  });

const dataBase = {};

dataBase.Sequelize = Sequelize;
dataBase.sequelizeDb = sequelizeDb;

dataBase.users = require('./users')(sequelizeDb, DataTypes);
dataBase.paths = require('./paths')(sequelizeDb, DataTypes);
dataBase.concepts = require('./concepts')(sequelizeDb, DataTypes);
dataBase.contents = require('./content')(sequelizeDb, DataTypes);

dataBase.sequelizeDb.sync({ force: false })
  .then(() => {
    console.log('yes re-sync done!');
  });

dataBase.users.hasMany(dataBase.paths, {
  as: 'path',
  foreignKey: 'userId',
  onDelete: 'cascade',
  hooks: true,

});

dataBase.paths.belongsTo(dataBase.users, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'cascade',
  hooks: true,

});

dataBase.paths.hasMany(dataBase.concepts, {
  as: 'concept',
  foreignKey: 'pathId',
  onDelete: 'cascade',
  hooks: true,
});

dataBase.concepts.belongsTo(dataBase.paths, {
  foreignKey: 'pathId',
  as: 'path',
  onDelete: 'cascade',
  hooks: true,
});

dataBase.concepts.hasMany(dataBase.contents, {
  as: 'content',
  foreignKey: 'conceptId',
  onDelete: 'cascade',
  hooks: true,
});

dataBase.contents.belongsTo(dataBase.concepts, {
  foreignKey: 'conceptId',
  as: 'concept',
  onDelete: 'cascade',
  hooks: true,
});

module.exports = dataBase;
