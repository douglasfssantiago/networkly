'use strict';

import { select, selectById, listen, create } from "./utils.js";

const loginBtn = select('.login-btn');
const usersContainer = select('.users');
const errorMessage = selectById('error-message');
const API_URL = 'https://randomuser.me/api/?nat=CA&results=10&seed=same';
const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
}

async function getUsers() {
  try {
    const response = await fetch(API_URL, options);

    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    const users = data.results;

    loadUsers(users);

  } catch(error) {
    console.log(error.message);
  }
}

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

function loadUsers(users) {
    //console.log(users);
    if (users.length > 0) {
        for (const user of users) {
            loadUser(user);
        }
    }
}

function loadUser(user) {
    if (JSON.stringify(user).length > 0) {
        const userDiv = create('div');
        const img = create('img');
        const nameTitle = create('div');
        const name = create('h3');
        const title = create('h4');
        const plus = create('div');

        userDiv.classList.add('user', 'flex');
        img.src = user.picture.thumbnail;
        nameTitle.classList.add('name-title', 'grid');
        name.innerText = `${user.name.first} ${user.name.last}`;
        title.innerText = `${user.location.city}`;
        nameTitle.appendChild(name);
        nameTitle.appendChild(title);
        plus.classList.add('plus', 'center');
        plus.innerHTML = `<i class="fa-solid fa-plus"></i>`;

        userDiv.appendChild(img);
        userDiv.appendChild(nameTitle);
        userDiv.appendChild(plus);

        usersContainer.appendChild(userDiv);
    }

}

listen('load', window, () => { 
    console.log(isAvailable());
    if (!isAvailable()) {
        localStorage.setItem('username', 'johnsmith');
        localStorage.setItem('password', '123456');
    }
    getUsers();
});

listen('click', loginBtn, handleLogin);

listen('keydown', window, (event) => {
    if (event.key === 'Enter') {
        handleLogin();
    }
});