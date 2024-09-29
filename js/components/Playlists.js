export default function Playlists() {
    const playlists = document.getElementById('playlists');

    playlists.innerHTML = `
        <section class="my-12">
            <h2 class="text-2xl font-bold mb-6">Playlists</h2>
            <div class="flex overflow-x-auto space-x-4 pb-4" id="playlist-container">
                <div class="flex-none w-72 h-48 bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"></div>
                <div class="flex-none w-72 h-48 bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"></div>
                <div class="flex-none w-72 h-48 bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"></div>
            </div>
        </section>
    `;

    // Llamada a la API de YouTube
    const API_KEY = 'AIzaSyB4HGg2WVC-Sq3Qyj9T9Z9aBBGbET1oGs0'; // Reemplaza esto con tu clave API
    const PLAYLIST_ID = 'PLZ_v3bWMqpjEYZDAFLI-0GuAH4BpA5PiL'; // Reemplaza esto con la ID de tu playlist

    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=5&key=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const playlistContainer = document.getElementById('playlist-container');
            const videosData = data.items;

            // Verificar si hay videos en la playlist
            if (videosData.length === 0) {
                playlistContainer.innerHTML = '<p>No videos found in this playlist.</p>';
                return;
            }

            playlistContainer.innerHTML = videosData.map(video => `
                <div class="flex-none w-72 h-48 bg-gray-200 rounded-lg shadow-md overflow-hidden">
                    <iframe
                        src="https://www.youtube.com/embed/${video.snippet.resourceId.videoId}"
                        title="${video.snippet.title}"
                        class="w-full h-full"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error fetching the playlist:', error);
            const playlistContainer = document.getElementById('playlist-container');
            playlistContainer.innerHTML = '<p>Error fetching the videos. Please try again later.</p>';
        });
}