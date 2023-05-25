// Constante que guarda la url actual del servidor
let url = `http://${window.location.host}`;
let sesionToken; // Declaración global


sesionToken = localStorage.getItem('token');  // Asignación dentro de la función

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



/* --------------------------------------PopUp--------------------------------------------- */
const formContent = document.querySelectorAll(".form-content"),
    fileInput = document.querySelector(".file-input"),
    middleAreas = document.querySelectorAll('.middle-area');

let selectedSong = null;  
let selectedImage = null; 
      

fileInput.onchange = ({target}) => {
	let file = target.files[0];
	selectedImage = target.files[0];

	if(file) {
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

			middleAreas.forEach((middleArea) => {
                middleArea.style.backgroundImage = 'url(' + e.target.result + ')';
            });
		}
		// Lee el archivo de imagen
		reader.readAsDataURL(file);

		// Desactiva el input del archivo
		fileInput.disabled = true;

		// Oculta el contenido del formulario
        formContent.forEach(formContent => formContent.classList.add('active'));
	}
}



function cerrarPopup() {
    // Reinicia el input del archivo al cerrar el popup
    fileInput.value = "";
    fileInput.disabled = false;

    if (audioPlayer) {
        // Detenemos la canción que se está reproduciendo
        audioPlayer.pause();
        audioPlayer = null;
    }
    // Limpia la imagen de fondo
    middleAreas.forEach((middleArea) => {middleArea.style.backgroundImage = "";});
    // Cierra todos los elementos de tipo popup
    let popups = document.querySelectorAll('.popup');
    let wrappers = document.querySelectorAll('.wrapper');
    let btnCloses = document.querySelectorAll('.btn-cerrar-popup');
    
    popups.forEach(popup => popup.classList.remove('active'));
    wrappers.forEach(wrapper => wrapper.classList.remove('active'));
    btnCloses.forEach(btnclose => btnclose.classList.remove('active'));

    // Muestra el contenido del formulario
    formContent.forEach(formContent => formContent.classList.remove('active'));
}


function togglePopup() {
    let popup = document.getElementById('popup');
    let wrapper = popup.querySelector('.wrapper');
    popup.classList.add('active');
    wrapper.classList.add('active');
    let btnclose=document.querySelector('.btn-cerrar-popup');
	btnclose.classList.add('active');
}

