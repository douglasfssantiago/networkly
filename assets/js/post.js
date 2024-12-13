'use strict';

import { select, selectById, listen } from './utils.js';

const inputObj = select('.source'); 
const postObj = select('.post-btn'); 
const postsNewObj = select('.post-new');
const fileInputObj = selectById('fileInput');
const fileNameObj = select('.file-name');
let postId = 1;

listen('change', fileInputObj, function (event) {
    const file = event.target.files[0];
    uploadImage(file);
});

listen('click', postObj, function () {
    const file = fileInputObj.files[0];
    createPost(inputObj.value, file);
});

function createPost(input, file) {
    if (!input && !file) {
        return;
    }
    const postItem = document.createElement('div');
    const postHead = document.createElement('div');
    const col = document.createElement('div');
    const postImageProfile = document.createElement('figure');
    const postIdentity = document.createElement('div');
    const postOptions = document.createElement('div');
    const postText =  document.createElement('div');
    const postImage = document.createElement('div');
    const postLikes = document.createElement('div');

    postHead.classList.add('post-head');
    postHead.classList.add('flex');

    col.classList.add('col');
    col.classList.add('flex');

    postImageProfile.classList.add('post-image-profile');
    postImageProfile.innerHTML = '<img class="post-photo" src="./assets/img/profile.jpg">';

    postIdentity.classList.add('post-identity');
    postIdentity.innerHTML = `<p class="post-name">John Smith</p><p>Software Developer</p>`;

    postOptions.classList.add('post-options');
    postOptions.innerHTML = '<i class="post-ellipsis fa-solid fa-ellipsis"></i><p>1s ago</p>';

    postText.classList.add('post-text');
    postText.classList.add('flex');
    postText.innerHTML = `<p class="message">${input}</p>`;

    postImage.classList.add('post-image');
    postImage.classList.add('flex');
    postImage.style.height = '0';

    postLikes.classList.add('post-likes');
    postLikes.classList.add('flex');
    postLikes.innerHTML = '<i class="heart fa-solid fa-heart"></i><label></label>' +
                          '<i class="comment fa-regular fa-comment"></i><label></label>' +
                          '<i class="share fa-solid fa-share-nodes"></i><label></label>';

    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            postImage.style.backgroundImage = `url('${reader.result}')`;
            postImage.style.height = '616px'; 
        };
        reader.readAsDataURL(file);
    }
    
    col.appendChild(postImageProfile);
    col.appendChild(postIdentity);
    col.appendChild(postOptions);
    postHead.appendChild(col);

    postItem.classList.add('post');
    postItem.classList.add('grid');
    postItem.appendChild(postHead);
    postItem.appendChild(postText);
    postItem.appendChild(postImage);
    postItem.appendChild(postLikes);

    postItem.dataset.postId = getPostIdentifier();
    postItem.style.display = 'inline-block';

    inputObj.value = '';
    fileInput.value = '';
    fileNameObj.innerText = '';
    
    postsNewObj.prepend(postItem);
}

function getPostIdentifier() {
    return `post${postId++}`;
}

function uploadImage(file) {
    console.log("file", file);
    if (file) {
        fileNameObj.innerText = `File: ${file.name}`;
    }
}