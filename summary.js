function populateSummary() {
    // Casual Wear Summary
    for (let i = 1; i <= 8; i++) {
        document.getElementById(`summary-casual-1-judge1-poise`).innerText = document.getElementById(`poise-${i}`).value;
        document.getElementById(`summary-casual-1-judge1-attire`).innerText = document.getElementById(`attire-${i}`).value;
        document.getElementById(`summary-casual-1-judge1-beauty`).innerText = document.getElementById(`beauty-${i}`).value;
        document.getElementById(`summary-casual-1-judge1-performance`).innerText = document.getElementById(`performance-${i}`).value;
    }

    // Repeat similar logic for Swimsuit and Q&A categories
}

function showTab(tabName) {
    // Hide all tab content
    var tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(function(tab) {
        tab.style.display = 'none';
    });
    
    // Show selected tab
    document.getElementById(tabName).style.display = 'block';

    // If the Summary tab is shown, populate the data
    if (tabName === 'summary') {
        populateSummary();
    }
}