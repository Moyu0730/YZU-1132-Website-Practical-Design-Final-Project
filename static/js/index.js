function getCookie( name ){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if( parts.length === 2 ) return parts.pop().split(';').shift().trim();
    return '';
}

function setCookie( nickname, username, password, email ){
    const FIVE_DAYS = 60 * 60 * 24 * 5; // seconds in five days
    const expires = new Date(Date.now() + FIVE_DAYS * 1000).toUTCString();
    document.cookie = `username=${username}; expires=${expires}; path=/; SameSite=Lax`;
    document.cookie = `nickname=${nickname}; expires=${expires}; path=/; SameSite=Lax`;
    document.cookie = `password=${password}; expires=${expires}; path=/; SameSite=Lax`;
    document.cookie = `email=${email}; expires=${expires}; path=/; SameSite=Lax`;
}

const signContainer = document.getElementById('index-sign');

if( signContainer ){
    const nickname = getCookie('nickname');
    if( nickname != '' ) signContainer.innerHTML = `<a class="link link--text" href="${signContainer.dataset.logoutUrl}">${nickname}</a>`;
    else signContainer.innerHTML = `<a class="link link--text" href="${signContainer.dataset.signUrl}">Sign In</a>`;
}