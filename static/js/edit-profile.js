



const favGames = document.getElementById('fav-games');
const favButton = document.getElementById('fav-button');
let isExpanded = false;

favButton.addEventListener('click', () => {
    if (isExpanded) {
        favGames.style.height = '55px';
    } else {
        favGames.style.height = '400px';
    }
    isExpanded = !isExpanded;
});




// image updater
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const deleteButton = document.getElementById('delete-image');
const noProfileInput = document.getElementById('no-profile');

fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            imagePreview.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});

deleteButton.addEventListener('click', function() {
    fileInput.value = ''; // Clears the input file
    imagePreview.src = 'images/default_profile.png'; // Sets default image
    noProfileInput.value = 'true'; // Set hidden input to true
});

