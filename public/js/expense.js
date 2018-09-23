window.onload=function(){
  // Getting references to the name, date and cost inputs and expense container, as well as the table body
  var nameInput = $('#expense-name');
  var costInput = $('#expense-cost');
  var dateInput = $('#expense-date');

  var expenseList = $('tbody');
  var expenseContainer = $('.expense-container');
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Expense
  $(document).on('submit', '#expense-form', handleExpenseFormSubmit);
  $(document).on('click', '.delete-expense', handleDeleteButtonPress);

  // Getting the intiial list of Expense
  getExpenses();

  // A function to handle what happens when the form is submitted to create a new Expense
  function handleExpenseFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim() || !costInput.val().trim() || !dateInput.val().trim()) {
      return;
    }
    // Calling the upsertExpense function and passing in the value of the name input
    upsertExpense({
      name: nameInput
        .val()
        .trim(),
      cost: costInput
        .val()
        .trim(),
      date: dateInput
        .val()
        .trim()
    });
  }

  // A function for creating an expense. Calls getExpenses upon completion
  function upsertExpense(expenseData) {
    $.post('/api/expenses', expenseData)
      .then(getExpenses);
  }

  // Function for creating a new list row for expenses
  function createExpenseRow(expenseData) {
    console.log(expenseData);
    var newTr = $('<tr>');
    newTr.data('expense', expenseData);
    newTr.append('<td>' + expenseData.name + '</td>');
    newTr.append('<td>' + '$' + expenseData.cost + '</td>');
    newTr.append('<td>' + expenseData.date + '</td>');
    // newTr.append('<td># of posts will display when we learn joins in the next activity!</td>');
    // newTr.append('<td><a href=\'/blog?expense_id=' + expenseData.id + '\'>Go to Posts</a></td>');
    // newTr.append('<td><a href=\'/cms?expense_id=' + expenseData.id + '\'>Create a Post</a></td>');
    newTr.append('<td><a style=\'cursor:pointer;color:blue\' class=\'delete-expense\'>Delete Expense</a></td>');

    //adds name and cost and finds date to put into fullcalendar
    var event={id:1 , title: expenseData.name + '\xa0\xa0\xa0\xa0\xa0\xa0' + '$' + expenseData.cost, start:  expenseData.date};
    console.log(expenseData.name);

    $('#calendar').fullCalendar( 'renderEvent', event, true);

    return newTr;

    for (var i = 0, max = expenseData.length; i < max; i++){
      var event={id:1 , title: expenseData.name, start:  expenseData.date};
      console.log(expenseData.name);

      // $('#calendar').fullCalendar( 'renderEvent', event, true);
    }

  }

  // Function for retrieving expenses and getting them ready to be rendered to the page
  function getExpenses() {
    $.get('/api/expenses', function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createExpenseRow(data[i]));
      }
      renderExpenseList(rowsToAdd);
      nameInput.val('');
      costInput.val('');
      dateInput.val('');
    });
  }

  // A function for rendering the list of expenses to the page
  function renderExpenseList(rows) {
    expenseList.children().not(':last').remove();
    expenseContainer.children('.alert').remove();
    if (rows.length) {
      console.log(rows);
      expenseList.append(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no expenses
  function renderEmpty() {
    var alertDiv = $('<div>');
    alertDiv.addClass('alert alert-danger');
    alertDiv.text('You must create an Expense before you can create a Post.');
    expenseContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent('td').parent('tr').data('expense');
    var id = listItemData.id;
    location.reload();
    $.ajax({
      method: 'DELETE',
      url: '/api/expenses/' + id
    })
      .then(getExpenses);
  }
};
