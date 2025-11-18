document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const menuIcon = toggleButton.querySelector('i');
    
    // --- Sidebar Toggle Logic ---
    
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
});