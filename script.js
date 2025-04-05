// Set the payment amount for each service type
const TEMPORARY_CAREGIVER_PAYMENT = 1500; // ₹1500 per day
const FULLTIME_CAREGIVER_PAYMENT = 4000; // ₹4000 per day
const CHILD_CARE_PAYMENT = 1000; // ₹1000 per day

// Sample caretaker data with languages known
const caretakerData = [
  {
    name: 'John',
    rating: '4.5',
    qualification: 'B.Sc Nursing',
    reviews: 'Excellent service!',
    languages: ['en', 'hi', 'ta'], // English, Hindi, Tamil
  },
  {
    name: 'Ravi Kumar',
    rating: '4.7',
    qualification: 'M.Sc Nursing',
    reviews: 'Very professional.',
    languages: ['en', 'hi', 'te'], // English, Hindi, Telugu
  },
  {
    name: 'Michael',
    rating: '4.6',
    qualification: 'Diploma in Nursing',
    reviews: 'Great experience.',
    languages: ['en', 'ml', 'ta'], // English, Malayalam, Tamil
  },
  {
    name: 'Suresh',
    rating: '4.8',
    qualification: 'B.Sc Nursing',
    reviews: 'Highly recommended.',
    languages: ['en', 'hi', 'kn'], // English, Hindi, Kannada
  },
  {
    name: 'Keerthi',
    rating: '4.4',
    qualification: 'M.Sc Nursing',
    reviews: 'Very caring and attentive.',
    languages: ['en', 'ml', 'ta'], // English, Malayalam, Tamil
  },
];

// Track selected service type
let selectedServiceType = null;

// Login Form Submission
document.getElementById('login-form').onsubmit = function (e) {
  e.preventDefault();
  document.getElementById('login').style.display = 'none';
  document.getElementById('service-selection').style.display = 'block';
};

// Sign-up Form Submission
document.getElementById('signup-form').onsubmit = function (e) {
  e.preventDefault();
  alert('Sign-up successful! Please login.');
  document.getElementById('signup').style.display = 'none';
  document.getElementById('login').style.display = 'block';
};

// Temporary Caregiver Navigation
document.getElementById('temporary-caregiver').onclick = function () {
  selectedServiceType = 'temporary';
  document.getElementById('service-selection').style.display = 'none';
  document.getElementById('temp-caregiver').style.display = 'block';
};

// Full-Time Caregiver Navigation
document.getElementById('fulltime-caregiver').onclick = function () {
  selectedServiceType = 'fulltime';
  document.getElementById('service-selection').style.display = 'none';
  document.getElementById('fulltime-caregiver-section').style.display = 'block';
};

// Child Care Service Navigation
document.getElementById('child-care-service').onclick = function () {
  selectedServiceType = 'childcare';
  document.getElementById('service-selection').style.display = 'none';
  document.getElementById('child-care-service-section').style.display = 'block';
};

// Temporary Caregiver Form Submission with Validation
document.getElementById('temp-form').onsubmit = function (e) {
  e.preventDefault();

  // Get form values
  const fromDate = new Date(document.getElementById('from-date').value);
  const toDate = new Date(document.getElementById('to-date').value);
  const fromTime = document.getElementById('from-time').value;
  const toTime = document.getElementById('to-time').value;

  // Validate date and time
  if (toDate < fromDate) {
    alert('Error: "To Date" should not be earlier than "From Date".');
    return;
  }

  if (toDate.getTime() === fromDate.getTime() && toTime <= fromTime) {
    alert('Error: "To Time" should not be earlier than or equal to "From Time" on the same date.');
    return;
  }

  // Display payment page if validation passes
  document.getElementById('total-payment').textContent = `Total Payment: ₹${TEMPORARY_CAREGIVER_PAYMENT}`;
  document.getElementById('temp-caregiver').style.display = 'none';
  document.getElementById('payment-page').style.display = 'block';
};

// Full-Time Caregiver Form Submission
document.getElementById('fulltime-form').onsubmit = function (e) {
  e.preventDefault();
  document.getElementById('total-payment').textContent = `Total Payment: ₹${FULLTIME_CAREGIVER_PAYMENT}`;
  document.getElementById('fulltime-caregiver-section').style.display = 'none';
  document.getElementById('payment-page').style.display = 'block';
};

