const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const sections = [...document.querySelectorAll("main section[id], footer[id]")];
const currentYear = document.getElementById("current-year");

if (currentYear) currentYear.textContent = new Date().getFullYear();

function closeMenu() {
  if (!menuButton || !mainNav) return;
  menuButton.setAttribute("aria-expanded", "false");
  mainNav.classList.remove("is-open");
}

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    mainNav.classList.toggle("is-open", !isOpen);
  });
  navLinks.forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) closeMenu();
  });
}

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(link => {
      const active = link.getAttribute("href") === "#" + visible.target.id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5] });
  sections.forEach(section => observer.observe(section));
}
