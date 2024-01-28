/**
 * Function to set a cookie
 */
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/**
* Function to get a cookie value
*/
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
* Function to check if cookie with a given name exists
*/
function checkCookie(name) {
  var cookie = getCookie(name);
  return cookie !== null;
}

/**
* Function to show cookie consent popup
*/
function showCookieConsentPopup() {
  var popup = document.getElementById("cookieConsentPopup");
  if (popup) {
      popup.style.display = "flex";
      document.body.classList.add("no-scroll");
  }
}

/**
* Function to hide cookie consent popup
*/
function hideCookieConsentPopup() {
  var popup = document.getElementById("cookieConsentPopup");
  if (popup) {
      popup.style.display = "none";
      document.body.classList.remove("no-scroll");
  }
}

/**
* Function to accept cookies, updated to use async/await
*/
async function acceptCookies() {
  try {
      await localStorage.setItem('cookieConsent', 'accepted');
      setCookie('cookieConsent', 'accepted', 365);
      hideCookieConsentPopup();

      var form = document.getElementById('advanced-form');
      var currentStep = Array.from(document.querySelectorAll('.form-step')).findIndex(step => step.classList.contains('active'));

      if (currentStep === steps.length - 1) {
          form.submit();
      }
  } catch (error) {
      console.error('Error accepting cookies:', error);
  }
}

/**
* Function to get form data
*/
function getFormData() {
  var formData = {
      name: document.getElementById('name').value,
      surname: document.getElementById('surname').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      consoles: getSelectedConsoles(),
      pageReview: document.getElementById('pageReview').value
  };

  return formData;
}

/**
* Function to get selected consoles
*/
function getSelectedConsoles() {
  var selectedConsoles = [];
  var checkboxes = document.querySelectorAll('input[name="consoles"]:checked');

  checkboxes.forEach(function (checkbox) {
      selectedConsoles.push(checkbox.value);
  });

  return selectedConsoles;
}

/**
* Function to check if cookie consent has been given, returning a Promise
*/
function checkCookieConsent() {
  return new Promise((resolve) => {
      const consent = localStorage.getItem('cookieConsent') || getCookie('cookieConsent');
      if (consent === 'accepted') {
          resolve(true);
      } else {
          resolve(false);
      }
  });
}

/**
* Async function to initialize cookie consent check and display popup if needed
*/
async function initializeCookieConsent() {
  const hasConsent = await checkCookieConsent();
  if (!hasConsent) {
      setTimeout(showCookieConsentPopup, 1000);
  }
}

/* Initialize cookie consent check on page load */
initializeCookieConsent();

/* Add event listeners for accept and decline cookie buttons */
document.getElementById("acceptCookies").addEventListener("click", acceptCookies);
document.getElementById("declineCookies").addEventListener("click", hideCookieConsentPopup);
