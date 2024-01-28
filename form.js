/**
 * Form Submission and Display Functions
 * -----------------------------------------------------------------------------
 */

/* Event listener for form submission */
document.getElementById('advanced-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    /* Hide progress bar on form submission */
    document.getElementById('progress-bar').style.display = 'none';

    /* Display confirmation section */
    document.getElementById('confirmation').style.display = 'block';

    /* Check for user consent to use cookies */
    const hasConsent = await checkCookieConsent();

    /* If user consents, store form data in a cookie and display it */
    if (hasConsent) {
        setCookie('formData', JSON.stringify(getFormData()), 365);
        displayFormData();
    }
});

/* Display stored form data */
function displayFormData() {
    var formData = getFormData();

    /* Display form data in confirmation section */
    document.getElementById('confirmation').innerHTML =
        '<p>Name: ' + formData.name + '</p>' +
        '<p>Surname: ' + formData.surname + '</p>' +
        '<p>Email: ' + formData.email + '</p>' +
        '<p>Phone: ' + formData.phone + '</p>' +
        '<p>Selected Consoles: ' + formData.consoles.join(', ') + '</p>' +
        '<p>Review: ' + formData.pageReview + '</p>';
}

/**
 * Form Navigation and Validation Functions
 * -----------------------------------------------------------------------------
 */

document.addEventListener('DOMContentLoaded', function () {
    var currentStep = 0;
    var steps = document.querySelectorAll('.form-step');
    var progressBarSteps = document.querySelectorAll('.step');

    /* Function to show a specific step and update progress bar */
    function showStep(step) {
        steps.forEach(function (s, index) {
            s.style.display = 'none';
            progressBarSteps[index].classList.remove('active');

            if (index === step) {
                s.style.display = 'block';
                progressBarSteps[index].classList.add('active');
            }
        });
    }

    /* Function to validate inputs in the current step */
    function validateCurrentStep() {
        var requiredInputs = steps[currentStep].querySelectorAll('[required]');
        var allValid = true;
        var firstInvalidInput = null;

        requiredInputs.forEach(function (input) {
            if (input.id === 'name' || input.id === 'surname') {
                var nameRegex = /^[A-Z][a-z]*$/;
                if (!nameRegex.test(input.value)) {
                    allValid = false;
                    input.classList.add('invalid');
                    if (!firstInvalidInput) {
                        firstInvalidInput = input;
                    }
                } else {
                    input.classList.remove('invalid');
                }
            } else if (!input.checkValidity()) {
                allValid = false;
                input.classList.add('invalid');
                if (!firstInvalidInput) {
                    firstInvalidInput = input;
                }
            } else {
                input.classList.remove('invalid');
            }
        });

        if (!allValid && firstInvalidInput) {
            /* Display alert for invalid input */
            alert('Please fill out the ' + firstInvalidInput.name + ' field correctly.');
        }

        return allValid;
    }

    /* Show initial step */
    showStep(currentStep);

    /* Event listeners for next and previous buttons */
    document.querySelectorAll('.next-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (validateCurrentStep()) {
                /* Move to the next step */
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    document.querySelectorAll('.prev-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (currentStep > 0) {
                /* Move to the previous step */
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    /* Event listener for form submission */
    var form = document.getElementById('advanced-form');
    var confirmation = document.getElementById('confirmation');

    form.onsubmit = function (event) {
        event.preventDefault();
        if (validateCurrentStep()) {
            /* Hide form and display confirmation on submission */
            form.style.display = 'none';
            confirmation.style.display = 'block';
        }
    };
});

/* Function to handle arrow key input for age field */
function changeAgeWithArrows(event) {
    var ageInput = document.getElementById('age');
    var step = 10;

    if (event.key === 'ArrowRight') {
        ageInput.value = parseInt(ageInput.value) + step;
    } else if (event.key === 'ArrowLeft') {
        ageInput.value = Math.max(0, parseInt(ageInput.value) - step);
    }
}

/* Function to toggle visibility of "Other" text field */
function toggleOtherField() {
    var otherCheckbox = document.getElementById('other');
    var otherTextField = document.getElementById('otherText');
    otherTextField.style.display = otherCheckbox.checked ? 'block' : 'none';
}

/* Function to toggle visibility of expanded console options */
function toggleExpandOptions() {
    var expandedSection = document.getElementById('expandedOptions');
    expandedSection.classList.toggle('hidden');

    event.preventDefault();

    var expandOptionsLink = document.querySelector('.expand-options');

    if (expandOptionsLink.textContent === 'Show less options') {
        expandOptionsLink.textContent = 'Show more options';
    } else {
        expandOptionsLink.textContent = 'Show less options';
    }
}
