'use strict';

import { select, selectById, listen } from "./utils.js";

listen('load', window, () => { 
    if (!localStorage.getItem('username') && !localStorage.getItem('password')) {
        localStorage.setItem('username', 'johnsmith');
        localStorage.setItem('password', '123456');
    }
});

const loginBtn = select('.login-btn');
const errorMessage = selectById('error-message');

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

listen('click', loginBtn, handleLogin);

listen('keydown', window, (event) => {
    if (event.key === 'Enter') {
        handleLogin();
    }
});