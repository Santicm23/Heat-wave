let url = `http://${window.location.host}`;

const feeds = document.querySelector('.feeds');

document.addEventListener("DOMContentLoaded", async function() {
    let sesionToken = localStorage.getItem('token');
    let fotosPerfil = document.querySelectorAll('.foto-perfil');
    let nameElement = document.getElementById('name');  // Selecciona por ID
    let usernameElement = document.getElementById('username'); // Selecciona por ID

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
    .then(async data => {

        let fotoUrl;
        
        if (data.account.image) {
            fotoUrl = await setImage(data.account.username);
        } else {
            fotoUrl = 'assets/imgs/babyYoda.jpg';
        }
        
        // Cambiamos la imagen de cada foto de perfil
        fotosPerfil.forEach(fotoPerfil => {
            fotoPerfil.src = fotoUrl;
            fotoPerfil.alt = data.account.name;
        });

        // Asegúrate de que los elementos de nombre y correo electrónico existan antes de asignarles un valor
        if (nameElement) {
            nameElement.textContent = data.account.name;
        }
    
        if (usernameElement) {
            usernameElement.textContent = `@${data.account.username}`;
        }
    })
    .catch(error => {
        console.error(error);
    });
});


const setImage = async(username) => {
    const resp = await fetch(`${url}/accounts/image/${username}`);

    const blob = await resp.blob();
    
    const imgUrl = URL.createObjectURL(blob);
    return imgUrl;
}
// Código para que funcionen cositas solo de front

// SIDEBAR
const menuItems = document.querySelectorAll('.menu-item');

// MESSAGES --------------------------------------------------------------------------------------------------
const messagesNotification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');
// SIDEBAR --------------------------------------------------------------------------------------------------

// Remove active class for all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if(item.id != 'notifications'){
            document.querySelector('.notifications-popup').style.display = 'none';
        } else {
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
llenarFeedPublicaciones();

async function llenarFeedPublicaciones() {
    const resp = await fetch(`${url}/posts/feed`);
    const data = await resp.json();
    const listaPublicaciones = data.feedposts;

    let boton_play = null;
    let audio_sonando = null;

    for (let i = 0; i < listaPublicaciones.length; i++) {
        const { id_feed_post, username, location, description, id_song } = listaPublicaciones[i];

        feeds.innerHTML += `
        <div class="feed">
            <div class="head">
                <div class="user">
                    <div class="profile-photo">
                        <img id="perfil_${id_feed_post}">
                    </div>
                    <div class="ingo">
                        <h3 id="username_${id_feed_post}">Lana Rose</h3>
                        <small id="location_${id_feed_post}">Bogotá, 15 MINUTES AGO</small>
                    </div>
                </div>
                <span class="edit">
                    <i class="uil uil-ellipsis-h"></i>
                </span>
            </div>
            <div class="photo">
                <img id="photo_${id_feed_post}">
            </div>
            <!-------------------- MUSIC -------------------->
            <div class="music">
                <span>
                    <i id="play_${id_feed_post}" class="uil uil-play" ></i>
                </span>
            </div>
            <div class="song-post">
                <audio id="audio_${id_feed_post}"></audio>
                <div class="progressBar" id="progressBar_${id_feed_post}">
                    <div class="progress" id="progress_${id_feed_post}"></div>
                    <div class="duracion">
                        <span id="tiempoActual_${id_feed_post}">0:00</span>
                        <span id="tiempoDuracion_${id_feed_post}">2:00</span>
                    </div>
                </div>

                <p id="cancion_${id_feed_post}">Titulo cancion</p>
                <p id="autor_${id_feed_post}" class="text-muted">Artista</p>
            </div>

            <div class="action-buttons">
                <div class="interaction-buttons">
                    <span><i class="uil uil-comment-alt"></i></span>
                    <span><i class="uil uil-heart"></i></span>
                    <span><i class="uil uil-share"></i></span>
                </div>
                <div class="bookmark">
                    <span><i class="uil uil-bookmark"></i></span>
                </div>
            </div>
            <div class="liked-by">
                <span><img src="./styles/images/profile-10.jpg"></span>
                <span><img src="./styles/images/profile-4.jpg"></span>
                <span><img src="./styles/images/profile-15.jpg"></span>
                <p>Liked by <b>Nico Millan</b> and 323 others</p>
            </div>
            <div class="caption">
                <p id="desc_${id_feed_post}">Lana Rose Lorem ipsum dolor sit amet <span class="hash-tag">#MusicOfTheDay</span></p>
            </div>
            <div class="text-muted">View all 227 comments</div>
        </div>
        `

        const perfil = document.querySelector(`#perfil_${id_feed_post}`);
        perfil.src = './assets/imgs/noProfilePhoto.jpeg';
        const usernameElement = document.querySelector(`#username_${id_feed_post}`);
        usernameElement.textContent = username;
        const locationElement = document.querySelector(`#location_${id_feed_post}`);
        locationElement.textContent = location;
        const descElement = document.querySelector(`#desc_${id_feed_post}`);
        descElement.textContent = description;

        // const cancion = await solicitarCancion(id_song);
        listaPublicaciones[i].cancion = await solicitarCancion(id_song);

        const cancionElement = document.querySelector(`#cancion_${id_feed_post}`);
        cancionElement.textContent = listaPublicaciones[i].cancion.name;
        const autorElement = document.querySelector(`#autor_${id_feed_post}`);
        autorElement.textContent = listaPublicaciones[i].cancion.author;

    }
    listaPublicaciones.forEach(async({ id_feed_post, image, cancion }) => {
        // const duracion = document.querySelector(`#tiempoDuracion_${id_feed_post}`);
        // duracion.textContent = cancion.duracion;

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
            
            await solicitarImagen(id_feed_post, imagenFeed);
        }
    });
}

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