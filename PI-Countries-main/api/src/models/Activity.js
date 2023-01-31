const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id: {
      type: DataTypes.UUID,  // <--- crea id unocos alfanimericos
      defaultValue: DataTypes.UUIDV4,  //<-- el id que creea es V2 basado en 8bits
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    }, 
    difficulty: {
        type: DataTypes.INTEGER,
    },
    duration: {
        type: DataTypes.STRING,
    },
    season: {
        type: DataTypes.STRING,
    },
  });
};
