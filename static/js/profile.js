// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript start Loading...');
});



// scrolling text
document.addEventListener('DOMContentLoaded', function() {
    const textElements = document.querySelectorAll('.card .titlebox p');
    textElements.forEach(textElement => {
      if (textElement.scrollWidth > textElement.clientWidth) {
        textElement.classList.add('scrolling');
      } else {
        textElement.classList.remove('scrolling');
      }
    });
  });
  
  // image swichter for deals
  document.addEventListener("DOMContentLoaded", function() {
    const imageHolders = document.querySelectorAll(".image-holder");
  
    imageHolders.forEach(function(imageHolder) {
      const images = imageHolder.querySelectorAll("img");
      let hoverInterval;
  
      function switchImage(index) {
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");
      }
  
      imageHolder.addEventListener("mouseenter", function() {
        let currentIndex = 0;
        hoverInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % images.length;
          switchImage(currentIndex);
        }, 1000); // Switch every 2 seconds
      });
  
      imageHolder.addEventListener("mouseleave", function() {
        clearInterval(hoverInterval);
        switchImage(0); // Reset to first image
      });
    });
  });



// star ratings static one

document.addEventListener("DOMContentLoaded", function() {
    const staticRatings = document.querySelectorAll('.static-rating');
    
    staticRatings.forEach(rating => {
        const ratingValue = parseInt(rating.getAttribute('data-rating'), 10);
        const stars = rating.querySelectorAll('.star');
        
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'), 10);
            if (value <= ratingValue) {
                star.classList.add('filled');
            }
        });
    });
});




// alert for review form that handles everything with review form

document.addEventListener('DOMContentLoaded', function() {
  // Get the contact-info element and the modal elements
  const contactInfo = document.getElementById('contact-info');
  const modal = document.getElementById('myModal');
  const modalBody = document.getElementById('modal-body');

  // Function to show the modal
  function showModal() {
    // Extract HTML from data-info and inject into modal-body
    const dataInfo = contactInfo.getAttribute('data-info');
    modalBody.innerHTML = dataInfo;

    // Display the modal
    modal.style.display = 'block';

    // Add event listener to close button inside the modal
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
      modal.style.display = 'none';
    };

    // Add event listener to close the modal when clicking outside of it
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

    // Add event listener for form submission inside the modal
    const reviewForm = document.querySelector('.review-form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const rating = document.querySelector('input[name="rating"]:checked');
        const sold = document.querySelector('input[name="sold"]:checked');
        const bought = document.querySelector('input[name="bought"]:checked');

        const ratingValue = rating ? rating.value : 'Not selected';
        const soldValue = sold ? sold.value : 'Not selected';
        const boughtValue = bought ? bought.value : 'Not selected';

        console.log('Rating submitted:', ratingValue);
        console.log('Sold answer:', soldValue);
        console.log('Bought answer:', boughtValue);

        // Close the modal (optional)
        modal.style.display = 'none';
      });
    }
  }

  // Add event listener to open modal when contact-info is clicked
  contactInfo.addEventListener('click', showModal);
});




// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded');
});