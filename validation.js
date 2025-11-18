/**
 * validation.js - Logic for the Image Validation Page
 * * This script handles extracting image data from the URL, updating the UI,
 * and simulating the acceptance or rejection of an image capture.
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Element references
    const imageIdEl = document.getElementById('image-id');
    const imageTitleEl = document.getElementById('image-title');
    const capturedImageEl = document.getElementById('captured-image');
    const acceptBtn = document.getElementById('accept-btn');
    const rejectBtn = document.getElementById('reject-btn');
    const reviewComments = document.getElementById('review-comments');
    const messageBox = document.getElementById('message-box');
    const imageTimestampEl = document.getElementById('image-timestamp');

    /**
     * Extracts URL parameters (id and title) from the query string.
     * @returns {Object} Key-value pairs of URL parameters.
     */
    function getUrlParams() {
        const params = {};
        // Get the query string, remove the leading '?', and split by '&'
        window.location.search.substring(1).split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            if (key && value) {
                // Decode the URL-encoded component and replace '+' with space
                params[key] = decodeURIComponent(value.replace(/\+/g, ' '));
            }
        });
        return params;
    }

    /**
     * Initializes the page by reading URL parameters and setting UI elements.
     */
    function initializePage() {
        const params = getUrlParams();
        const id = params.id || 'N/A';
        const title = params.title || 'No Title Provided';
        const timestamp = new Date().toLocaleString();
        
        // Update display elements
        imageIdEl.textContent = id;
        imageTitleEl.textContent = title;
        imageTimestampEl.textContent = timestamp;

        // Set the image source based on the title (using a placeholder in this demo)
        const placeholderUrl = `https://placehold.co/800x600/1f2937/ffffff?text=${encodeURIComponent(title)}`;
        capturedImageEl.src = placeholderUrl;
        
        // Add error handling for the image element if it fails to load (only relevant if using real URLs)
        capturedImageEl.onerror = () => {
            capturedImageEl.src = 'https://placehold.co/800x600/ef4444/ffffff?text=Image+Load+Error';
        };
    }

    /**
     * Handles the final validation action (Accept or Reject).
     * @param {string} status 'Accepted' or 'Rejected'
     */
    function handleValidation(status) {
        const id = imageIdEl.textContent;
        const comments = reviewComments.value.trim();

        // Log the submission details (simulating a network request)
        console.log(`[Validation] Submitting action for Image ID: ${id}`);
        console.log(`[Validation] Action: ${status}`);
        console.log(`[Validation] Comments: ${comments || 'None'}`);

        // Display visual feedback to the user using the message box
        messageBox.textContent = `Image ${id} has been successfully ${status.toLowerCase()}. Redirecting...`;
        messageBox.classList.remove('hidden', 'bg-success/20', 'bg-danger/20', 'text-success', 'text-danger');
        
        if (status === 'Accepted') {
            messageBox.classList.add('bg-success/20', 'text-success');
        } else {
            messageBox.classList.add('bg-danger/20', 'text-danger');
        }

        // Disable buttons to prevent double submission
        acceptBtn.disabled = true;
        rejectBtn.disabled = true;

        // Simulate network delay and then redirect back to the gallery page
        setTimeout(() => {
            console.log('[Validation] Redirecting to gallery.html');
            window.location.href = 'gallery.html';
        }, 2000); 
    }

    // Set up event listeners for the action buttons
    acceptBtn.addEventListener('click', () => handleValidation('Accepted'));
    rejectBtn.addEventListener('click', () => handleValidation('Rejected'));

    // Start the page initialization process
    initializePage();
});