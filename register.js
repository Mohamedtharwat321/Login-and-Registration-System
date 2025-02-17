//Registeration Logic

const enteredName = document.getElementById("name");
const enteredEmail = document.getElementById("email");
const eneterdPassword = document.getElementById("password");
const enteredMatchedPassword = document.getElementById("password2");
const registerForm = document.getElementById("register-form");

let users = JSON.parse(localStorage.getItem("users")) || [];

registerForm.addEventListener("submit", handleUserRegister);
function handleUserRegister(e) {
  e.preventDefault();
  const req = checkRequired([
    enteredName,
    enteredEmail,
    eneterdPassword,
    enteredMatchedPassword,
  ]);
  const lenName = checkLength(enteredName, 3, 15);
  const lenPass = checkLength(eneterdPassword, 6, 25);
  const chkMail = checkEmail(enteredEmail);
  const chkPass = checkPasswordsMatch(eneterdPassword, enteredMatchedPassword);
  if (req && lenName && lenPass && chkMail && chkPass) {
    console.log("object");
    addLocalStorage(
      enteredName.value,
      enteredEmail.value,
      eneterdPassword.value
    );
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showSuccess(input) {
  const div = input.parentElement;
  div.classList.remove("error");
  const parDiv = div.parentElement;
  parDiv.classList.remove("show-error");
}

function showError(input, msg) {
  const div = input.parentElement;
  div.classList.remove("success");
  div.classList.add("error");
  const parDiv = div.parentElement;
  parDiv.classList.add("show-error");
  const small = parDiv.querySelector("small");
  small.innerText = msg;
}

function checkRequired(inputArr) {
  let fg = true;
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      fg = false;
    } else showSuccess(input);
  });
  return fg;
}

function checkLength(input, min, max) {
  let fg = true;
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    fg = false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
    fg = false;
  } else {
    showSuccess(input);
  }
  return fg;
}

function checkEmail(input) {
  let fg = true;
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
    fg = false;
  }
  return fg;
}

function checkPasswordsMatch(input1, input2) {
  let fg = true;
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
    fg = false;
  }
  return fg;
}

function addLocalStorage(name, email, password) {
  const emailExist = users.some((user) => user.email === email);
  if (emailExist) {
    Toastify({
      text: "Email Alreadey Registered",
      close: true,
      duration: -1,
      gravity: "top",
      style: {
        background: "red",
      },
      position: "right",
      stopOnFocus: true,
      onClick: function () {}, // Callback after click
    }).showToast();
  } else {
    users.push({ email, password, name });
    localStorage.setItem("users", JSON.stringify(users));
    Toastify({
      text: "Register Successfully",
      close: true,
      duration: -1,
      gravity: "top",
      style: {
        background: "green",
      },
      position: "right",
      stopOnFocus: true,
      onClick: function () {}, // Callback after click
    }).showToast();
    registerForm.reset();
    setTimeout(() => {
      window.location.href = "Login.html";
    }, 3000);
  }
}
