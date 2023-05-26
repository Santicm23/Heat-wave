
const url = window.location.host.includes('localhost')
    ? `http://${window.location.host}/auth`
    : `https://${window.location.host}/auth`;

const btnLogin = document.querySelector('#btnLogin');
const inputUser = document.querySelector('#un-email');
const inputPass = document.querySelector('#pass');
const signUp = document.querySelector('#signup');
const login = document.querySelector('#login');
const logo = document.querySelector('#logo');

function animatelogin() {
    setTimeout(function() {
        login.classList.add('visible'),
        logo.classList.add('visible');
    }, 500);
}
animatelogin();

/! --------------------------------------------Alertas-------------------------------------------------------!/

const alerta1 = (text) => { 
    
    Swal.fire({
        title:'¡Ups!',
        text,
        icon:'error',
        backdrop:true,
        background:'#ffefd8',
        showCloseButton:true
    })
}


/! --------------------------------------------Autentificacion Con google-------------------------------------------------------!/
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
    document.cookie = 'g_state =;'; // eliminando la cookie que evita cancelar la autentificación con google
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
    .then(resp => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error('El nombre de usuario o la contraseña no son correctos');
        }
    })
    .then(({ token }) => {
        localStorage.setItem('token', token);
        window.location = 'feed.html'; // TODO: redireccionar a la pantalla de inicio
    })
    .catch((error)=>alerta1(error.message));

});
  
// Maneja la respuesta del inicio de sesión de Google.
function handleCredentialResponse(response) {
    // Google token
    // console.log('ID TOKEN: ',response.credential);
    fetch(`${url}/google`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({id_token: response.credential})
    })
    .then(resp => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error('El nombre de usuario o la contraseña no son correctos');
        }
    })
    .then(({ token }) => {
        localStorage.setItem('token', token);
        window.location = 'feed.html'; // TODO: redireccionar a la pantalla de inicio
    })
    .catch((error)=>alerta1(error.message));
}

function prenderAros() {
    const aros = document.querySelectorAll('.waves');

    aros.forEach(element => {
        element.classList.add('active');
    });
    setTimeout(() => {
        aros.forEach(element => {
            element.classList.remove('active');
        });
    }, 2000);
}


setInterval(prenderAros,15000);