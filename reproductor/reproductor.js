const playlist = [
    { name: "Innerbloom - Rüfüs Du Sol", url: "cancion1.mp3" },
    { name: "it's murph - Food for the Soul", url: "cancion2.mp3" },
    { name: "ou Were Right - Rüfüs Du Sol", url: "cancion3.mp3" },
    { name: "Innerbloom - Rüfüs Du Sol", url: "cancion1.mp3" },
    { name: "it's murph - Food for the Soul", url: "cancion2.mp3" }
];
const seekSlider = document.getElementById('seekSlider');

const visualizer = document.getElementById('visualizer');
let isPlaying = false; // Variable para controlar el estado de reproducción de la canción


let currentTrack = 0;
let audio = new Audio(); // Crear un nuevo elemento de audio

function displayPlaylist() {
    const playlistElement = document.getElementById('playlist');

    // Limpiar cualquier contenido previo en la lista
    playlistElement.innerHTML = '';

    // Recorrer la lista de canciones y crear un botón para cada canción
    playlist.forEach((song, index) => {
        const button = document.createElement('button');
        button.textContent = song.name; // Establecer el texto del botón como el nombre de la canción
        button.addEventListener('click', () => {
            playTrack(index); // Llamar a playTrack() con el índice de la canción al hacer clic en el botón
        });

        const listItem = document.createElement('li');
        listItem.appendChild(button); // Agregar el botón al elemento <li>
        playlistElement.appendChild(listItem); // Agregar el elemento <li> a la lista de reproducción

        // Agregar clase 'current-track' si es la canción actualmente en reproducción
        if (index === currentTrack) {
            listItem.classList.add('current-track');
        }
    });

    // Mostrar la lista de reproducción (cambiar display a 'block')
    playlistElement.style.display = 'block';
}

function playTrack(trackIndex) {
    const trackUrl = `audio/${playlist[trackIndex].url}`;
    audio.src = trackUrl;
    audio.play();
    currentTrack = trackIndex;

    const currentTrackName = document.getElementById('currentTrackName');
    currentTrackName.textContent = playlist[trackIndex].name; // Actualiza el nombre de la canción

    const visualizer = document.getElementById('visualizer');
    visualizer.style.animationPlayState = 'running';

    if (audio.paused) {
        isPlaying = false;
        visualizer.style.animation = 'none'; // Detener la animación
    } else {
        isPlaying = true;
        visualizer.style.animation = 'pulse 0.2s infinite alternate'; // Activar la animación
    }

    // Actualizar el botón de reproducir/pausar
    updatePlayPauseButton(true);
}

function togglePlaylist() {
    const playlistElement = document.getElementById('playlist');
    const playlistToggleBtn = document.getElementById('playlistToggleBtn');

    // Alternar la visibilidad de la lista de reproducción
    if (playlistElement.style.display === 'none' || playlistElement.style.display === '') {
        // Mostrar la lista de reproducción

        displayPlaylist();

        playlistElement.style.display = 'block';
        playlistToggleBtn.innerHTML = '<i class="fas fa-times"></i>'; // Cambiar icono a "X" para cerrar
    } else {
        // Ocultar la lista de reproducción
        playlistElement.style.display = 'none';
        playlistToggleBtn.innerHTML = '<i class="fas fa-list"></i>'; // Restaurar icono de lista
    }
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        updatePlayPauseButton(true);
    } else {
        audio.pause();
        updatePlayPauseButton(false);
    }
}

function updatePlayPauseButton(isPlaying) {
    const playPauseButton = document.getElementById('playPauseButton');
    playPauseButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    playTrack(currentTrack);
}

function previousTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    playTrack(currentTrack);
}

function setVolume(volume) {
    audio.volume = volume;
}

function toggleVolumeSlider() {
    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.style.display = (volumeSlider.style.display === 'none') ? 'block' : 'none';
}

// Cargar la primera canción al cargar la página
playTrack(currentTrack);

// Actualizar el botón de reproducir/pausar al cambiar el estado del audio
audio.addEventListener('play', () => {
    isPlaying = true;
    visualizer.style.animation = 'pulse 0.2s infinite alternate'; // Activar la animación
    visualizer.style.height = '8px';
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    visualizer.style.animation = 'none'; // Detener la animación
    visualizer.style.height = '1px';
});

audio.addEventListener('ended', () => {
    isPlaying = false;
    visualizer.style.animation = 'none'; // Detener la animación
    visualizer.style.height = '1px';
});

audio.addEventListener('timeupdate', () => {
    // Obtener la posición actual y la duración total de la canción
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    // Calcular el nuevo valor para seekSlider
    const seekValue = (currentTime / duration) * 100;

    // Actualizar el valor de seekSlider
    seekSlider.value = seekValue;
});
// Función para cambiar la posición de reproducción de la canción
function seekTo(value) {
    // Calcular la nueva posición de reproducción basada en seekSlider value
    const seekPosition = (value / 100) * audio.duration;

    // Actualizar la posición de reproducción de la canción
    audio.currentTime = seekPosition;
}