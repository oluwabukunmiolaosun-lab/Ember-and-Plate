// =========================================================
// EMBER & PLATE — script.js
// Vanilla JS: mobile nav, scroll reveals, reservation form demo
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close menu after tapping a link (mobile)
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* ---------- Header background on scroll ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.style.background = "rgba(10,9,8,0.92)";
      header.style.borderBottom = "1px solid rgba(244,239,230,0.08)";
    } else {
      header.style.background = "linear-gradient(to bottom, rgba(10,9,8,0.85), rgba(10,9,8,0))";
      header.style.borderBottom = "none";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal for sections ---------- */
  const revealTargets = document.querySelectorAll(
    ".about-grid, .menu-card, .gallery-item, .reserve-grid, .location-grid, .promo-inner"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }

  /* ---------- Reservation form (demo only, no backend) ---------- */
  const form = document.getElementById("reserve-form");
  const confirmMsg = document.getElementById("form-confirm");
  const dateInput = document.getElementById("res-date");

  // Prevent selecting a past date
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const name = document.getElementById("res-name").value.trim();
      confirmMsg.textContent = `Thank you, ${name.split(" ")[0]}. Your reservation request has been received — we'll confirm shortly.`;
      form.reset();

      setTimeout(() => {
        confirmMsg.textContent = "";
      }, 8000);
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
