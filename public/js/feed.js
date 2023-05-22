let url = `http://${window.location.host}`;

const feeds = document.querySelector('.feeds');

document.addEventListener("DOMContentLoaded", function() {
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
        
        if (fotoUrl === null) {
            fotoUrl = "assets/imgs/babyYoda.jpg";
        } else {
            fotoUrl = await setImage(data.account.username);
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

// MESSAGES --------------------------------------------------------------------------------------------------
//Searches chats
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(user => {
        let name = user.querySelectorAll('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            user.style.display = 'flex';
        } else {
            user.style.display = 'none';
        }
    })
}

// Search chat
messageSearch.addEventListener('keyup', searchMessage);

// Hightlight message card when message menu item is clicked
messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000)
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
llenarFeedPublicaciones();


async function llenarFeedPublicaciones() {
    const resp = await fetch(`${url}/posts/feed`);
    const data = await resp.json();
    const listaPublicaciones = data.feedposts;

    for (let i = 0; i < listaPublicaciones.length; i++) {
        const p = listaPublicaciones[i];
        p.cancion = await solicitarCancion(p.id_song);
    }

    for (let i = 0; i < listaPublicaciones.length; i++) {
        const { id_feed_post } = listaPublicaciones[i];

        feeds.innerHTML += `
        <div class="feed">
            <div class="head">
                <div class="user">
                    <div class="profile-photo">
                        <img id="perfil_${id_feed_post}">
                    </div>
                    <div class="ingo">
                        <h3>Lana Rose</h3>
                        <small id="desc_${id_feed_post}">Bogotá, 15 MINUTES AGO</small>
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
                    <i class="uil uil-play" id="play"></i>
                </span>
            </div>
            <div class="song-post">
                <audio src=""></audio>
                <div class="progressBar" id="progressBar">
                    <div class="progress"></div>
                    <div class="duracion">
                        <span id="tiempoActual">0:00</span>
                        <span id="tiempoDuracion">2:00</span>
                    </div>
                </div>

                <p>Titulo cancion</p>
                <p class="text-muted" id="autor_${id_feed_post}">Artista</p>
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
                <p>Lana Rose Lorem ipsum dolor sit amet <span class="harsh-tag">#MusicOfTheDay</span></p>
            </div>
            <div class="text-muted">View all 227 comments</div>
        </div>
        `
        
    }
    listaPublicaciones.forEach(async({ id_feed_post, image }) => {

        const perfil = document.querySelector(`#perfil_${id_feed_post}`);
        perfil.src = './assets/imgs/noProfilePhoto.jpeg'; 
        const desc = document.querySelector(`#desc_${id_feed_post}`);
        desc.textContent = 'holissss como vannnn';
        const imagenFeed = document.querySelector(`#photo_${id_feed_post}`);
        
        if (image) {
            await solicitarImagen(id_feed_post, imagenFeed);
        }
        //const nombreAutor = document.querySelector(`autor_${id_feed_post}`)
        //nombreAutor = p.cancion.
    });
}

async function solicitarCancion(id) {
    try {
        const resp = await fetch(`${url}/songs/${id}`);
        const data = await resp.json();

        const cancion = data.song;
        cancion.sonido = await solicitarSonido(id);
        return cancion;

    } catch (error) {
        console.error(error);
    }
}

async function solicitarSonido(id) {
    try {
        const resp = await fetch(`${url}/songs/track/${id}`)
        const blob = await resp.blob()
        const audioUrl = URL.createObjectURL(blob);
        const audioPlayer = new Audio(audioUrl);
        return audioPlayer;
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



// fetch(`${url}/songs/track/27`)
//     .then(resp => {
//         if (resp.ok) {
//             return resp.blob();
//         } else {
//             throw new Error('Error al descargar el sonido de la publicación');
//         }
//     })
//     .then(blob => {
//         console.log('playing...');
//         const audioUrl = URL.createObjectURL(blob);
//         const audioPlayer = new Audio(audioUrl);
//         audioPlayer.play();
//     })
//     .catch(console.error);