// Child Care Form Submission
document.getElementById('child-care-form').onsubmit = function (e) {
  e.preventDefault();
  document.getElementById('total-payment').textContent = `Total Payment: ₹${CHILD_CARE_PAYMENT}`;
  document.getElementById('child-care-service-section').style.display = 'none';
  document.getElementById('payment-page').style.display = 'block';
};

// Payment Option Buttons
document.getElementById('credit-debit-card').onclick = function () {
  document.getElementById('payment-form').style.display = 'block';
};

// UPI Payment Button
document.getElementById('upi').onclick = function () {
  document.getElementById('payment-form').style.display = 'none';
  document.getElementById('upi-qr').style.display = 'block';
};

// Payment Form Submission
document.getElementById('payment-form').onsubmit = function (e) {
  e.preventDefault();
  document.getElementById('payment-page').style.display = 'none';
  document.getElementById('payment-success').style.display = 'block';
  setTimeout(showCaretakerDetails, 5000);
};

// Show Caretaker Details
function showCaretakerDetails() {
  document.getElementById('payment-success').style.display = 'none';
  document.getElementById('caretaker-details').style.display = 'block';

  const selectedLanguage = document.getElementById('language-select').value;

  // Filter caretakers based on the selected language
  const filteredCaretakers = caretakerData.filter(caretaker =>
    caretaker.languages.includes(selectedLanguage)
  );

  const caretakerContainer = document.getElementById('caretaker-info');
  caretakerContainer.innerHTML = ''; // Clear existing content

  if (filteredCaretakers.length === 0) {
    caretakerContainer.innerHTML = `<p>No caretakers available for the selected language.</p>`;
  } else {
    filteredCaretakers.forEach(caretaker => {
      caretakerContainer.innerHTML += `
        <p><strong>Name:</strong> ${caretaker.name}</p>
        <p><strong>Rating:</strong> ${caretaker.rating}</p>
        <p><strong>Qualification:</strong> ${caretaker.qualification}</p>
        <p><strong>Reviews:</strong> ${caretaker.reviews}</p>
        <p><strong>Languages Known:</strong> ${caretaker.languages
          .map(lang => {
            const languageNames = {
              en: 'English',
              hi: 'हिंदी (Hindi)',
              as: 'অসমীয়া (Assamese)',
              bn: 'বাংলা (Bengali)',
              gu: 'ગુજરાતી (Gujarati)',
              kn: 'ಕನ್ನಡ (Kannada)',
              ks: 'کٲشُر (Kashmiri)',
              kok: 'कोंकणी (Konkani)',
              ml: 'മലയാളം (Malayalam)',
              mr: 'मराठी (Marathi)',
              ne: 'नेपाली (Nepali)',
              or: 'ଓଡ଼ିଆ (Odia)',
              pa: 'ਪੰਜਾਬੀ (Punjabi)',
              sa: 'संस्कृतम् (Sanskrit)',
              ta: 'தமிழ் (Tamil)',
              te: 'తెలుగు (Telugu)',
              ur: 'اردو (Urdu)',
            };
            return languageNames[lang];
          })
          .join(', ')}</p>
        <hr>
      `;
    });
  }
}

// Back to Login
document.getElementById('back-to-login').onclick = function () {
  document.getElementById('caretaker-details').style.display = 'none';
  document.getElementById('login').style.display = 'block';
};

// SOS Button
document.getElementById('sos-button').onclick = function () {
  document.getElementById('sos-alert').style.display = 'block';
  setTimeout(function () {
    document.getElementById('sos-alert').style.display = 'none';
  }, 2000);
};

// Apply for Job Navigation
document.getElementById('apply-for-job').onclick = function () {
  document.getElementById('service-selection').style.display = 'none';
  document.getElementById('apply-job').style.display = 'block';
};

// Job Application Form Submission
document.getElementById('apply-form').onsubmit = function (e) {
  e.preventDefault();
  document.getElementById('apply-job').style.display = 'none';
  document.getElementById('thank-you').style.display = 'block';
};

// Back to Login from Thank You Page
document.getElementById('back-to-login-from-thankyou').onclick = function () {
  document.getElementById('thank-you').style.display = 'none';
  document.getElementById('login').style.display = 'block';
};

// Back to Login from Terms and Conditions Page
document.getElementById('back-to-login-from-terms').onclick = function () {
  document.getElementById('terms-and-conditions').style.display = 'none';
  document.getElementById('login').style.display = 'block';
};
