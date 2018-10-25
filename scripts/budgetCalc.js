const _ = require('lodash');
const moment = require('moment');
const holidays = require('@date/holidays-us');
//let inputData = require('../controllers/expense-controller.js')

//var usersInput = inputData.userInput();
//console.log('usersInput:', usersInput);

//console.log('from expense controller:', inputData.newDateFormatted);
//let importedData = inputData.reqBodyData();
//console.log('importedData:', importedData);

let theFunction = {
  showFunc: function datesCalc(dateInput, nameInput, costInput) {
    var fakeDate = '2018-10-27';
    var fakeName = 'billName';
    var fakeCost = '100.00';

    var result = [
      {
        id: 1,
        name: nameInput,
        cost: costInput,
        date: dateInput
      }
    ];

    //Gets name for bill in respective key value pair
    function getID(x) {
      temp = parseInt(result[x].id);
      return temp;
    }

    //Gets name for bill in respective key value pair
    function billName(x) {
      temp = result[x].name;
      return temp;
    }

    // Gets bill amount for bill in respective key value pair
    function amount(x) {
      temp = parseFloat(result[x].cost);
      return temp;
    }

    // Gets the due date for bill in respective key value pair
    function dueDate(x) {
      temp = parseInt(result[x].date[8] + result[x].date[9]);
      return temp;
    }

    let bills = Object.keys(result).map(function(key) {
      return result[key];
    });

    // Function to call bill amounts into an array
    billsArray = () => {
      tempObj = {};
      // for loop puts bills into object
      for (let i = 0; i < bills.length; i++) {
        tempObj[i] = amount(i);
      }
      // tempObj get converted to an array
      tempArray = Object.keys(tempObj).map(function(key) {
        return tempObj[key];
      });
      return tempArray;
    };

    // Stores bills array into variable
    var billsArray = billsArray();
    //console.log(billsArray);

    // Function to call bill names into an array
    billNameArray = () => {
      tempObj = {};
      // for loop puts bills into object
      for (let i = 0; i < bills.length; i++) {
        tempObj[i] = billName(i);
      }
      // tempObj get converted to an array
      tempArray = Object.keys(tempObj).map(function(key) {
        return tempObj[key];
      });
      return tempArray;
    };

    // Stores bills array into variable
    var billNamesArray = billNameArray();

    // Function to call bill names into an array
    billIDArray = () => {
      tempObj = {};
      // for loop puts bills into object
      for (let i = 0; i < bills.length; i++) {
        tempObj[i] = getID(i);
      }
      // tempObj get converted to an array
      tempArray = Object.keys(tempObj).map(function(key) {
        return tempObj[key];
      });
      return tempArray;
    };

    // Stores bills array into variable
    var billsIDArray = billIDArray();
    //console.log(billsIDArray);

    // Creates an array from the due dates in our users object
    DueDate = () => {
      tempObj = {};
      // for loop puts due dates into object respective to the other other array previously generated.
      for (var i = 0; i < bills.length; i++) {
        tempObj[i] = dueDate(i); // Here we call the due date function created above.
      }
      // Put the values into an array just like last time
      tempArray = Object.keys(tempObj).map(function(key) {
        return tempObj[key];
      });
      return tempArray;
    };

    // Store the due dates array in a variable
    var dueArray = DueDate();

    // Gets the current unix time
    let nowUnix = moment().valueOf();

    // Convert to this format "2018-09-25T02:24:43-05:00"
    let momentTime = moment(nowUnix).format();

    // Extracting current date from above variable
    var year = parseInt(
      momentTime[0] + momentTime[1] + momentTime[2] + momentTime[3]
    );
    var month = parseInt(momentTime[5] + momentTime[6]);
    var day = parseInt(momentTime[8] + momentTime[9]);

    //month = 7;

    // Converts to this format "in 6 days" // Calculates the days left in the month
    var untilEnd = moment()
      .endOf('month')
      .fromNow();
    //console.log(untilEnd);

    var getDaysArray = function(year, month) {
      var names = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      var date = new Date(year, month - 1, 1);
      var result = [];
      while (date.getMonth() == month - 1) {
        result.push(date.getDate() + '-' + names[date.getDay()]);
        date.setDate(date.getDate() + 1);
      }
      return result;
    };

    function lastdayOfMonth(year, month) {
      var result = [];
      allArray = getDaysArray(year, month);
      daysInMonth = allArray.length;
      dayOfWeek =
        allArray[allArray.length - 1][3] +
        allArray[allArray.length - 1][4] +
        allArray[allArray.length - 1][5];
      result.push(daysInMonth);
      result.push(dayOfWeek);
      return result;
    }

    // Extracting current days left in month from above variable
    var daysLeft = parseInt(untilEnd[3] + untilEnd[4]); // converts to a number
    //console.log(daysLeft);

    // Calculates the number of days left in the current month
    var totalDays = lastdayOfMonth(year, month)[0];
    //console.log('total days in month: ' + totalDays);

    // Function to make sure bills on the 31st or 29th dont get missed because of some months being shorter
    function accountForMonthsDays() {
      tempObj = {};
      // Analyze how many items exist in our above declared array of due dates
      for (var i = 0; i < dueArray.length; i++) {
        // If the total days in the current month is less than a due date with a higher value then make the new due date for the bill on the last day of the current month otherwise put the original value into the tempObj.
        if (totalDays < dueArray[i]) {
          tempObj[i] = totalDays;
        } else {
          tempObj[i] = dueArray[i];
        }
      }
      // Object to array
      tempArray = Object.keys(tempObj).map(function(key) {
        return tempObj[key];
      });
      return tempArray;
    }

    // Store days in month array adjusted values in variable
    var adjustedDayOfMonthDatesObj = accountForMonthsDays();

    // Shows us what day of the week the last day of the month is on
    var dayOfWeek = lastdayOfMonth(year, month)[1];
    //console.log(dayOfWeek);

    // If the last day of the week is on a Sat or Sun then we the better due date as a friday into "billDate"
    var billDate;
    if (dayOfWeek == 'sun') {
      billDate = totalDays - 2;
    } else if (dayOfWeek == 'sat') {
      billDate = totalDays - 1;
    } else if (dayOfWeek == 'fri') {
      billDate = totalDays - 0;
    }

    // Takes current array and moves end of the month due dates to a weekday
    function accountForWeekend() {
      tempObj = {};
      // For loop to check all days in the month and see if they are greater or equal to the date that falls on a Sat or Sun. Changes to due date to a friday if last day of the month is on a weekend.
      for (var i = 0; i < adjustedDayOfMonthDatesObj.length; i++) {
        if (adjustedDayOfMonthDatesObj[i] >= billDate) {
          tempObj[i] = billDate;
        } else {
          tempObj[i] = adjustedDayOfMonthDatesObj[i];
        }
      }
      //Move new due dates to array
      var tempArray = Object.keys(tempObj).map(function(key) {
        return tempObj[key];
      });
      return tempArray;
    }

    // Stores weekend adjusted array into variable
    var pre_holiday_due_dates = accountForWeekend();

    // Put holidays into an object that may affect banking hours
    let rawHolidayObj = {
      New_Years_Day: holidays.newYearsDay(year),
      Valentines_Day: holidays.valentinesDay(year),
      Martin_Luther_King_Day: holidays.martinLutherKingDay(year),
      Presidents_Day: holidays.presidentsDay(year),
      Easter: holidays.easter(year),
      Mothers_Day: holidays.mothersDay(year),
      Memorial_Day: holidays.memorialDay(year),
      Fathers_Day: holidays.fathersDay(year),
      Independence_Day: holidays.independenceDay(year),
      Labor_Day: holidays.laborDay(year),
      Columbus_Day: holidays.columbusDay(year),
      Halloween: holidays.halloween(year),
      Veterans_Day: holidays.veteransDay(year),
      Thanksgiving: holidays.thanksgiving(year),
      Christmas_Day: holidays.christmas(year)
    };

    // Can call the respective Holiday Name
    function holidayList(data) {
      keys = Object.keys(data);
      return keys;
    }

    var holiday_name_Array = holidayList(rawHolidayObj);

    // Puts our holiday dates into an array
    var holiday_dates_Array = Object.keys(rawHolidayObj).map(function(key) {
      return rawHolidayObj[key];
    });

    var realHolDate, hol_Month, hol_Date, hol_Year;

    // Function to call any months holiday dates into an array
    function withHolidaysAcounted(x) {
      tempObj = {};
      tempObj2 = {};
      tempHoldArray = [];
      // for loop looks at all the dates in the year
      for (var i = 0; i < holiday_dates_Array.length; i++) {
        realHolDate = moment(holiday_dates_Array[i]).format('L'); //MM/DD/YYYY
        hol_Month = parseInt(realHolDate[0] + realHolDate[1]);
        hol_Date = parseInt(realHolDate[3] + realHolDate[4]);
        hol_Year = parseInt(
          realHolDate[6] + realHolDate[7] + realHolDate[8] + realHolDate[9]
        );
        // if the month passed into the function matches any of the holiday months take the respective months holiday dates and put them into an object.
        if (hol_Month == x) {
          tempObj[i] = hol_Date;
          tempHoldArray.push(holiday_name_Array[i]);
          tempObj2[1] = tempHoldArray;
        }
      }
      var tempArray = Object.keys(tempObj).map(function(key) {
        return tempObj[key];
      });
      tempObj2[0] = tempArray;
      var tempArray2 = Object.keys(tempObj2).map(function(key) {
        return tempObj2[key];
      });
      return tempArray2;
    }

    // Stores any months holiday dates into an array
    var currentMonthHoliday = withHolidaysAcounted(month)[0];
    var nextMonthsHolidays = withHolidaysAcounted(month + 1)[0];
    var currentMonthHolidayName = withHolidaysAcounted(month)[1];

    // Function to return array of due dates accounting for holidays that may affect banking hours.
    function finalDueDates() {
      var tempObj = {};
      // for loop goes through our weekend adjusted due dates and analyzes if any of the dates match a holiday and if so then moves the due date 1 day back.
      for (var i = 0; i < pre_holiday_due_dates.length; i++) {
        if (currentMonthHoliday[i] == pre_holiday_due_dates[i]) {
          tempObj[i] = pre_holiday_due_dates[i] - 1;
        } else {
          tempObj[i] = pre_holiday_due_dates[i];
        }
      }

      var tempArray = Object.keys(tempObj).map(function(key) {
        return tempObj[key];
      });
      return tempArray;
    }

    var finalDueDates = finalDueDates();

    function dueDateOverlap() {
      var tempObj = {};
      for (var i = 0; i < finalDueDates.length; i++) {
        if (nextMonthsHolidays[i] == finalDueDates[i]) {
          tempObj[i] = finalDueDates[finalDueDates.length - 1];
        }
      }
      var tempArray = Object.keys(tempObj).map(function(key) {
        return tempObj[key];
      });
      return tempArray;
    }

    // Uses lodash to calculate the sum of the array
    let billSum = _.sum(billsArray);

    var lastPaydateIndicie = finalDueDates.length - 1;

    function amountToSave() {
      var tempObj = {};

      for (var i = 0; i <= finalDueDates[lastPaydateIndicie]; i++) {
        tempObj[i] = billSum / finalDueDates[lastPaydateIndicie];
      }

      var tempArray = Object.keys(tempObj).map(function(key) {
        return tempObj[key];
      });
      return tempArray;
    }

    var daily_save_array = amountToSave();

    // console.log(`
    //     ================================

    //     Moment Output(String) - Until Month Over: ${untilEnd}
    //     My Output As Number - Days Left In Month: ${daysLeft}

    //         --CURRENT DATE--
    //             Year: ${year}
    //             Month: ${month}
    //             Day: ${day}

    //     Total Days In This Month: ${totalDays}

    //     Bill Amounts: ${billsArray}
    //     Respective Bill ID Within Sequelize: ${billsIDArray}
    //     Respective Bill Names: ${billNamesArray}
    //     Respective Due Dates: ${finalDueDates}
    //     Daily Amount To Save: $${daily_save_array[0]}
    //     Bills Sum This Month: $${billSum}

    //     Current Month Holidays: ${withHolidaysAcounted(month)}

    //     Number of Bills This Month: ${bills.length}
    //     ================================
    //     `);

    let exportData = {
      untilMonthOver: daysLeft,
      totalDaysInMonth: totalDays,
      billAmounts: billsArray,
      theBillName: billNamesArray,
      calcedDueDate: finalDueDates,
      dailyAmountToSave: daily_save_array[0],
      billsSum: billSum,
      currentMonthHolidays: withHolidaysAcounted(month)
    };

    return exportData;
  }
};

module.exports.runCalc = () => theFunction.showFunc;
