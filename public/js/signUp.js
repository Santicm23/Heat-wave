

const loGin = document.getElementById('loGin');
const login = document.querySelector('#login');
const logo = document.querySelector('#logo');

function animatelogin() {
    setTimeout(function() {
        login.classList.add('visible'),
        logo.classList.add('visible');
    }, 500);
}

animatelogin();
