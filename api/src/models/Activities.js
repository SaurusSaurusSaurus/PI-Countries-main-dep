const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
    id: {
      // type: DataTypes.UUID,
      // defaultValue: DataTypes.UUIDV4,// genera auto UUIDV4
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min: 1,
        max: 5,
        isEven(value){
          if(value <1 || value > 5){
            throw new Error('Dificult not allowed');
          }
        }
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min: 1,
        max: 24,
        isEven(value){
          if(value <1 || value > 24){
            throw new Error('Duration not allowed');
          }
        }
      }
    },
    season: {
      type: DataTypes.ENUM(['Summer', 'Spring', 'Winter', 'Autumn']),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  });
};