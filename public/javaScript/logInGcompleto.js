const url = `http://${window.location.host}/auth`;

const btnLogin = document.querySelector('#btnLogin');
const inputUser = document.querySelector('#un-email');
const inputPass = document.querySelector('#pass');
const sigUp = document.querySelector('signup');

// Carga la plataforma de Google y configura el cliente.
function initGoogleAuth() {
  gapi.load('auth2', function() {
      gapi.auth2.init({
          client_id: '683330713919-4uncacmbb91tdm0c142e2esscrsbhfb2.apps.googleusercontent.com'
      });
  });
}

// Inicia el flujo de inicio de sesión de Google al hacer clic en el icono.
$('.fa-google').click(function () {
  signInWithGoogle();
});

function signInWithGoogle() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signIn().then(function(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      handleCredentialResponse(id_token);
  }).catch(function(error) {
      if (error.error === 'popup_closed_by_user') {
          console.error('El cuadro de diálogo de inicio de sesión de Google fue cerrado por el usuario.');
      } else {
          console.error('Error en inicio de sesión con Google: ', error);
      }
  });
}

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
function handleCredentialResponse(id_token) {
  fetch(`${url}/google`, {
      method: 'POST',
      headers: {
          'content-Type': 'application/json'
      },
      body: JSON.stringify({id_token})
  })
  .then(resp => resp.json())
  .then(({ token }) => {
      console.log('Token de Google:', token); // Imprime el token en la consola
      localStorage.setItem('token', token);
      window.location = 'nuevo.html'; // TODO: redireccionar a la pantalla de inicio
  })
  .catch(console.warn);
}

// Llama a initGoogleAuth cuando la API de Google esté cargada.
window.addEventListener('load', initGoogleAuth);
