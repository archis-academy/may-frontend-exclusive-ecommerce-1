//Log-in Page Start - UMUT

const users = [  
{
      id: 1,
      username: 'admin',
      password: 'admin'
  },
  {
      id: 2,
      username: 'alperen',
      password: '12345678'
  },
  {
      id: 3,
      username: 'umut',
      password: '12345678'
  },
  {
      id: 4,
      username: 'erkin',
      password: '12345678'
  },
  {
      id: 5,
      username: 'esra',
      password: '12345678'
  },
  {
      id: 6,
      username: 'deniz',
      password: '12345678'
  },
  {
      id: 7,
      username: 'merve',
      password: '12345678'
  }
];

document.addEventListener('DOMContentLoaded', function() {
const loginButton = document.querySelector('.loginPageFormButton input[type="button"]');
const errorMessage = document.querySelector('.loginPageFormErrorMessage');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

  loginButton.disabled = true;

loginButton.addEventListener('click', function() {
  const username = usernameInput.value;
  const password = passwordInput.value;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    window.location.href = 'index.html';
  } else {
    if (username === '' || password === '') {
      errorMessage.textContent = 'Please enter Email / Phone Number and Password.';
    } else {
      errorMessage.textContent = 'Email / Phone Number or Password is incorrect. Please try again.';
    }
  }
  loginButton.disabled = true;

  setTimeout(function() {
    loginButton.disabled = false;
  }, 1000);
});
usernameInput.addEventListener('input', function() {
  loginButton.disabled = false;
});

passwordInput.addEventListener('input', function() {
  loginButton.disabled = false;
});
});
//Log-in Page End - UMUT