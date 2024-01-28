/* 
 * Console Data
 * -----------------------------------------------------------------------------
 */

/* Data for different gaming consoles, including details such as name, information, games, images, and videos. */
const consolesData = {
    'console1': {
        /* Details for Console 1 */
        name: 'Xbox Classic',
        info:   'The Xbox, also known as the Xbox Classic, is Microsoft\'s first foray into the gaming console market, ' +
                'released in North America on November 15, 2001. The console was notable for its powerful hardware at the time, ' +
                'which allowed it to deliver high-definition graphics and an integrated online gaming service called Xbox Live. ' +
                'The Xbox was designed to compete with other gaming consoles of its generation, such as Sony\'s PlayStation 2 ' +
                'and the Nintendo GameCube. ' +
                'Game Library ' +
                'The Xbox Classic boasted a robust library of games, including fan favorites such as "Halo: Combat Evolved," ' +
                '"Halo 2," "Fable," and "Star Wars: Knights of the Old Republic." ' +
                'It introduced the concept of a hard drive in a console, allowing for saved games and downloadable content. ' +
                'Impact and Legacy ' +
                'The Xbox set the stage for the future of Microsoft in the gaming industry, with its successor, the Xbox 360, ' +
                'continuing its legacy. It also laid the groundwork for the development of online gaming communities and ' +
                'digital distribution in consoles. The Xbox\'s controller, known for its size and ergonomics, inspired the design ' +
                'of future controllers and was succeeded by the more refined Xbox Controller S. ' +
                'The original Xbox influence is still felt today, as it helped shape the direction of modern gaming consoles ' +
                'and online connectivity.',
        games: ['Game 1A', 'Game 1B', 'Game 1C', 'Game 1D', 'Game 1E', 'Game 1F'],
        gamesImages: ['haloxbox.jpg', 'fablexbox.jpg', 'maxpaynexbox.jpg', 'starkotorxbox.jpg', 'marvelalliancexbox.jpg', 'gtavicecityxbox.jpg'],
        gamesVideos: {
            'Game 1A': 'haloxtra.mp4',
            'Game 1B': 'videoSource1B.mp4',
            'Game 1C': 'videoSource1C.mp4',
            'Game 1D': 'videoSource1D.mp4',
            'Game 1E': 'videoSource1E.mp4',
            'Game 1F': 'videoSource1F.mp4'
        },
        image: 'MicrosoftXbox.png',
        tvImage: 'TV111.png'
    }
};

/* 
 * Show Console Information
 * -----------------------------------------------------------------------------
 */

/* Function to display information about a specific gaming console. */
function showConsoleInfo(consoleId) {
    const console = consolesData[consoleId];

    /* Highlight the active console name in the user interface. */
    document.querySelectorAll('.console-name').forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('onclick').includes(consoleId)) {
            button.classList.add('active');
        }
    });

    /* Display the gaming console image. */
    const consoleDisplayDiv = document.getElementById('consoleDisplay');
    consoleDisplayDiv.innerHTML = `
      <div class="console-image">
        <img src="/projekt/${console.image}" alt="${console.name}">
      </div>`;

    /* Display detailed information about the gaming console. */
    const consoleInfoDiv = document.getElementById('consoleInfo');
    consoleInfoDiv.textContent = console.info;

    /* Display the TV image and video associated with the gaming console. */
    const TVDisplay = document.getElementById('TVDisplay');
    TVDisplay.innerHTML = `
    <div class="console-tv-container">
      <img src="/projekt/${console.tvImage}" alt="TV Image" class="tv-image" />
      <div class="video-wrapper">
        <video loop id="nesVideo" class="console-video" controls>
          <source src="/projekt/${console.videoSource}" type="video/mp4">
        </video>
      </div>
    </div>`;

    /* Display a grid of games associated with the gaming console. */
    const gamesGridDiv = document.querySelector('.games-grid');
    gamesGridDiv.innerHTML = '';
    console.games.forEach((game, index) => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        gameDiv.innerHTML = `<img src="/projekt/${console.gamesImages[index]}" alt="${game}" class="game-img">`;

        gameDiv.addEventListener('click', () => toggleGameVideo(consoleId, game));
        gamesGridDiv.appendChild(gameDiv);
    });
}

/* 
 * Toggle Game Video
 * -----------------------------------------------------------------------------
 */

/* Function to toggle the video playback of a specific game associated with a gaming console. */
function toggleGameVideo(consoleId, gameTitle) {
    const console = consolesData[consoleId];
    const gameVideoSrc = console.gamesVideos[gameTitle];
    const videoElement = document.getElementById('nesVideo');

    if (videoElement) {
        if (videoElement.src.includes(gameVideoSrc)) {
            /* If the video is paused, play it; otherwise, pause it. */
            if (videoElement.paused) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        } else {
            /* Load and play the video associated with the selected game. */
            videoElement.src = `/projekt/${gameVideoSrc}`;
            videoElement.load(); /* Load the new video source */
            videoElement.play();
        }
    }
}

/* 
 * Window Onload Event
 * -----------------------------------------------------------------------------
 */

/* Window onload event to initialize the console info display with Console 1. */
window.onload = function () {
    showConsoleInfo('console1');
};

