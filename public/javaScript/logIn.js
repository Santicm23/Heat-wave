
const url = `http://${window.location.host}/auth`;


const btnLogin = document.querySelector('#btnLogin');

const inputUser = document.querySelector('#un-email');
const inputPass = document.querySelector('#pass');


// Inicializa Google Identity Services al cargar la página.
window.onload = () => {
    google.accounts.id.initialize({
        client_id: '683330713919-4uncacmbb91tdm0c142e2esscrsbhfb2.apps.googleusercontent.com',
        callback: handleCredentialResponse,
        auto_prompt: false,
    });
  };
  
// Inicia el flujo de inicio de sesión de Google al hacer clic en tu icono.
$('.fa-google').click(function () {
    google.accounts.id.prompt();
});

btnLogin.addEventListener('click', event => {
    event.preventDefault();

    const formData = {
        password: inputPass.value
    };

    if (inputUser.value.includes('@')) {
        formData.email = inputUser.value;
    } else {
        formData.username = inputUser.value;
    }


    fetch(`${url}/login`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(resp => resp.json())
        .then(({ msg, token }) => {
            if (msg) {
                return console.error(msg);
            }
            localStorage.setItem('token', token);
            window.location = 'nuevo.html'; // TODO: redireccionar a la pantalla de inicio
        })
        .catch(err => console.error(err));

});
  
// Maneja la respuesta del inicio de sesión de Google.
function handleCredentialResponse(response) {


    console.log('bbbbb');
    // Google token
    // console.log('ID TOKEN: ',response.credential);
    fetch(`${url}/google`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({id_token: response.credential})
    })
    .then(resp => resp.json())
    .then(({ token }) => {
        localStorage.setItem('token', token);
        window.location = 'nuevo.html'; // TODO: redireccionar a la pantalla de inicio
    })
    .catch(console.warn);
}