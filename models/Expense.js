module.exports = function(sequelize, DataTypes) {

  var Expense = sequelize.define('Expense', {
    // Giving the Expense model a name of type STRING
    name: DataTypes.STRING,
    cost: DataTypes.DECIMAL(10,2),
    date: DataTypes.DATEONLY,
    signup: DataTypes.DATEONLY,
    contract:DataTypes.INTEGER

  });

  Expense.associate = function(models) {
    // Associating Expense with Posts
    // When an Expense is deleted, also delete any associated Posts
    Expense.hasMany(models.Post, {
      onDelete: 'cascade'
    });
  };

  return Expense;
};
