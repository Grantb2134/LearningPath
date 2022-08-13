module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('content', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conceptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'concepts',
        key: 'id',
      },
    },
  });
  return Content;
};
