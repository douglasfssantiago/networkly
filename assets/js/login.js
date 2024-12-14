'use strict';

import { select, selectById, listen } from "./utils.js";

const loginBtn = select('.login-btn');
const errorMessage = selectById('error-message');

listen('load', window, () => { 
    if (!isAvailable()) {
        localStorage.setItem('username', 'johnsmith');
        localStorage.setItem('password', '123456');
    }
});

listen('click', loginBtn, handleLogin);

listen('keydown', window, (event) => {
    if (event.key === 'Enter') {
        handleLogin();
    }
});

function handleLogin() {
    const username = selectById('username').value;
    const password = selectById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        window.location.href = 'home.html';
    } else {
        errorMessage.textContent = 'Incorrect username or password';
        errorMessage.style.visibility = 'visible';
    }
}

function isAvailable() {
   return  localStorage.length > 0 
        && 'username' in localStorage 
        && 'password' in localStorage
}
