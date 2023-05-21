/!Funcion para cambiar entre los diferentes Grids !/
function changeSection(activeSectionId) {
  var sections = document.querySelectorAll(".section-content");

  sections.forEach(function(section) {
    if (section.id === activeSectionId) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
}

document.getElementById("post-btn").addEventListener("click", function() {
  changeSection("post");
  
});
document.getElementById("playlist-btn").addEventListener("click", function() {
  changeSection("playlist");
});
document.getElementById("favorities-btn").addEventListener("click", function() {
  changeSection("favorities");
});

// Muestra la sección de publicaciones al cargar la página
changeSection("post");
/!Funcion para revisar si esta vacio, y en caso de que lo este poner la advertencia!/
function checkEmptyGrid() {
  var sections = document.querySelectorAll(".section-content");

  sections.forEach(function (section) {
    var grid = section.querySelector(".grid");

    if (grid && grid.children.length === 0) {
      grid.innerHTML = `
        <img src="assets/imgs/blanco.jpg" alt="post" />
        <img src="assets/imgs/noPublicacion.jpg" alt="post" />
        <img src="assets/imgs/blanco.jpg" alt="post" />
      `;
    }
  });
}

checkEmptyGrid();


const formContent = document.querySelector("#form-content"),
      fileInput = document.querySelector(".file-input");

fileInput.onchange = ({target})=>{
  let file = target.files[0];
  if(file){
    let fileName = file.name;
    if(fileName.length >= 12){
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    //uploadFile(file);

    // Vista previa de la imagen seleccionada
    let reader = new FileReader();
    reader.onload = function (e) {
      // Modifica el CSS de tu pop-up para incluir la imagen seleccionada como fondo
      let middleArea = document.querySelector('.middle-area');
      middleArea.style.backgroundImage = 'url(' + e.target.result + ')';
    }
    // Lee el archivo de imagen
    reader.readAsDataURL(file);

    // Desactiva el input del archivo
    fileInput.disabled = true;

    // Oculta el contenido del formulario
    formContent.classList.add('active');
  }
}

function cerrarPopup(){
  // Reinicia el input del archivo al cerrar el popup
  fileInput.value = "";
  fileInput.disabled = false;

  // Limpia la imagen de fondo
  let middleArea = document.querySelector('.middle-area');
  middleArea.style.backgroundImage = '';
  let popup = document.getElementById('popup');
  let wrapper = document.querySelector('.wrapper');
  popup.classList.remove('active');
  wrapper.classList.remove('active');
  let btnclose=document.querySelector('.btn-cerrar-popup');
  btnclose.classList.remove('active');

  // Muestra el contenido del formulario
  formContent.classList.remove('active');
}

function togglePopup() {
  let popup = document.querySelector('.popup');
  let wrapper = document.querySelector('.wrapper');
  popup.classList.add('active');
  wrapper.classList.add('active');
  let btnclose=document.querySelector('.btn-cerrar-popup');
  btnclose.classList.add('active');
}





