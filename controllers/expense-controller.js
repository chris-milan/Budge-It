const db = require('../models');
const express = require('express');
const router = express.Router();
const budgetCalc = require('../scripts/budgetCalc.js');

let calculateIt = budgetCalc.runCalc();
console.log(calculateIt('2018-10-27', 'billName', '100.00'));

// Find all Expenses and return them to the user with res.json
router.get('/api/expenses', function(req, res) {
  db.Expense.findAll({}).then(function(dbExpense) {
    res.json(dbExpense);
  });
});

router.get('/api/expenses/:id', function(req, res) {
  // Find one Expense with the id in req.params.id and return them to the user with res.json
  db.Expense.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(dbExpense) {
    res.json(dbExpense);
  });
});

router.post('/api/expenses', function(req, res) {
  // Create an Expense with the data available to us in req.body

  let reformattedDate = {
    month: parseInt(req.body.date[0] + req.body.date[1]),
    date: parseInt(req.body.date[3] + req.body.date[4]),
    year: parseInt(
      req.body.date[6] + req.body.date[7] + req.body.date[8] + req.body.date[9]
    )
  };

  let newDateFormatted =
    reformattedDate.year +
    '-' +
    reformattedDate.month +
    '-' +
    reformattedDate.date;

  //console.log('newDateFormatted: ', newDateFormatted);
  //module.exports.userInput = () => newDateFormatted;

  db.Expense.create(req.body)
    .then(function(dbExpense) {
      res.json(dbExpense);
    })
    .then(() => {
      //
      //console.log(req.body);
    });

  //

  //

  //
});

router.delete('/api/expenses/:id', function(req, res) {
  // Delete the Expense with the id available to us in req.params.id
  db.Expense.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbExpense) {
    res.json(dbExpense);
  });
});

module.exports = router;
