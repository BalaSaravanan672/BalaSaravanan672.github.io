// Function to open a specific category tab
function openCategory(categoryName) {
    // Hide all product containers initially
    const allContainers = document.querySelectorAll('.tabcontent');
    allContainers.forEach(container => {
        container.style.display = 'none';
    });

    // Display the container corresponding to the selected category
    const selectedContainer = document.getElementById(categoryName);
    if (selectedContainer) {
        selectedContainer.style.display = 'block';
    }
}
