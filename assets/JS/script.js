// ===== ROTATING TITLE ANIMATION =====
const titles = ["Frontend Developer", "React Developer","Full Stack Developer", "Software Developer", "Website Designer", "UI/UX Designer"]

let currentTitleIndex = 0
const titleElement = document.getElementById("rotating-title")

function typeWriter(element, text, speed = 100) {
  let i = 0
  element.textContent = ""

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

function rotateTitle() {
  titleElement.style.opacity = "0"

  setTimeout(() => {
    currentTitleIndex = (currentTitleIndex + 1) % titles.length
    titleElement.style.opacity = "1"
    typeWriter(titleElement, titles[currentTitleIndex], 80)
  }, 500)
}

// Start rotation after page load
document.addEventListener("DOMContentLoaded", () => {
  titleElement.style.transition = "opacity 0.5s ease-in-out"
  setInterval(rotateTitle, 3000) // Change every 3 seconds
})

// ===== HEADER STICKY =====
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.classList.add("sticky")
  } else {
    header.classList.remove("sticky")
  }
})

// ===== NAVIGATION =====
const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll("section")

// Active navigation on scroll
window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active")
    }
  })
})

// Mobile navigation
const menuBtn = document.querySelector(".menu-btn")
const navBar = document.querySelector(".nav-bar")
const navCloseBtn = document.querySelector(".nav-close-btn")

menuBtn.addEventListener("click", () => {
  navBar.classList.add("active")
})

navCloseBtn.addEventListener("click", () => {
  navBar.classList.remove("active")
})

// Close nav when clicking on nav links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navBar.classList.remove("active")
  })
})

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.querySelector(".scrollToTop-btn")

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("active")
  } else {
    scrollTopBtn.classList.remove("active")
  }
})

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ===== THEME TOGGLE =====
const themeBtn = document.querySelector(".theme-btn")
const body = document.body

// Check for saved theme preference



// Default to dark theme
let currentTheme = localStorage.getItem("theme")

if (!currentTheme) {
  // Default is dark
  body.classList.add("dark-theme")
  themeBtn.classList.add("sun")
  localStorage.setItem("theme", "dark-theme")
} else {
  body.classList.add(currentTheme)
  if (currentTheme === "dark-theme") {
    themeBtn.classList.add("sun")
  }
}





themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme")
  themeBtn.classList.toggle("sun")

  // Save theme preference
  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark-theme")
  } else {
    localStorage.setItem("theme", "")
  }
})

// ===== SKILL BARS ANIMATION =====
const skillBars = document.querySelectorAll(".skill-progress")

const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      bar.style.width = bar.classList.contains("html")
        ? "100%"
        : bar.classList.contains("css")
          ? "90%"
          : bar.classList.contains("js")
            ? "80%"
            : bar.classList.contains("react")
              ? "75%"
              : bar.classList.contains("datascience")
                ? "80%"
              : bar.classList.contains("python")
                ? "85%"
                : bar.classList.contains("java")
                ? "70%"
                : bar.classList.contains("django")
                  ? "70%"
                  : bar.classList.contains("mysql")
                    ? "70%"
                    : bar.classList.contains("bootstrap")
                      ? "80%"
                      : "0%"
    }
  })
}

window.addEventListener("scroll", animateSkillBars)
window.addEventListener("load", animateSkillBars)

// ===== CONTACT FORM WITH EMAILJS =====
const contactForm = document.querySelector(".contact-form")

// Initialize EmailJS (replace 'YOUR_USER_ID' with your actual user ID)
emailjs.init("hnpU3cK0jaVQneonL")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const name = contactForm.querySelector('input[type="text"]').value
  const email = contactForm.querySelector('input[type="email"]').value
  const message = contactForm.querySelector("textarea").value

  if (!name || !email || !message) {
    alert("Please fill in all fields")
    return
  }

  // Send email using EmailJS
  emailjs.send("service_7bj9ckh", "template_22wtnhq", {
    from_name: name,
    from_email: email,
    message: message,
  })
    .then(() => {
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    })
    .catch(() => {
      alert("Oops! Something went wrong. Please try again later.")
    })
})

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".education-item, .project-card, .skill-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// ===== PARALLAX EFFECT FOR TECH ORBS =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const techOrbs = document.querySelector(".tech-orbs")
  const aboutAnimation = document.querySelector(".about-animation")

  if (techOrbs) {
    const rate = scrolled * -0.5
    techOrbs.style.transform = `translateY(${rate}px)`
  }

  if (aboutAnimation) {
    const rate = scrolled * -0.3
    aboutAnimation.style.transform = `translateY(${rate}px)`
  }
})

// ===== INITIALIZE ANIMATIONS ON LOAD =====
window.addEventListener("load", () => {
  // Animate skill bars
  animateSkillBars()

  // Start tech orbs animation
  const orbs = document.querySelectorAll(".orb")
  orbs.forEach((orb, index) => {
    orb.style.animationDelay = `${index * -3.33}s`
  })

  // Initialize floating icons animation
  const floatingIcons = document.querySelectorAll(".floating-icon")
  floatingIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index}s`
  })
})
