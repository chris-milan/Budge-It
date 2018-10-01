module.exports = function (sequelize, DataTypes) {

  var Expense = sequelize.define('Expense', {
    // Giving the Expense model a name of type STRING
    name: DataTypes.STRING,
    cost: DataTypes.DECIMAL(10, 2),
    date: DataTypes.DATEONLY,
    date2: DataTypes.DATEONLY,
    dailyAmount: DataTypes.DECIMAL(10, 2),
    totalBillsSum: DataTypes.DECIMAL(10, 2),
    jan: DataTypes.DATEONLY,
    feb: DataTypes.DATEONLY,
    mar: DataTypes.DATEONLY,
    apr: DataTypes.DATEONLY,
    jun: DataTypes.DATEONLY,
    jul: DataTypes.DATEONLY,
    aug: DataTypes.DATEONLY,
    sep: DataTypes.DATEONLY,
    oct: DataTypes.DATEONLY,
    nov: DataTypes.DATEONLY,
    dec: DataTypes.DATEONLY,
  

  });

  Expense.associate = function (models) {
    // Associating Expense with Posts
    // When an Expense is deleted, also delete any associated Posts
    Expense.hasMany(models.Post, {
      onDelete: 'cascade'
    });
  };

  return Expense;
};