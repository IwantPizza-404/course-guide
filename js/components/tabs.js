document.addEventListener('DOMContentLoaded', function() {
    // Set up tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Global function to handle tab switching to ensure consistency
    function switchTab(button) {
        const tabId = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to current button and pane
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
        
        // Update the dropdown text to show selected tab (for mobile view)
        updateDropdownText();
        
        // If we're in mobile mode and the dropdown is active, close it after selection
        const tabsNav = document.querySelector('.tabs-navigation');
        if (tabsNav.classList.contains('dropdown-active') && window.innerWidth <= 600) {
            tabsNav.classList.remove('dropdown-active');
        }
    }
    
    // Initial setup for all tab buttons
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            switchTab(this);
        });
    });
    
    // Function to update the dropdown text to show the active tab
    function updateDropdownText() {
        const activeTab = document.querySelector('.tab-button.active');
        if (activeTab) {
            const dropdownText = activeTab.textContent;
            // Store active tab text for display when dropdown is closed
            document.querySelector('.tabs-navigation').setAttribute('data-active-tab', dropdownText);
        }
    }
    
    // Add dropdown functionality for mobile
    function setupMobileDropdown() {
        const tabsNav = document.querySelector('.tabs-navigation');
        
        // Remove previous click handlers by cloning and replacing
        const newTabsNav = tabsNav.cloneNode(true);
        tabsNav.parentNode.replaceChild(newTabsNav, tabsNav);
        
        // Re-attach click events to tab buttons with proper active state management
        newTabsNav.querySelectorAll('.tab-button').forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent the dropdown toggle event
                switchTab(this);
            });
        });
        
        // Only set up the dropdown functionality if we're on a small screen
        if (window.innerWidth <= 600) {
            // Toggle dropdown when clicking on the navigation container (but not on buttons)
            newTabsNav.addEventListener('click', function(e) {
                // If we clicked on a tab button, let that event handler deal with it
                if (e.target.classList.contains('tab-button')) {
                    return;
                }
                
                // Toggle the dropdown
                this.classList.toggle('dropdown-active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!newTabsNav.contains(e.target)) {
                    newTabsNav.classList.remove('dropdown-active');
                }
            });
            
            // Initialize dropdown text
            updateDropdownText();
        }
    }
    
    // Set up dropdown on load
    setupMobileDropdown();
    
    // Reset dropdown setup on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupMobileDropdown, 250);
    });
}); 