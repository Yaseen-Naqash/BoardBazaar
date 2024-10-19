// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript start Loading...');
});


document.getElementById('register-form').addEventListener('submit', function (e) {
    console.log('js is validating ...');

    e.preventDefault(); // Prevent form submission until validation is complete
    let isValid = true;


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

    // Validate name (نام)
    const nameField = document.getElementById('name');
    if (!/^[\u0600-\u06FF\s]+$/.test(nameField.value)) {
        showError(nameField, 'نام خودتون رو به فارسی وارد کنید');
    } else {
        resetError(nameField);
    }

    // Validate username (نام کاربری)
    const usernameField = document.getElementById('username');
    const usernameValue = usernameField.value;
    if (!/^[a-zA-Z][a-zA-Z0-9_]{3,}$/.test(usernameValue)) {
        showError(usernameField, 'نام کاربری باید حداقل 4 حرف یا عدد باشد و با حرف شروع شود');
    } else if (/([a-zA-Z])\1{2,}/.test(usernameValue)) {
        showError(usernameField, 'نام کاربری نباید سه یا بیشتر حرف متوالی داشته باشد');
    } else {

        // if there is a error message from django message like this username exist we change this to true

        let usernameExists = false;
        
        if (usernameExists) {
            showError(usernameField, 'این نام کاربری قبلا انتخاب شده است');
        } else {
            resetError(usernameField);
        }
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

    // Validate password (رمز عبور) and confirm password (تکرار رمز عبور)
    const passwordField = document.getElementById('pass1');
    const confirmPasswordField = document.getElementById('pass2');
    const passwordValue = passwordField.value;
    if (!/^[a-zA-Z0-9]{6,12}$/.test(passwordValue)) {
        showError(passwordField, 'رمز عبور باید 6 تا 12 حرف انگلیسی یا عدد باشد');
    } else {
        resetError(passwordField);
    }
    if (confirmPasswordField.value !== passwordValue) {
        showError(confirmPasswordField, 'تکرار رمز عبور با رمز عبور مطابقت ندارد');
    } else {
        resetError(confirmPasswordField);
    }

    // If all validations pass, submit the form
    if (isValid) {
        this.submit();
    }
});
    
// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded');
});