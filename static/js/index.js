
// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript start Loading...');
});



// deal banner pairs
let currentIndex = 0;
const dealBanners = document.querySelectorAll('.deal-banner');
const totalImages = dealBanners[0].querySelectorAll('img').length;

function showNextImage() {
    dealBanners.forEach(banner => {
        const images = banner.querySelectorAll('img');
        images[currentIndex].classList.remove('active');
    });

    currentIndex = (currentIndex + 1) % totalImages;

    dealBanners.forEach(banner => {
        const images = banner.querySelectorAll('img');
        images[currentIndex].classList.add('active');
    });
}

setInterval(showNextImage, 6000); 


// hero animation
// Function to rotate the arrow boxes counterclockwise by 180 degrees
function rotateArrowBoxes() {
  const arrowBoxes = document.querySelectorAll('.arrow-box');
  
  arrowBoxes.forEach(box => {
    // Get the current rotation angle or set it to 0
    let currentRotation = parseInt(box.dataset.rotation) || 0;
    
    // Calculate the new rotation angle (decrement by 180 degrees)
    let newRotation = currentRotation - 180;
    
    // Apply the new rotation using inline style
    box.style.transform = `rotate(${newRotation}deg)`;
    
    // Store the new rotation angle in a data attribute
    box.dataset.rotation = newRotation;
  });
}

// Initial call to rotate arrow boxes counterclockwise
rotateArrowBoxes();

// Rotate the arrow boxes every 4 seconds
setInterval(rotateArrowBoxes, 6000);


document.addEventListener('DOMContentLoaded', () => {
  const sellOlds = document.querySelector('.sell-olds');
  const buyNew = document.querySelector('.buy-new');
  let flag = true;

  function toggleStyles() {
      if (flag) {
          // Apply new CSS
          sellOlds.style.top = '28%';
          sellOlds.style.left = '70%';
          buyNew.style.top = '80%';
          buyNew.style.left = '30%';
      } else {
          // Revert to original CSS
          sellOlds.style.top = '80%';
          sellOlds.style.left = '30%';
          buyNew.style.top = '28%';
          buyNew.style.left = '75%';
      }
      flag = !flag;
  }

  // Initial style application
  toggleStyles();

  // Repeat the toggle every 4 seconds
  setInterval(toggleStyles, 6000);
});






// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded');
});