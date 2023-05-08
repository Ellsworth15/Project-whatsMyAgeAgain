const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const calculateBtn = document.getElementById('calculate-btn');
const yearsResult = document.getElementById('years');
const monthsResult = document.getElementById('months');
const daysResult = document.getElementById('days');

const daysInMonth = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31
};

function calculateAge(e) {
  e.preventDefault();

  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  let today = new Date();
  let birthdate = new Date(year, month - 1, day);

  if (day === '' || month === '' || year === '') {
    clearResults();
    showError('Please enter all fields');
  } else if (day < 1 || day > 31) {
    clearResults();
    showError('Day should be between 1-31');
  } else if (month < 1 || month > 12) {
    clearResults();
    showError('Month should be between 1-12');
  } else if (year > today.getFullYear()) {
    clearResults();
    showError('Year cannot be in the future');
  } else if (day > daysInMonth[month]) {
    clearResults();
    showError(`There are ${daysInMonth[month]} days in ${getMonthName(month)}`);
  } else if (birthdate > today) {
    clearResults();
    showError('Invalid date');
  } else {
    let years = today.getFullYear() - year;
    let months = today.getMonth() - month;
    let days = today.getDate() - day;

    if (months < 0) {
      years--;
      months += 12;
    }

    if (days < 0) {
      let daysInPrevMonth = daysInMonth[today.getMonth()] || 31;
      months--;
      days += daysInPrevMonth;
    }

    yearsResult.innerText = `${years} years`;
    monthsResult.innerText = `${months} months`;
    daysResult.innerText = `${days} days`;

    animateNumbers(years, months, days);
  }
}

function clearResults() {
  yearsResult.innerText = '';
  monthsResult.innerText = '';
  daysResult.innerText = '';
}

function showError(message) {
  const errorDivs = document.getElementsByClassName('error-msg');

  for (let i = 0; i < errorDivs.length; i++) {
    errorDivs[i].innerText = message;
  }
}

function getMonthName(monthNumber) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return months[monthNumber - 1];
}

function animateNumbers(years, months, days) {
  let startYears = 0;
  let startMonths = 0;
  let startDays = 0;

  const stepYears = Math.ceil(years / 50);
  const stepMonths = Math.ceil(months / 50);
  const stepDays = Math.ceil(days / 50);

  const intervalId = setInterval(() => {
    startYears += stepYears;
    startMonths += stepMonths;
    startDays += stepDays;

    if (startYears >= years) {
      clearInterval(intervalId);
      startYears = years;
    }

    if (startMonths >= months) {
      startMonths = months;
    }

    if (startDays >= days) {
      startDays = days;
    }

    yearsResult.innerText = `${startYears} years`;
    monthsResult.innerText = `${startMonths} months`;
    daysResult.innerText = `${startDays} days`;
  }, 20);
}

