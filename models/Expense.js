module.exports = function(sequelize, DataTypes) {
  var Expense = sequelize.define('Expense', {
    // Giving the Expense model a name of type STRING
    name: DataTypes.STRING,
    cost: DataTypes.DECIMAL(10, 2),
    date: DataTypes.DATEONLY,
    dailyAmountUntilPaid: DataTypes.DECIMAL(10, 2)
  });

  return Expense;
};
