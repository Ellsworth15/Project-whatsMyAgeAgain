const form = document.getElementById('age-form');
const dob = document.getElementById('dob');
const ageYears = document.getElementById('age-years');
const ageMonths = document.getElementById('age-months');
const ageDays = document.getElementById('age-days');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const date = new Date(dob.value);
  const now = new Date();
  const age = calculateAge(date, now);

  if (!isValidDate(date) || age.years < 0) {
    showError();
    return;
  }

  animateValue(ageYears, 0, age.years, 1000);
  animateValue(ageMonths, 0, age.months, 1000);
  animateValue(ageDays, 0, age.days, 1000);
});

function calculateAge(dob, now) {
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();
  
    if (months < 0 || (months === 0 && now.getDate() < dob.getDate())) {
      years--;
      months += 12;
    }
  
    if (days < 0) {
      const daysInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      months--;
      days += daysInLastMonth;
    }
  
    return { years, months, days };
  }

function isValidDate(date) {
  return !isNaN(date.getTime());
}

function showError() {
  const error = document.getElementById('error');
  error.style.display = 'block';
}

function animateValue(element, start, end, duration) {
  const range = end - start;
  let current = start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  const timer = setInterval(function() {
    current += increment;
    element.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}