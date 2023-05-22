// Constante que guarda la url actual del servidor
const url = `http://${window.location.host}`;

/! Función para cambiar entre los diferentes Grids (secciones de contenido)!/
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
// Agregamos eventos a los botones para cambiar de sección
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
/!Función para revisar si la sección está vacía, y en caso de que lo esté muestra una advertencia!/
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
// Verifica si hay secciones vacías al cargar la página
checkEmptyGrid();

/* --------------------------------------PopUp--------------------------------------------- */
const formContent = document.querySelector("#form-content"),
      fileInput = document.querySelector(".file-input");

let selectedSong = null;  
let selectedImage = null; 
      

fileInput.onchange = ({target})=>{
  let file = target.files[0];
  selectedImage = target.files[0];
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

  if (audioPlayer) {// Detenemos la canción que se está reproduciendo
    audioPlayer.pause();
    audioPlayer = null;
}

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

/* --------------------------------------selectMenu--------------------------------------------- */

const selectMenu = document.querySelector(".select-menu");
const selectBtn = selectMenu.querySelector(".select-btn");
const searchInp = selectMenu.querySelector("input");
const options = selectMenu.querySelector(".options");

let songs = [""]; // lista de canciones
let songIDs = [""]; // lista paralela de ids de canciones
let audioPlayer = null; // creamos una variable global para el reproductor

function addSong(selectedSong) {
    options.innerHTML = "";
    songs.forEach(Song => {
        let isSelected = Song == selectedSong ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${Song}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
addSong();

function updateName(selectedLi) {
    searchInp.value = "";
    addSong(selectedLi.innerText);
    selectMenu.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;

    // Detenemos la canción que se está reproduciendo
    if (audioPlayer) {
        audioPlayer.pause();
    }

    // Reproducimos la canción seleccionada
    let songIndex = songs.indexOf(selectedLi.innerText);
    if (songIndex >= 0) {
        selectedSong = songIDs[songIndex];
        playSong(songIDs[songIndex]);
    }
}

function playSong(id) {
    fetch(`${url}/songs/track/${id}`)
        .then(resp => {
            if (resp.ok) {
                return resp.blob();
            } else {
                throw new Error('Error al descargar el sonido de la canción');
            }
        })
        .then(blob => {
            console.log('playing...');
            const audioUrl = URL.createObjectURL(blob);
            audioPlayer = new Audio(audioUrl);
            audioPlayer.play();
        })
        .catch(console.error);
}

searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = songs.filter(data => {
        return data.toLowerCase().startsWith(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Song not found</p>`;
});

selectBtn.addEventListener("click", () => selectMenu.classList.toggle("active"));

// Función para obtener las canciones desde el servidor

async function obtenerCanciones() {
    try {
        const resp = await fetch(`${url}/songs`);
        const data = await resp.json();
        //console.log(data);
        songs = data.songs.map(cancion => cancion.name);
        songIDs = data.songs.map(cancion => cancion.id_song); // Guardamos los IDs de las canciones
    } catch (error) {
        console.error(error);
    }
}

obtenerCanciones().then(() => {
    addSong();
});

/! Función para obtener y mostrar información del usuario al cargar la página !/

let sesionToken; // Declaración global

document.addEventListener("DOMContentLoaded", function() {
  sesionToken = localStorage.getItem('token');  // Asignación dentro de la función
  let fotosPerfil = document.querySelectorAll('.foto-perfil');
  let nameElement = document.getElementById('name');
  let usernameElement = document.getElementById('username');
  let h2Element = document.querySelector('.left__col h2');

  if (fotosPerfil.length === 0) {
    console.error('Elemento .foto-perfil no encontrado');
    return;
  }

  fetch(`${url}/auth/`, {
    headers: {
      'x-token': sesionToken
    }
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error('Error con el token');
      }
    })
    .then(data => {
      let fotoUrl = data.account.image;
      
      if (fotoUrl === null) {
        fotoUrl = "assets/imgs/babyYoda.jpg";
      }
      
      fotosPerfil.forEach(fotoPerfil => {
        fotoPerfil.src = fotoUrl;
        fotoPerfil.alt = data.account.name;
      });

      if (nameElement) {
        nameElement.textContent = data.account.name;
      }
      
      if (usernameElement) {
        usernameElement.textContent = `@${data.account.username}`;
      }
      
      if (h2Element) {
        h2Element.textContent = data.account.name;
      }

    })
    .catch(error => {
      console.error(error);
    });
});

let postBtn = document.querySelector('#btn-post');
postBtn.addEventListener('click', postFeed);


async function postFeed() {
  if (!selectedSong || !selectedImage) {
    console.error('Canción o imagen no seleccionada');
    return;
  }

  let formData = new FormData();
  formData.append('song', selectedSong);
  formData.append('image', selectedImage);
  
  try {
    let response = await fetch(`${url}/feed_posts`, {
      method: 'POST',
      headers: {
        'x-token': sesionToken
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Error al publicar en el feed');
    }

    let result = await response.json();
    console.log(result);

    // Cierra el popup después de subir la publicación
    cerrarPopup();

  } catch (error) {
    console.error(error);
  }
}




