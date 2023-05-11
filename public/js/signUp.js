

const url = `http://${window.location.host}`;

const login = document.querySelector('#login');
const logo = document.querySelector('#logo');

const btnSignUp = document.getElementById('btnSignUp');
const name = document.getElementById('name');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('pass');


function animatelogin() {
    setTimeout(function() {
        login.classList.add('visible'),
        logo.classList.add('visible');
    }, 500);
}

animatelogin();

btnSignUp.addEventListener('click', () => {
    const formData = {
        name: name.value,
        email: email.value,
        username: username.value,
        password: password.value
    }

    fetch(`${url}/accounts/`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(resp => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error(resp.json());
        }
    })
    .then(({ msg }) => {
        console.log(msg);
        window.location = 'index.html'; // TODO: redireccionar a la pantalla de inicio
    })
    .catch((obj) => console.error(obj));
});