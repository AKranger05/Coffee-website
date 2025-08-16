// Hero button scrolls to menu section
document.querySelector(".hero-btn").addEventListener("click", () => {
  document.querySelector("#menu").scrollIntoView({ behavior: "smooth" });
});

// Menu button interactions
document.querySelectorAll(".menu-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Sign in required to view details 🔒");
  });
});

// Parallax effect on hero text
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const heroTitle = document.querySelector(".hero h1");
  if(heroTitle) {
    heroTitle.style.transform = `translateY(${scrollY * 0.2}px)`;
  }
});
