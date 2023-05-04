// Inicializa Google Identity Services al cargar la página.
window.onload = function () {
  google.accounts.id.initialize({
      client_id: '683330713919-4uncacmbb91tdm0c142e2esscrsbhfb2.apps.googleusercontent.com',
      callback: handleCredentialResponse,
      auto_prompt: false,
  });
};

// Inicia el flujo de inicio de sesión de Google al hacer clic en tu icono.
$(document).ready(function () {
  $('.fa-google').click(function () {
      google.accounts.id.prompt();
  });
});

// Maneja la respuesta del inicio de sesión de Google.
function handleCredentialResponse(response) {
  console.log(`Token: ${response.credential}`);
}
//santi jodio el push
