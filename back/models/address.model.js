const { DataTypes } = require('sequelize');
const sequelize = require('../db/sql.db.config'); 

const Address = sequelize.define('Address', {
 
  street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true // createdAt and updatedAt will be automatically managed
});

module.exports = Address;
