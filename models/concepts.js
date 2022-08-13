module.exports = (sequelize, DataTypes) => {
  const Concept = sequelize.define('concepts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pathId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'paths',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  });
  return Concept;
};
