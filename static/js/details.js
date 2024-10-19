// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript start Loading...');
});

// image swiper
document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const currentImage = document.getElementById('current-image');
    const images = Array.from(thumbnails).map(thumbnail => thumbnail.src);
    let currentIndex = 0;

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentImage.src = thumbnail.src;
            currentIndex = index;
        });
    });

    document.getElementById('prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        currentImage.src = images[currentIndex];
    });

    document.getElementById('next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        currentImage.src = images[currentIndex];
    });
});


// comma-add-string
document.addEventListener("DOMContentLoaded", function() {
    var elements = document.querySelectorAll('.comma-add-string');
    
    elements.forEach(function(element) {
        var number = element.textContent.trim();
        var formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        element.textContent = formattedNumber;
    });
});

// copy phone number
document.querySelectorAll('.copyable').forEach(function(element) {
    element.addEventListener('click', function() {
        // Create a temporary textarea element
        const tempTextarea = document.createElement('textarea');
        
        // Set its value to the text content of the clicked <p> element
        tempTextarea.value = this.textContent;
        
        // Append it to the body
        document.body.appendChild(tempTextarea);
        
        // Select the text
        tempTextarea.select();
        
        // Copy the text
        document.execCommand('copy');
        
        // Remove the temporary textarea
        document.body.removeChild(tempTextarea);
        
        // Optionally, alert the user
        alert('Text copied to clipboard');
    });
});


// contact info by alert
document.addEventListener('DOMContentLoaded', function() {
    const contactInfoElements = document.querySelectorAll('.contact-info');
    const modal = document.getElementById('myModal');
    const modalBody = document.getElementById('modal-body');

    contactInfoElements.forEach(function(element) {
        element.addEventListener('click', function() {
            const contactInfo = element.getAttribute('data-info');
            modalBody.innerHTML = contactInfo;
            modal.style.display = "block";
            const closeBtn = document.querySelector('.close');
            closeBtn.onclick = function() {
                modal.style.display = "none";
            }
        
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            // Attach the copy event listeners to the newly added .copyable elements
            document.querySelectorAll('.copyable').forEach(function(copyElement) {
                copyElement.addEventListener('click', function() {
                    const tempTextarea = document.createElement('textarea');
                    tempTextarea.value = this.textContent;
                    document.body.appendChild(tempTextarea);
                    tempTextarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempTextarea);
                    alert('Text copied to clipboard');
                });
            });
        });
    });

    
});


// comma insert 
// NOTE :: add "comma-add" class to whatever inputfield with type "text" to make it comma inserted and digit safe
// NOTE :: you should parse these field to integer later.
var textInputs = document.querySelectorAll('input[type="text"].comma-add'); 

function formatInput(event) {
    var input = event.target; 
    var value = input.value;
    
    var removeChar = value.replace(/[^0-9.]/g, '');
    
    var parts = removeChar.split('.');
    if (parts.length > 2) {
        removeChar = parts[0] + '.' + parts.slice(1).join('');
    }
    
    var parts = removeChar.split('.');
    var integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var decimalPart = parts[1] ? '.' + parts[1] : '';
    
    input.value = integerPart + decimalPart;
}

textInputs.forEach(function(input) {
    input.addEventListener('input', formatInput);
});

//form summission correction before submit for commad-add fields

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default submit behavior

      // Target all elements with class "comma-add" within this form
      form.querySelectorAll('.comma-add').forEach(input => {
          let value = input.value.replace(/,/g, ''); // Remove commas
          input.value = parseInt(value, 10); // Convert to integer
      });

      // Optionally log the form values for debugging
      console.log('Form values:', new FormData(form));

      form.submit(); // Trigger the submit event
  });
});


document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default submit behavior
      
      // Log the method of submission
      console.log('Form submission method:', this.method);
      
      // Log the form data from input fields
      const formData = new FormData(this);
      const dataEntries = [...formData.entries()].filter(([key]) => {
          // Filter to include only input fields
          return this.querySelector(`[name="${key}"]`);
      });
      
      console.log('Input field data:');
      dataEntries.forEach(([key, value]) => {
          console.log(`${key}: ${value}`);
      });
      
      // Uncomment to submit the form after logging
      // this.submit();
  });
});


// game box category show
function toggleExpansion(box) {
    if (window.innerWidth <= 740) {
        box.classList.toggle('expanded2');
        if (box.classList.contains('expanded1')) {
            box.classList.remove('expanded1');
        }
    } else {
        box.classList.toggle('expanded1');
        if (box.classList.contains('expanded2')) {
            box.classList.remove('expanded2');
        }
    }
}

document.querySelectorAll('.game-box').forEach(box => {
    box.addEventListener('click', () => {
        toggleExpansion(box);
    });
});

window.addEventListener('resize', () => {
    document.querySelectorAll('.game-box').forEach(box => {
        if (box.classList.contains('expanded1') || box.classList.contains('expanded2')) {
            box.classList.remove('expanded1', 'expanded2');
            toggleExpansion(box);
        }
    });
});


// sample count down NOTE its not product ready its just a showcase
function startCountdown() {
    const countdownElement = document.querySelector('.count-down');
    let days = parseInt(countdownElement.children[0].textContent);
    let hours = parseInt(countdownElement.children[1].textContent);
    let minutes = parseInt(countdownElement.children[2].textContent);
    let seconds = parseInt(countdownElement.children[3].textContent);

    function updateCountdown() {
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    if (days > 0) {
                        days--;
                        hours = 23;
                        minutes = 59;
                        seconds = 59;
                    } else {
                        clearInterval(countdownInterval);
                        alert('Countdown finished');
                        return;
                    }
                }
            }
        }

        countdownElement.innerHTML = `<span>${days}</span>روز <span>${hours}</span>ساعت <span>${minutes}</span>دقیقه <span>${seconds}</span>ثانیه `;
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
}

startCountdown();
// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded');
});