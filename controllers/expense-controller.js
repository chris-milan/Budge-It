const db = require("../models");
const express = require('express');
const router = express.Router();

// Find all Expenses and return them to the user with res.json
router.get("/api/expenses", function (req, res) {
  db.Expense.findAll({
    include: [db.Post]
  }).then(function (dbExpense) {
    res.json(dbExpense);
  });
});

router.get("/api/expenses/:id", function (req, res) {
  // Find one Expense with the id in req.params.id and return them to the user with res.json
  db.Expense.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (dbExpense) {
    res.json(dbExpense);
  });
});

router.post("/api/expenses", function (req, res) {
  // Create an Expense with the data available to us in req.body
  console.log(req.body);
  db.Expense.create(req.body).then(function (dbExpense) {
    res.json(dbExpense);
  });
});

router.delete("/api/expenses/:id", function (req, res) {
  // Delete the Expense with the id available to us in req.params.id
  db.Expense.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbExpense) {
    res.json(dbExpense);
  });
});

module.exports = router;