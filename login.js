// Login Logic
const loginForm = document.getElementById("login-form");
let users = JSON.parse(localStorage.getItem("users")) || [];
const loginEmail = document.getElementById("loginemail");
const loginPassword = document.getElementById("loginpassword");

loginForm.addEventListener("submit", handleLoginUser);

function handleLoginUser(event) {
  event.preventDefault();
  const user = users.find((user) => user.email === loginEmail.value);
  if (user && user.password === loginPassword.value) {
    Toastify({
      text: "Login Successfully...",
      duration: -1,
      gravity: "top",
      style: {
        background: "green",
      },
      position: "right",
      stopOnFocus: true,
      onClick: function () {}, // Callback after click
    }).showToast();
    loginForm.reset();
    setTimeout(() => {
      window.location.href = "profile.html";
    }, 3000);
  } else {
    Toastify({
      text: "Invalid Email or Password",
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
  }
}

