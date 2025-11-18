document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Sidebar Toggle Logic (Consistent) ---
    const toggleButton = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const menuIcon = toggleButton.querySelector('i');
    
    // Set initial state for ARIA and Icon
    const isInitiallyHidden = sidebar.classList.contains('sidebar-hidden');
    toggleButton.setAttribute('aria-expanded', !isInitiallyHidden);
    if (isInitiallyHidden) {
        menuIcon.classList.add('fa-bars'); 
    } else {
        menuIcon.classList.add('fa-arrow-right');
    }

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-hidden');
        const isNowHidden = sidebar.classList.contains('sidebar-hidden');
        toggleButton.setAttribute('aria-expanded', !isNowHidden);

        if (isNowHidden) {
            menuIcon.classList.remove('fa-arrow-right'); 
            menuIcon.classList.add('fa-bars'); 
        } else {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-arrow-right');
        }
    });

    // --- 2. Recording Logic ---

    // UI Elements
    const btnStartPrimary = document.getElementById('btnStartPrimary');
    const recordingControls = document.getElementById('recordingControls');
    const btnPause = document.getElementById('btnPause');
    const btnSave = document.getElementById('btnSave'); // NEW
    const btnFinish = document.getElementById('btnFinish'); 
    const recIndicator = document.getElementById('recIndicator');
    const recDot = recIndicator.querySelector('.rec-dot');
    const recTimeDisplay = document.getElementById('recTime');
    const dateDisplay = document.getElementById('dateDisplay');
    const timeDisplay = document.getElementById('timeDisplay');
    const videoPlaybackIcon = document.getElementById('videoPlaybackIcon');
    const videoFeedPlaceholder = document.querySelector('.video-feed-placeholder');

    // State Variables
    let recordingState = 'stopped'; // 'stopped', 'recording', 'paused'
    let timerInterval = null;
    let seconds = 0;

    // --- Time Helpers ---

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const secs = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    }

    function updateDateTime() {
        const now = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = now.toLocaleDateString('en-US', dateOptions);

        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        timeDisplay.textContent = `Time: ${now.toLocaleTimeString('en-US', timeOptions)}`;
    }
    
    // Initial display of date/time
    updateDateTime();
    // Update every 30 seconds
    setInterval(updateDateTime, 30000); 

    // --- Core Timer Functions ---

    function updateTimer() {
        seconds++;
        recTimeDisplay.textContent = formatTime(seconds);
    }

    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
    }

    function stopTimer() {
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = null;
    }

    // --- UI State Management ---

    function updateUI() {
        // Reset dynamic elements
        btnStartPrimary.classList.add('hidden');
        recordingControls.classList.add('hidden');
        videoPlaybackIcon.classList.remove('hidden'); // Show player icon when active/paused

        // Apply state-specific changes
        switch (recordingState) {
            case 'stopped':
                btnStartPrimary.classList.remove('hidden');
                recDot.classList.remove('active');
                videoPlaybackIcon.classList.add('hidden'); // Hide player icon when stopped
                videoFeedPlaceholder.style.border = '1px solid #aaa'; 
                recTimeDisplay.textContent = '00:00';
                break;

            case 'recording':
                recordingControls.classList.remove('hidden');
                recDot.classList.add('active');
                btnPause.textContent = ' PAUSE RECORDING';
                btnPause.querySelector('i').className = 'fas fa-pause icon-space';
                videoFeedPlaceholder.style.border = '2px solid red'; // Red border
                break;

            case 'paused':
                recordingControls.classList.remove('hidden');
                recDot.classList.remove('active');
                btnPause.textContent = ' RESUME RECORDING';
                btnPause.querySelector('i').className = 'fas fa-play icon-space';
                videoFeedPlaceholder.style.border = '2px solid #f0ad4e'; // Yellow border
                break;
        }
    }

    // --- Button Handlers ---

    function handleStart() {
        if (recordingState === 'stopped') {
            seconds = 0; // Reset time only on a new start
        }
        recordingState = 'recording';
        startTimer();
        updateUI();
    }

    function handlePauseResume() {
        if (recordingState === 'recording') {
            recordingState = 'paused';
            stopTimer();
        } else if (recordingState === 'paused') {
            recordingState = 'recording';
            startTimer();
        }
        updateUI();
        console.log(`Recording state changed to: ${recordingState}`);
    }

    function handleSave() {
        const currentDuration = formatTime(seconds);
        // This simulates saving the current segment or marking a checkpoint
        console.log(`--- SAVED CHECKPOINT --- Duration at save: ${currentDuration}`);
        // No state change, continues in current state ('recording' or 'paused')
    }
    
    function handleFinish() {
        // Stop the session, save the final video, and reset to IDLE state
        const duration = formatTime(seconds);
        stopTimer();
        
        // Custom message box simulation
        console.log(`Recording FINISHED and saved. Total duration: ${duration}.`);
        
        // Reset state
        recordingState = 'stopped';
        seconds = 0;
        updateUI();
    }

    // --- Event Listeners ---
    
    btnStartPrimary.addEventListener('click', handleStart); 
    btnPause.addEventListener('click', handlePauseResume); 
    btnSave.addEventListener('click', handleSave);
    btnFinish.addEventListener('click', handleFinish);

    // Initial setup
    updateUI();
});