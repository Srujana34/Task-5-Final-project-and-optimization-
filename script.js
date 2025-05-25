document.addEventListener("DOMContentLoaded", () => {
  const contactSection = document.getElementById("contact");

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        contactSection.classList.add("visible");
        observer.unobserve(contactSection);
      }
    },
    {
      threshold: 0.2,
    }
  );

  observer.observe(contactSection);

  const form = document.getElementById("contact-form");
  const submissionList = document.getElementById("submission-list");

  // Function to display submissions
  function displaySubmissions() {
    const data = JSON.parse(localStorage.getItem("contactSubmissions")) || [];
    submissionList.innerHTML = ""; // Clear existing list

    data.forEach((entry, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>#${index + 1}</strong><br />
        <strong>Name:</strong> ${entry.name}<br />
        <strong>Email:</strong> ${entry.email}<br />
        <strong>Message:</strong> ${entry.message}<br />
        <small><em>Submitted on: ${new Date(entry.submittedAt).toLocaleString()}</em></small>
        <hr />
      `;
      submissionList.appendChild(li);
    });
  }

  // Display submissions on page load
  displaySubmissions();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const message = form.elements["message"].value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const contactData = {
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    };

    const existingData = JSON.parse(localStorage.getItem("contactSubmissions")) || [];
    existingData.push(contactData);
    localStorage.setItem("contactSubmissions", JSON.stringify(existingData));

    alert("Thank you! Your message has been saved.");
    form.reset();
    displaySubmissions(); // Refresh list
  });
});

