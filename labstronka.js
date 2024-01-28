/**
 * Smooth Scroll Functionality
 * -----------------------------------------------------------------------------
 */

/* Smooth scroll functionality when clicking on anchor links */
document.addEventListener("DOMContentLoaded", function() {
    /* Get the height of the fixed navigation bar */
    var offsetHeight = document.querySelector('.menu').offsetHeight;

    /* Smooth scroll for all anchor links */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);
            
            /* Scroll to the target with an offset to consider the fixed navigation bar */
            window.scrollTo({
                top: targetElement.offsetTop - offsetHeight,
                behavior: 'smooth'
            });
        });
    });
});

/**
 * Cookie Consent and Form Data Display
 * -----------------------------------------------------------------------------
 */

/* Check for stored form data cookies and display if available */
document.addEventListener("DOMContentLoaded", function() {
    const offsetHeight = document.querySelector('.menu').offsetHeight;

    /* Get stored form data from cookies and display if available */
    const formDataCookie = getCookie('formData');
    if (formDataCookie) {
        const storedFormData = JSON.parse(formDataCookie);

        /* Display stored form data */
        document.getElementById('storedName').innerText = 'Name: ' + storedFormData.name;
        document.getElementById('storedSurname').innerText = 'Surname: ' + storedFormData.surname;
        document.getElementById('storedEmail').innerText = 'Email: ' + storedFormData.email;
        document.getElementById('storedPhone').innerText = 'Phone: ' + storedFormData.phone;

        /* Display the hidden form data container */
        document.getElementById('hiddenFormData').style.display = 'block';
    }
});

/* Utility function to get a cookie value by name */
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return cookieValue;
        }
    }
    return null;
}
