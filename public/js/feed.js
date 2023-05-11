

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