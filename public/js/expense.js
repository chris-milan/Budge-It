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
    // Don't do anything if the name, cost or date fields haven't been filled out
    if (!nameInput.val().trim() || !costInput.val().trim() || !dateInput.val().trim()) {
      return;
    }
    // Calling the upsertExpense function and passing in the value of the name input
    upsertExpense({
      name: nameInput.val().trim(),
      cost: costInput.val().trim(),
      date: dateInput.val().trim()
    });
  }

  // A function for creating an expense. Calls getExpenses upon completion
  function upsertExpense(expenseData) {
    $.post('/api/expenses', expenseData)
      .then(getExpenses);
  }

  // Function for creating a new list row for expenses
  function createExpenseRow(expenseData) {
    // for (var i = 0, max = expenseData.length; i < max; i++){
    //   var event={title: expenseData.name[i], start:  expenseData.date[i]};
    //   // console.log(expenseData.name);

    //   // $('#calendar').fullCalendar( 'renderEvent', event, true);
    // }
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

    // var calendarData = [];
    // jQuery.each(expenseData, function(index, item){
    //   if(item.repeat == 0){
    //     //normal
    //   }else if(item.repeat == 1){
    //     //use dow property
    //   }else if(item.repeat == 2){



    //     jQuery.each([-12,-11,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12], function(index, item){
    //       //normal but change start property
    //       calendarData.push({
    //         id:item.id,
    //         type:item.type,
    //         title:item.title,
    //         start:moment(item.datetime).add(item,'M').format('Y-MM-DD H:mm')
    //       });
    //     });
    //   }
    // });

    //adds name and cost and finds date to put into fullcalendar
    var event={title: expenseData.name + '\xa0\xa0\xa0\xa0\xa0\xa0' + '$' + expenseData.cost, start: expenseData.date};

    console.log(expenseData.name);

    $('#calendar').fullCalendar( 'renderEvent', event, true);

    return newTr;



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
      expenseList.prepend(rows);
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


// var initialize_calendar;
// initialize_calendar = function() {
//   $('#calendar').each(function(){
//     var calendar = $(this);
//     calendar.fullCalendar({
//       header: {
//         left: 'prev,next today',
//         center: 'title',
//         right: 'month,agendaWeek,agendaDay'
//       },
//       selectable: true,
//       selectHelper: true,
//       editable: true,
//       eventLimit: true,
//       eventSources: [
//         '/events.json',
//         '/recurring_events.json'
//       ],
//       select: function(start, end) {
//         $.getScript('/events/new', function() {
//           $('#event_date_range').val(moment(start).format('MM/DD/YYYY HH:mm') + ' - ' + moment(end).format('MM/DD/YYYY HH:mm'));
//           date_range_picker();
//           $('.start_hidden').val(moment(start).format('YYYY-MM-DD HH:mm'));
//           $('.end_hidden').val(moment(end).format('YYYY-MM-DD HH:mm'));
//         });

//         calendar.fullCalendar('unselect');
//       },

//       eventDrop: function(event, delta, revertFunc) {
//         event_data = {
//           event: {
//             id: event.id,
//             start: event.start.format(),
//             end: event.end.format()
//           }
//         };
//         $.ajax({
//           url: event.update_url,
//           data: event_data,
//           type: 'PATCH'
//         });
//       },

//       eventClick: function(event, jsEvent, view) {
//         $.getScript(event.edit_url, function() {
//           $('#event_date_range').val(moment(event.start).format('MM/DD/YYYY HH:mm') + ' - ' + moment(event.end).format('MM/DD/YYYY HH:mm'));
//           date_range_picker();
//           $('.start_hidden').val(moment(event.start).format('YYYY-MM-DD HH:mm'));
//           $('.end_hidden').val(moment(event.end).format('YYYY-MM-DD HH:mm'));
//         });
//       }
//     });
//   });
// };
// $(document).on('turbolinks:load', initialize_calendar);