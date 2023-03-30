const { DataTypes } = require('sequelize');
// Funcion que recibe como argumento en el parametro la instancia de sequelize
// que en si es la variable que llame como sequelize, que se encargara de definir
// al modelo.

module.exports = (sequelize) => {  
  // defino el modelo               
    sequelize.define('videogame', { 

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },

    background_image: {
      type: DataTypes.TEXT,  
    },

    released: {
      type: DataTypes.DATEONLY,
    },

    rating: {
      type: DataTypes.FLOAT 
    },

  },
  
  {
    timestamps: false
  });
};
