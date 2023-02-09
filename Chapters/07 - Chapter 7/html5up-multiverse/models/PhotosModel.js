module.exports = (sequelize, DataTypes) => {
    const Photos = sequelize.define(
      "photo", // will be pluralized
      {
        id: { 
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
        title: {
          type: DataTypes.STRING,
        },
        slug: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.INTEGER,
        },
        mediaLocation: {
          type: DataTypes.STRING,
        },
      } //options such as static table name and timestamps false can be passed here as obj
    );
  
    return Photos;
  };