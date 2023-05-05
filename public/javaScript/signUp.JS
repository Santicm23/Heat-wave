const loGin = document.getElementById('loGin');
const login = document.querySelector('#login');
const logo = document.querySelector('#logo');

loGin.addEventListener('click', () => {
  window.location.href = 'index.html';
});

function animatelogin() {
    setTimeout(function() {
      login.classList.add('visible'),
      logo.classList.add('visible');
    }, 500);
  }
  animatelogin();
