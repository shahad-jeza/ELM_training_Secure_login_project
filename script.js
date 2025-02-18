
// First, refrence some important elements from the DOM 
document.addEventListener("DOMContentLoaded", function () {
  const signUpSection = document.getElementById("sign-up-section");
  const signInSection = document.getElementById("sign-in-section");
  const showSignInLink = document.getElementById("show-sign-in");
  const showSignUpLink = document.getElementById("show-sign-up");

  // Toggle Sign In Section (when sign in is clicked)
  showSignInLink.addEventListener("click", function (event) {
    event.preventDefault();
    signUpSection.style.display = "none"; // hide sign up
    signInSection.style.display = "block"; // show sign in 
  });

  // Toggle sign up Section (opisite to previous)
  showSignUpLink.addEventListener("click", function (event) {
    event.preventDefault();
    signInSection.style.display = "none";
    signUpSection.style.display = "block";
  });

  
  
  // Form validation with error handling
  function validateForm(event) {
    event.preventDefault();
    const form = event.target;
    let valid = true;
    
    form.querySelectorAll(".error-message").forEach((el) => el.remove());
    
    form.querySelectorAll("input").forEach((input) => {
      input.classList.remove("error");
      if (input.value.trim() === "") {
        valid = false;
        showError(input, `${input.name} cannot be empty!`);
      } else if (input.type === "email" && !validateEmail(input.value)) {
        valid = false;
        showError(input, "Invalid email format!");
      } else if (input.type === "password" && input.value.length < 6) {
        valid = false;
        showError(input, "Password must be at least 6 characters long!");
      }
    });
    
    if (valid) {
      showSuccess("Form submitted successfully! 🎉");
      form.reset();
    }
  }
  
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function showError(input, message) {
    input.classList.add("error");
    const error = document.createElement("div");
    error.classList.add("error-message");
    error.textContent = message;
    input.parentNode.appendChild(error);
  }
  
  function showSuccess(message) {
    const successMsg = document.createElement("div");
    successMsg.classList.add("success-message");
    successMsg.textContent = message;
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
  }
  
  // Attach validation to forms
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", validateForm);
  });
});
