//https://www.npmjs.com/package/@date/business
const biz = require('@date/business')({
  holidays: require('@date/holidays-us').bank()
});

let theFunction = {
  showFunc: function datesCalc(dateInput, costInput, nameInput) {
    let fixedDate = dateInput;
    let input = fixedDate.split('/');
    let cost = costInput;
    let nameOfBill = nameInput;

    let INPUTyear = parseInt(input[2]);
    let INPUTmonth = parseInt(input[0]);
    let INPUTdate = parseInt(input[1]);

    let daysInMonth = function(year, month) {
      let date = new Date(year, month - 1, 1);
      let dayDates = [];
      while (date.getMonth() == month - 1) {
        dayDates.push(date.getDate());
        date.setDate(date.getDate() + 1);
      }
      return dayDates.length;
    };

    let monthLength = daysInMonth(INPUTyear, INPUTmonth);

    if (INPUTdate > monthLength) {
      INPUTdate = monthLength;
    }

    let getDaysArray = function(year, month) {
      let names = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      let date = new Date(year, month - 1, 1);
      let dayNames = [];
      let dayDates = [];
      let payDatesPreBankHolidays = [];
      while (date.getMonth() == month - 1) {
        dayNames.push(names[date.getDay()]);
        dayDates.push(date.getDate());
        date.setDate(date.getDate() + 1);
      }

      for (let i = 0; i <= dayNames.length - 1; i++) {
        if (
          dayNames[i] == 'mon' ||
          dayNames[i] == 'tue' ||
          dayNames[i] == 'wed' ||
          dayNames[i] == 'thu' //||
          //dayNames[i] == 'fri'
        ) {
          payDatesPreBankHolidays.push(dayDates[i]);
        }
      }

      return payDatesPreBankHolidays;
    };

    let possible_Mon_Thu = getDaysArray(INPUTyear, INPUTmonth);

    is_a_business_day_and_is_between_Monday_Thursday = [];
    for (let i = possible_Mon_Thu.length - 1; i > 0; i--) {
      var date = new Date(INPUTyear, INPUTmonth, possible_Mon_Thu[i]);
      if (biz.isBusinessDay(date) === true) {
        is_a_business_day_and_is_between_Monday_Thursday.push(
          possible_Mon_Thu[i]
        );
      }
    }
    let non_descript = is_a_business_day_and_is_between_Monday_Thursday;

    function ifCantDoCurrentMonth() {
      if (INPUTmonth == 1) {
        INPUTmonth = 12;
        INPUTyear = INPUTyear - 1;
      } else {
        INPUTmonth = INPUTmonth - 1;
      }
      let possible_augment = getDaysArray(INPUTyear, INPUTmonth);

      augmented_for_prior_month_dates = [];
      for (let i = possible_augment.length - 1; i > 0; i--) {
        var date_augmented = new Date(
          INPUTyear,
          INPUTmonth - 1,
          possible_augment[i]
        );
        if (biz.isBusinessDay(date_augmented) === true) {
          augmented_for_prior_month_dates.push(possible_augment[i]);
        }
      }

      return augmented_for_prior_month_dates[0];
    }

    possible_pay_dates = [];
    for (let i = non_descript.length - 1; i > 0; i--) {
      if (INPUTdate >= non_descript[i]) {
        possible_pay_dates.unshift(non_descript[i]);
      }
    }

    if (typeof possible_pay_dates[0] == 'undefined') {
      possible_pay_dates.unshift(ifCantDoCurrentMonth());
    }

    payDate = possible_pay_dates[0];

    let daily_savings_needed = Number.parseFloat(cost / payDate).toPrecision(4);

    // let exportData = {
    //   totalDaysInMonth: monthLength,
    //   isAnOfficialBusinessDayAndM_Thurs: non_descript,
    //   dueDateGivenByUser: INPUTdate,
    //   possibleDatesToPay: possible_pay_dates,
    //   cost: cost,
    //   name: nameOfBill,
    //   date: INPUTmonth.toString() + '/' + payDate.toString() + '/' + INPUTyear.toString(),
    //   dailyAmountToSaveUntilPaid: daily_savings_needed
    // };

    let exportData = {
      cost: cost,
      name: nameOfBill,
      date:
        INPUTmonth.toString() +
        '/' +
        payDate.toString() +
        '/' +
        INPUTyear.toString(),
      dailyAmountUntilPaid: daily_savings_needed
    };

    console.log(exportData);

    return exportData;
  }
};

// console.log(theFunction.showFunc());

module.exports.runCalc = () => theFunction.showFunc;