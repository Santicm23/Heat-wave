
const url = `http://${window.location.host}`;

const name = document.getElementById('name');
const username = document.getElementById('username');

let cuenta;

const token = localStorage.getItem('token');

const options = {
    headers: {
        'x-token': token
    }
}

fetch(`${url}/accounts/`, options)
.then(resp => {
    if (resp.ok) {
        return resp.json();
    } else {
        throw new Error('bla bla bla');
    }
})
.then((res) => {
    console.log(res);
    // cuenta = account;
    // name.value = cuenta.name;
    // username.value = cuenta.username;
})

// fetch(`${url}/songs/track/24`)
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
