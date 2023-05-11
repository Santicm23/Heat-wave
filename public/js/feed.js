

const url = `http://${window.location.host}/songs/track`;

fetch(`${url}/645bad760a6f567046ce6142`)
    .then(resp => resp.blob())
    .then(blob => {
        console.log('playing...');
        const audioUrl = URL.createObjectURL(blob);
        const audioPlayer = new Audio(audioUrl);
        audioPlayer.play();
    })
    .catch(err => console.error(err));