/* Freelancer portfolio interactions.
   IMPORTANT: Set CONTACT_EMAIL to your real email before publishing.
   This demo form opens the visitor's email app; it does not store messages online.
*/

const CONTACT_EMAIL = "hridoyakramulhouqe@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");
  const year = document.getElementById("current-year");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        nav.classList.remove("is-open");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        nav.classList.remove("is-open");
      }
    });
  }

  // Contact form: prepare an email draft in the visitor's default mail app.
  // For a production form that submits without opening an email app, connect a backend/form service.
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      if (!CONTACT_EMAIL) {
        formStatus.textContent = "The contact email is not configured yet.";
        return;
      }

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const service = String(formData.get("service") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const subject = encodeURIComponent(`Portfolio inquiry: ${service}`);
      const body = encodeURIComponent(
        `Hello Akramul Hoque,\n\n` +
        `My name is ${name}.\n` +
        `My email: ${email}\n` +
        `Service needed: ${service}\n\n` +
        `Project details:\n${message}\n`
      );

      formStatus.textContent = "Opening your email app with the project details. Please review and send the email there.";
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    });
  }

  // Prevent placeholder project links from jumping to the top.
  document.querySelectorAll('.project-card a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const card = link.closest(".project-card");
      const title = card?.querySelector("h3")?.textContent || "this project";
      const info = card?.querySelector(".project-info p");
      if (info) {
        info.textContent = "Replace this placeholder with your real project details and add a working project URL.";
        info.setAttribute("role", "status");
      }
      link.textContent = "Add project link";
      link.setAttribute("aria-label", `Add a real link for ${title}`);
    });
  });
});
