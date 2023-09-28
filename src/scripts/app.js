const forms = document.querySelectorAll("[data-form]");

new Swiper(".swiper", {
  pagination: {
    speed: 800,
    spaceBetween: 30,
    slidesPerView: 1,
    el: ".slider__pagination",
    clickable: true,
  },
});


function showError(input, message) {
  const formControl = input.parentElement;
  let small = formControl.querySelector("small");
  if (!small) {
    small = document.createElement("small");
    formControl.appendChild(small);
  }
  formControl.className = "form__line error";
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.closest(".form__line");
  formControl.classList.toggle("success", true);
  formControl.classList.toggle("error", false);
}

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  re.test(input.value.trim()) ? showSuccess(input) : showError(input, "Email is not valid");
}

function checkPhone(input) {
  const re = /^[0-9]{10}$/;
  re.test(input.value.trim()) ? showSuccess(input) : showError(input, "Phone number is not valid. It should be 10 digits.");
}

function checkRequired(inputArr) {
  inputArr.forEach(input => {
    const value = input.value.trim();
    value === "" ? showError(input, `${getFieldName(input)} is required`) : showSuccess(input);
  });
}

function checkLength(input, min, max) {
  const value = input.value.trim();
  value.length < min
    ? showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    : value.length > max
    ? showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    : showSuccess(input);
}

function getFieldName(input) {
  return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

function validateForm(form) {
  const firstName = form.querySelector("[data-firstname]");
  const lastName = form.querySelector("[data-lastname]");
  const email = form.querySelector("[data-email]");
  const tel = form.querySelector("[data-tel]");

  checkRequired([firstName, lastName, email, tel]);
  checkLength(firstName, 3, 15);
  checkLength(lastName, 3, 15);
  checkEmail(email);
  checkPhone(tel);
}

forms.forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    validateForm(form);
  });
});

//range
const $range = $(".js-range-slider");
const min = 1100;
const max = 550000;

$range.ionRangeSlider({
  skin: "big",
  type: "single",
  min: min,
  max: max,
  onStart: function (data) {
    addMarks(data.slider);
  },
  onChange: function (data) {
    const value = data.from * 7; // Multiply the value by 7
    $("#value").text(value + " PLN");
  },
});


function convertToPercent(num) {
  var percent = ((num - min) / (max - min)) * 100;

  return percent;
}
function addMarks(slider) {
  var html = "";
  var left = 0;

  for (var i = 0; i < marks.length; i++) {
    left = convertToPercent(marks[i]);
    var mark = document.createElement("span");
    mark.className = "mark";
    mark.style.left = left + "%";
    mark.innerText = marks[i];
    html += mark.outerHTML;
  }

  slider.insertAdjacentHTML("beforeend", html);
}