function togglePopup2() {
    let popup = document.getElementById('popup2');
    let wrapper = popup.querySelector('.wrapper');
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


let fotosPerfil = document.querySelectorAll('.foto-perfil');
let nameElement = document.getElementById('name');
let usernameElement = document.getElementById('username');
let h2Element = document.querySelector('.left__col h2');

const grid = document.querySelector(".grid");

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
    .then(async data => {
        let fotoUrl;

        if (data.account.image) {
            fotoUrl = await setImage(data.account.username);
        } else {
            fotoUrl = 'assets/imgs/babyYoda.jpg';
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

        // Obtener las publicaciones del usuario
        const resp = await fetch(`${url}/posts/feed/${data.account.username}`, {
            headers: {
                'x-token': sesionToken
            }
        });

        const feedData = await resp.json();
        const listaPublicaciones = feedData.feedposts;

        let lista10ultimas;
        if (listaPublicaciones.length < 10) {
            lista10ultimas = listaPublicaciones.reverse();
        } else {
            lista10ultimas = listaPublicaciones.slice(listaPublicaciones.length-10).reverse();
        }

        let boton_play = null;
        let audio_sonando = null;
        // Agregar las publicaciones al grid
        for (let i = 0; i < lista10ultimas.length; i++) {
            const { id_feed_post, id_song } = lista10ultimas[i];

            grid.innerHTML += `
                <div class="frame">
                    <div class="daddy-posti">
                        <div class="posti">
                            <img id="photo_${id_feed_post}" src="assets/imgs/babyYoda.jpg" alt="">
                        </div>
                    </div>
                    <div class="bottom-posti">
                    <i id="play_${id_feed_post}" class="uil uil-play" ></i>
                    <audio id="audio_${id_feed_post}"></audio>
                    </div>
                </div>
            `;
            lista10ultimas[i].cancion = await solicitarCancion(id_song);
        }
        lista10ultimas.forEach(async({ id_feed_post, image, cancion }) => {
            const audio = document.querySelector(`#audio_${id_feed_post}`);
            audio.src = cancion.sonido;
            
            const player = document.querySelector(`#play_${id_feed_post}`);
    
            player.addEventListener('click', () => {
                if (audio.paused) {
                    if (audio_sonando) {    
                        audio_sonando.pause();
                        audio_sonando.currentTime = 0;
                        boton_play.classList.remove('uil-pause');
                        boton_play.classList.add('uil-play');
                    }
                    audio_sonando = audio;
                    audio_sonando.play();
                    boton_play = player;
                    player.classList.remove('uil-play');
                    player.classList.add('uil-pause');
                } else if (audio_sonando) {
                    audio_sonando.pause();
                    if (audio_sonando !== audio) {
                        audio_sonando.currentTime = 0;
                    }
                    audio_sonando = null;
                    boton_play.classList.remove('uil-pause');
                    boton_play.classList.add('uil-play');
                } else {
                    audio.pause();
                    audio_sonando = null;
                    boton_play = null;
                    player.classList.remove('uil-pause');
                    player.classList.add('uil-play');
                }
            });
    
            
            if (image) {
                const imagenFeed = document.querySelector(`#photo_${id_feed_post}`);
                console.log(imagenFeed);
                await solicitarImagen(id_feed_post, imagenFeed);
            }

        });
    })
    .catch(error => {
        console.error(error);
        window.location.href = 'index.html';
    });
async function solicitarCancion(id) {
    try {
        const resp = await fetch(`${url}/songs/${id}`);
        const { song } = await resp.json();

        song.sonido = await solicitarSonido(id);
        return song;

    } catch (error) {
        console.error(error);
    }
}
async function solicitarSonido(id) {
    try {
        const resp = await fetch(`${url}/songs/track/${id}`);
        const blob = await resp.blob();
        const audioUrl = URL.createObjectURL(blob);
        return audioUrl;
    } catch (error) {
        console.error(error)
    }
}

async function solicitarImagen(id, img) {
    try {
        const resp = await fetch(`${url}/posts/feed/image/${id}`);
        const blob = await resp.blob();
        const imgUrl = URL.createObjectURL(blob);
        img.src = imgUrl;
    } catch (error) {
        console.error(error);
    }
}

const setImage = async(username) => {
  const resp = await fetch(`${url}/accounts/image/${username}`);

  const blob = await resp.blob();
  
  const imgUrl = URL.createObjectURL(blob);
  return imgUrl;
}


/!-------------------------------------Poster en el feed----------------------------------------!/
let postBtn = document.querySelector('#btn-post');
postBtn.addEventListener('click', () => postFeed(usernameElement.textContent.slice(1)));
async function postFeed(username) {
	if (!selectedSong) {
		alerta1('Canción no seleccionada');
		return;
	}

	let formData = new FormData();
	formData.append('image', selectedImage);
  
	try {
		let response = await fetch(`${url}/posts/feed/${username}/${selectedSong}`, {
			method: 'POST',
			headers: {
				'x-token': sesionToken
			},
			body: formData
		});

		if (!response.ok) {
			throw new Error('Error al publicar en el feed');
		}

		// Cierra el popup después de subir la publicación
		cerrarPopup();

	} catch (error) {
		console.error(error);
	}
}
let postBtn2 = document.querySelector('#btn-post2');
postBtn2.addEventListener('click', () => postProfilePhoto(usernameElement.textContent.slice(1)));
async function postProfilePhoto(username) {
	let formData = new FormData();
	formData.append('image', selectedImage);
	try {
		let response = await fetch(`${url}/accounts/image/${username}`, {
			method: 'PUT',
			headers: {
				'x-token': sesionToken
			},
			body: formData
		});

		if (!response.ok) {
			throw new Error('Error al publicar en el feed');
		}
		// Cierra el popup después de subir la publicación
		cerrarPopup();

	} catch (error) {
		console.error(error);
	}
}

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

setTimeout(function() {
    checkEmptyGrid();
  }, 9000);