/**
 * Show Console Info
 * -----------------------------------------------------------------------------
 */

/* Function to display detailed information about a selected gaming console */
function showConsoleInfo(consoleId) {
    /* Retrieve console data based on the provided consoleId */
    const console = consolesData[consoleId];

    /* Highlight the active console button in the navigation */
    document.querySelectorAll('.console-name').forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('onclick').includes(consoleId)) {
            button.classList.add('active');
        }
    });

    /* Display console image */
    const consoleDisplayDiv = document.getElementById('consoleDisplay');
    consoleDisplayDiv.innerHTML = `<div class="console-image"><img src="/projekt/${console.image}" alt="${console.name}"></div>`;

    /* Display console information */
    const consoleInfoDiv = document.getElementById('consoleInfo');
    consoleInfoDiv.textContent = console.info;

    /* Display TV and associated video for the console */
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

    /* Display grid of games associated with the console */
    const gamesGridDiv = document.querySelector('.games-grid');
    gamesGridDiv.innerHTML = '';
    console.games.forEach((game, index) => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        gameDiv.innerHTML = `<img src="/projekt/${console.gamesImages[index]}" alt="${game}" class="game-img">`;

        /* Attach event listener to each game for toggling game video */
        gameDiv.addEventListener('click', () => toggleGameVideo(consoleId, game));
        gamesGridDiv.appendChild(gameDiv);
    });
}

/**
 * Toggle Game Video
 * -----------------------------------------------------------------------------
 */

/* Function to toggle the video of a selected game on the console */
function toggleGameVideo(consoleId, gameTitle) {
    /* Retrieve console data based on the provided consoleId */
    const console = consolesData[consoleId];
    /* Retrieve video source for the selected game */
    const gameVideoSrc = console.gamesVideos[gameTitle];
    /* Retrieve video element */
    const videoElement = document.getElementById('nesVideo');

    /* Check if the video element exists */
    if (videoElement) {
        /* Check if the video source is the same as the current video */
        if (videoElement.src.includes(gameVideoSrc)) {
            /* Toggle play/pause if the video is currently paused */
            if (videoElement.paused) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        } else {
            /* Load and play the selected game video */
            videoElement.src = `/projekt/${gameVideoSrc}`;
            videoElement.load();
            videoElement.play();
        }
    }
}
