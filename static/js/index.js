function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
}

const nickname = getCookie('nickname');
const signContainer = document.getElementById('index-sign');

if( signContainer ){
    if( nickname != '' ){
        signContainer.innerHTML = `<a class="link link--text" href="${signContainer.dataset.logoutUrl}">${nickname}</a>`;
    }else{
        signContainer.innerHTML = `<a class="link link--text" href="${signContainer.dataset.signUrl}">Sign In</a>`;
    }
}