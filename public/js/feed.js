
const url = `http://${window.location.host}`;
const userName = document.querySelector('#userName');

const main = async() => {
    const token = localStorage.getItem('token');
    
    const resp = await fetch(`${url}/auth`, {
        headers: {
            'x-token': token
        }
    });

    console.log(await resp.json());
    
    // const { account, token: newToken } = await resp.json();
    // localStorage.setItem('token', newToken);
    
    // userName.textContent = `@${account.username}`
} 

main();



// fetch(`${url}/645ba7c00a6f567046ce6132`)
//     .then((res) => res.blob())
//     .then()

const url = `http://${window.location.host}/songs/track`;

fetch(`${url}/24`)
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