const scaleItems = document.querySelectorAll('.scale-item');
const feedbackSection = document.querySelector('.feedback-section');
const thankYouSection = document.querySelector('.thank-you-section');
const feedbackHeading = document.getElementById('feedback-heading');
const feedbackText = document.getElementById('feedback-text');
const submitFeedbackButton = document.getElementById('submit-feedback');
const npsSection = document.querySelector('.nps-section');
scaleItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove 'selected' class from all items
        scaleItems.forEach(i => i.classList.remove('selected'));

        // Add 'selected' class to the clicked item
        item.classList.add('selected');

        // Determine the value and customize the feedback heading
        const value = parseInt(item.dataset.value);
        
        if (value <= 6) {
            feedbackHeading.textContent = "Could you let us know what led to your dissatisfcation";
        } else if (value >= 7 && value <= 8) {
            feedbackHeading.textContent = "Thanks! How can we improve further?";
        } else {
            feedbackHeading.textContent = "We appreciate it! How can we go the extra mile?";
        }
        // Show the feedback section when a number is clicked
        npsSection.style.display = 'none';

        feedbackSection.style.display = 'block';
        storeRating(value);
    });
});


// Initialize Firebase (replace with your project configuration)
const firebaseConfig = {
  apiKey: "AIzaSyCQYLePAviat-Vm-Eq7cf0tJAOhcLaT2IM",
  authDomain: "zavyaproj.firebaseapp.com",
  databaseURL: "https://zavyaproj-default-rtdb.firebaseio.com",
  projectId: "zavyaproj",
  storageBucket: "zavyaproj.appspot.com",
  messagingSenderId: "1027147369596",
  appId: "1:1027147369596:web:7ff3880fca8f178d348df9"
};

firebase.initializeApp(firebaseConfig);

// Get references to elements
// const feedbackForm = document.getElementById('feedback-form');
// const feedbackText = document.getElementById('feedback-text');
// const submitFeedbackButton = document.getElementById('submit-feedback');

// Function to store feedback in Firebase
function storeFeedback(feedbackText,value) {
  firebase.firestore().collection('ZavyaProj').doc('feedbacks').collection('feedback').add({
    Rating: value,
    feedback: feedbackText,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    console.log('Feedback stored successfully!');
    // Show thank you section after successful submission
    document.querySelector('.feedback-section').style.display = 'none';
    document.querySelector('.thank-you-section').style.display = 'block';
  })
  .catch((error) => {
    console.error('Error storing feedback:', error);
    // Handle errors appropriately, like showing an error message to the user
  });
}
function storeRating(value) {
  firebase.firestore().collection('ZavyaProj').doc('feedbacks').collection('ratings').add({
    Rating: value,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    console.log('Rating stored successfully!');
  })
  .catch((error) => {
    console.error('Error storing rating:', error);
    // Handle errors appropriately, like showing an error message to the user
  });
}


// Event listener for form submission
submitFeedbackButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const feedback = feedbackText.value;
  const value = document.querySelector('.scale-item.selected')?.dataset.value; // Access selected value (null if not selected)
  if (feedback.trim() === '') {
    // Handle empty feedback, like showing an error message
    return;
  }

  storeFeedback(feedback,value);

  // Clear feedback text after submission
  feedbackText.value = '';
});
