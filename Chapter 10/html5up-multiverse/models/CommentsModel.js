module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define(
      "comment",
      {
        id: { 
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
        photoId: {
          type: DataTypes.INTEGER,
        },
        content: {
          type: DataTypes.STRING,
        }
      }
    );
  
    return Comments;
  };