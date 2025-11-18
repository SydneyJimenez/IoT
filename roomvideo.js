document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const menuIcon = toggleButton.querySelector('i');
    
    // --- 1. Sidebar Toggle Logic ---
    
    // Initial state check for ARIA and Icon
    const isInitiallyHidden = sidebar.classList.contains('sidebar-hidden');
    toggleButton.setAttribute('aria-expanded', !isInitiallyHidden);
    if (isInitiallyHidden) {
        menuIcon.classList.remove('fa-arrow-right'); 
        menuIcon.classList.add('fa-bars'); 
    } else {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-arrow-right');
    }

    toggleButton.addEventListener('click', () => {
        // Toggle the class responsible for sliding the menu in/out
        sidebar.classList.toggle('sidebar-hidden');

        const isNowHidden = sidebar.classList.contains('sidebar-hidden');
        
        // Update ARIA attribute
        toggleButton.setAttribute('aria-expanded', !isNowHidden);

        // Update Icon (bars when hidden, arrow-right when visible)
        if (isNowHidden) {
            menuIcon.classList.remove('fa-arrow-right'); 
            menuIcon.classList.add('fa-bars'); 
        } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-arrow-right');
        }
    });

    // --- 2. Video Player Logic (Placeholders) ---

    const videoPlayer = document.getElementById('videoPlayer');
    const btnPlayPause = document.getElementById('btnPlayPause');
    const btnForward = document.getElementById('btnForward');
    const timeDisplay = document.getElementById('timeDisplay');
    const playPauseIcon = btnPlayPause.querySelector('i');
    
    // Helper function to format time (e.g., 65s -> 01:05)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    }

    // Play/Pause Functionality
    function togglePlayPause() {
        if (videoPlayer.paused || videoPlayer.ended) {
            videoPlayer.play();
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
            btnPlayPause.setAttribute('aria-label', 'Pause video');
        } else {
            videoPlayer.pause();
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
            btnPlayPause.setAttribute('aria-label', 'Play video');
        }
    }

    btnPlayPause.addEventListener('click', togglePlayPause);
    videoPlayer.addEventListener('click', togglePlayPause); // Click video to play/pause

    // Fast Forward Functionality
    btnForward.addEventListener('click', () => {
        videoPlayer.currentTime += 10; // Jump forward 10 seconds
    });

    // Time Update and Metadata Loading
    videoPlayer.addEventListener('loadedmetadata', () => {
        const duration = formatTime(videoPlayer.duration);
        timeDisplay.textContent = `00:00 / ${duration}`;
    });

    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = formatTime(videoPlayer.currentTime);
        const duration = formatTime(videoPlayer.duration);
        timeDisplay.textContent = `${currentTime} / ${duration}`;
    });
});