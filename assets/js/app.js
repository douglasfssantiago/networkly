'use strict';

import { select, getElement, listen } from "./utils.js";

const dropdownBtn = select('.dropdown-btn');
const dropdownContent = select('.dropdown-content');

dropdownBtn.addEventListener('click', function() {
    dropdownContent.classList.toggle('show');
});

listen('click', window, (event) => {
    if (!event.target.matches('.dropdown-btn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});

if (!localStorage.getItem('username') && !localStorage.getItem('password')) {
    localStorage.setItem('username', 'johnsmith');
    localStorage.setItem('password', '123456');
}

const loginBtn = document.querySelector('.login-btn');
const errorMessage = document.getElementById('error-message');

loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        window.location.href = 'home.html';
    } else {
        errorMessage.textContent = 'Incorrect username or password';
        errorMessage.style.visibility = 'visible';
    }
});

