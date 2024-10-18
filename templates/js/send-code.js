// show error logic




    // error message
    function showError(inputField, message) {
        const dialogue = inputField.closest('.input-field').querySelector('.description-dialogue');
        const icon = inputField.closest('.input-field').querySelector('.info-icon');
    
        // Change icon color and background color when there's an error
        icon.style.color = '#ffead2';
        icon.style.backgroundColor = '#e73656'; // Fix the typo
    
        // Set the error message and change its color to red
        dialogue.textContent = message;
        dialogue.style.color = 'red';
        isValid = false;
    }
    
    // Helper function to reset error message and icon color
    function resetError(inputField) {
        const dialogue = inputField.closest('.input-field').querySelector('.description-dialogue');
        const icon = inputField.closest('.input-field').querySelector('.info-icon');
    
        // Reset icon color and background color
        icon.style.color = '#e73656';
        icon.style.backgroundColor = '#ffead2'; // Fix the typo
    
        // Clear the error message
        dialogue.textContent = '';
    }


// send code logic

document.getElementById('send-code').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    var phoneNumber = document.getElementById('phone').value;
    var sendCodeButton = document.getElementById('send-code');

    // Send the request to Django backend
    // fetch('/send-code/', {  // Change this to your Django URL
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-CSRFToken': '{{ csrf_token }}'  // Ensure CSRF token is passed
    //     },
    //     body: JSON.stringify({
    //         phone_number: phoneNumber
    //     })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Handle the response data
    //     if (data.success) {
    //         alert('Code sent successfully!');
    //         // Start the countdown timer after a successful code send
    //         startCountdown(sendCodeButton, 120);  // 120 seconds = 2 minutes
    //     } else {
    //         alert('Failed to send code.');
    //     }
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
});





// Function to start the countdown
function startCountdown(button, seconds) {
    button.disabled = true;  // Disable the button
    var originalText = button.textContent;  // Store the original button text
    var timerInterval = setInterval(function() {
        if (seconds > 0) {
            button.textContent = `ارسال کد مجدد(${seconds}s)`;  // Update the button text with countdown
            seconds--;
        } else {
            clearInterval(timerInterval);
            button.disabled = false;  // Re-enable the button after the countdown
            button.textContent = originalText;  // Restore the original button text
        }
    }, 1000);  // Run the interval every second
}


    // Validate phone number (شماره تلفن)
    const phoneField = document.getElementById('phone');
    const phoneValue = phoneField.value;
    if (!/^\d{11}$/.test(phoneValue)) {
        showError(phoneField, 'شماره تلفن باید 11 رقمی باشد');
    } else {
        // if there is a error message from django message like this phone number exist we change this to true
        let phoneExists = false;

        if (phoneExists) {
            showError(phoneField, 'این شماره تلفن قبلا ثبت شده است');
        } else {
            resetError(phoneField);
        }
    }