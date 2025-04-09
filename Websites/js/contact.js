  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    document.querySelectorAll(".error").forEach(el => el.remove());
    let isValid = true;
    const nameValue = name.value.trim();
    const nameRegex = /^[A-Za-z\s]+$/;
    if (nameValue.length < 2) {
      showError(name, "Please enter at least 2 characters.");
      isValid = false;
    } else if (!nameRegex.test(nameValue)) {
      showError(name, "Name can only contain letters and spaces.");
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      showError(email, "Please enter a valid email address.");
      isValid = false;
    }
    if (subject.value.trim() === "") {
      showError(subject, "Subject is required.");
      isValid = false;
    }
    if (message.value.trim().length < 10) {
      showError(message, "Message must be at least 10 characters long.");
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
    }
  });
  function showError(input, message) {
    const error = document.createElement("div");
    error.className = "error text-danger mt-1";
    error.innerText = message;
    input.parentElement.appendChild(error);
  }

