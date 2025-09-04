document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.querySelector('.video-container');
    const video = document.getElementById('mainVideo');
    const playPauseBtn = document.querySelector('.play-pause');
    const muteBtn = document.querySelector('.mute');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');

    // Play/Pause
    function togglePlay() {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="bx bx-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="bx bx-play"></i>';
        }
    }

    // Mute/Unmute
    function toggleMute() {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? 
            '<i class="bx bx-volume-mute"></i>' : 
            '<i class="bx bx-volume-full"></i>';
    }

    // Update progress bar
    function updateProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progress.style.width = `${percent}%`;
    }

    // Seek video
    function seek(e) {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.pageX - rect.left) / progressBar.offsetWidth;
        video.currentTime = pos * video.duration;
    }

    // Event listeners
    playPauseBtn.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    muteBtn.addEventListener('click', toggleMute);
    video.addEventListener('timeupdate', updateProgress);
    progressBar.addEventListener('click', seek);

    // Handle video end
    video.addEventListener('ended', () => {
        playPauseBtn.innerHTML = '<i class="bx bx-play"></i>';
    });

    // Add hover effect for controls
    let timeout;
    videoContainer.addEventListener('mousemove', () => {
        clearTimeout(timeout);
        document.querySelector('.video-controls').style.opacity = '1';
        timeout = setTimeout(() => {
            if (!video.paused) {
                document.querySelector('.video-controls').style.opacity = '0';
            }
        }, 2000);
    });

    videoContainer.addEventListener('mouseleave', () => {
        if (!video.paused) {
            document.querySelector('.video-controls').style.opacity = '0';
        }
    });
});
