document.addEventListener("DOMContentLoaded", function () {
  const signUpSection = document.getElementById("sign-up-section");
  const signInSection = document.getElementById("sign-in-section");
  const showSignInLink = document.getElementById("show-sign-in");
  const showSignUpLink = document.getElementById("show-sign-up");

  // toggle between sign-in and sign up 
  function toggleSection(hide, show) {
    hide.classList.remove("active");
    setTimeout(() => {
      hide.style.display = "none"; //hide the block
      show.style.display = "block"; //show the block
      setTimeout(() => show.classList.add("active"), 10);
    }, 300);
  }

  //do the oppsitie for each button
  showSignInLink.addEventListener("click", function (event) {
    event.preventDefault();
    toggleSection(signUpSection, signInSection);
  });

  showSignUpLink.addEventListener("click", function (event) {
    event.preventDefault();
    toggleSection(signInSection, signUpSection);
  });


  // validate the input form
  function validateForm(event) {
    event.preventDefault();
    const form = event.target;
    let valid = true;

    form.querySelectorAll(".error-message").forEach(el => el.remove());
    form.querySelectorAll("input").forEach(input => {
      input.classList.remove("is-invalid");

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

    // show final alert if every thing is fine
    if (valid) {
      alert("Form submitted successfully! 🎉");
      form.reset();
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // validate the email the common way 
  }

  function showError(input, message) {
    input.classList.add("is-invalid");
    const error = document.createElement("div");
    error.classList.add("error-message");
    error.textContent = message;
    input.parentNode.appendChild(error);
  }

  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", validateForm);
  });
});


// Toggle between dark and light mode 

document.addEventListener("DOMContentLoaded", function () {
  // Create and insert the button
  const navList = document.querySelector('nav ul');
  const themeToggle = document.createElement('li');
  // button design * note: this part is inspired from code i found online
  themeToggle.innerHTML = `
    <div class="theme-toggle">
      <svg class="icon sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffd700">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
      <svg class="icon moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </div>
  `;
  navList.appendChild(themeToggle);

  // toggle functionality
  const toggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // keep the current
  const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // apply initial theme
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggle.classList.add('dark');
  }

  // Handle theme toggle click
  toggle.addEventListener('click', () => {
    let theme = 'light';
    
    if (!toggle.classList.contains('dark')) {
      theme = 'dark';
      toggle.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      toggle.classList.remove('dark');
      document.documentElement.removeAttribute('data-theme');
    }
    
    localStorage.setItem('theme', theme);
    
    // Add animation to all elements
    document.body.style.transition = 'background-color 0.3s ease';
    document.querySelectorAll('*').forEach(element => {
      element.style.transition = 'all 0.3s ease';
    });
  });

  // listen for system theme changes and handle it 
  prefersDarkScheme.addEventListener('change', (e) => {
    const theme = e.matches ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggle.classList.add('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      toggle.classList.remove('dark');
    }
  });
});