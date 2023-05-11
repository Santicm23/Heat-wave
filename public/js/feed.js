
const url = `http://${window.location.host}`;

const username = document.getElementById('username');
const name = document.getElementById('name');

let sesionToken = localStorage.getItem('token');

console.log(sesionToken);

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
    sesionToken = data.token;
    username.textContent = `@${data.account.username}`;
    name.textContent = data.account.name;
})
.catch(err => {
    console.error(err);
    window.location = 'index.html';
});

fetch(`${url}/songs/track/24`)
    .then(resp => {
        if (resp.ok) {
            return resp.blob();
        } else {
            throw new Error('Error al descargar el sonido de la publicación');
        }
    })
    .then(blob => {
        console.log('playing...');
        const audioUrl = URL.createObjectURL(blob);
        const audioPlayer = new Audio(audioUrl);
        audioPlayer.play();
    })
    .catch(console.error);